import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Instruction } from '../../models/instruction';
import { StatusEnum } from '../../status-enum';
import { ProductDropdown } from '../../models/product-dropdown';
import { Product } from '../../models/product';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InstructionService {
  private basePath = 'https://localhost:44382';
  constructor(private http: HttpClient) { }

  mapStatusFromApi(statusValue: number): StatusEnum {
    switch (statusValue) {
      case 0:
        return StatusEnum.Pending;
      case 1:
        return StatusEnum.Scheduled;
      case 2:
        return StatusEnum.InProgress;
      case 3:
        return StatusEnum.Delivered;
      case 4:
        return StatusEnum.Invoiced;
      default:

        return StatusEnum.Pending;
    }
  }

  getAllInstruction(): Observable<Instruction[]> {
    return this.http.get<Instruction[]>(this.basePath + '/api/instructions');
  }
  getAllTransporters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.basePath}/api/TransporterList`).pipe(
      map((apiResponse: any) => {
        if (apiResponse && apiResponse.data && Array.isArray(apiResponse.data)) {
          return apiResponse.data.map((item: any) => ({
            id: item.id,
            name: item.name,
          }));
        } else {

          return [];
        }
      })
    );
  }

  getInstructionById(id: number): Observable<Instruction> {
    const url = `${this.basePath}/api/instructions/${id}`;
    return this.http.get<Instruction>(url);
  }

  addInstruction(apiRequest: any) {

    return this.http.post<any>(this.basePath + '/api/instructions', apiRequest);
  }

  addTransportInstruciton(data: any): Observable<any> {
    const apiUrl = `${this.basePath}/api/instructionproducts/addTransporter`;

    return this.http.post(apiUrl, data);
  }


  getAllUpdateInstructionChangeStatus(): Observable<any[]> {
    return this.http.get<any[]>(this.basePath + '/api/transporterscheduled');
  }


  transformGetAllApiResponse(apiResponse: any): Instruction[] {
    return apiResponse.data.map((item: any) => ({
      Instruction: {
        InstructionId: item.id,
        InstructionDate: new Date(item.createdDate),
        ClientName: item.clientName,
        PickupAddress: item.pickupAddress,
        DeliveryAddress: item.deliveryAddress,
        ClientId: '',
        ClientList: null,
        productList: item.productList as Product[]
      },
      BillingId: 0,
      TotalQuantity: 0,
      Status: this.mapStatusFromApi(item.status),
      ProductCode: 0,
      ProductDescription: '',
    }));
  }


  transformGetInstructionByIdApiResponse(apiResponse: any): Instruction {
    const data = apiResponse.data;


    const productItems = data.productList.map((productItem: any) => ({

      instructionProductId: productItem.instructionProductId,
      productName: productItem.productName,
      productQuantity: productItem.productQuantity,
      productDescription: productItem.productDescription,
      productPrice: productItem.productPrice,
      instructionId: data.id,
      scheduledDate: productItem.scheduledDate,
      transporterName: productItem.transporterName,
    }));

    return {
      Instruction: {
        InstructionId: data.id,
        InstructionDate: new Date(data.createdDate),
        ClientName: data.clientName,
        PickupAddress: data.pickupAddress,
        DeliveryAddress: data.deliveryAddress,
        ClientId: 0,
        ClientList: {
          id: 0,
          name: data.clientName,
        },
        ProductList: productItems,
      },
      BillingId: data.billingId,
      TotalQuantity: data.totalQuantity,
      TotalProducts: 0,
      TotalPrice: 0,
      Status: this.mapStatusFromApi(data.status),
      ProductCode: data.productCode,
      ProductDescription: data.productDescription,

    };
  }
}
