import { Injectable } from '@angular/core';
import { StatusEnum } from '../../status-enum';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { Instruction } from '../../models/instruction';
import { Product } from '../../models/product';
@Injectable({
  providedIn: 'root'
})
export class ScheduleTransportService {
  
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
  getAllPendingInstruction(): Observable<Instruction[]> {
    return this.http.get<Instruction[]>(this.basePath + '/api/GetTransporterScheduled');
  }
  transformGetAllPendingInstruction(apiResponse: any): Instruction[] {
    return apiResponse.map((item: any) => ({
      Instruction: {
        InstructionId: item.id,
      
        ScheduledDate: new Date(item.scheduledDate),          
        ClientName: item.clientName,
        PickupAddress: item.pickupAddress,
        DeliveryAddress: item.deliveryAddress,
        ClientId: '',
        ClientList: null,
        productList: item.productList as Product[]
      },
      BillingId: 0,
      TotalQuantity: 0,
      Status:  this.mapStatusFromApi(item.status),
      ProductCode: 0,
      ProductDescription: '',
    }));
  }
}
