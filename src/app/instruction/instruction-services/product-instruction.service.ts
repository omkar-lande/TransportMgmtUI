import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { ProductDropdown } from '../../models/product-dropdown';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductInstructionService {

  private apiUrl = 'https://localhost:44382';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductDropdown[]> {
    return this.http.get<any>(`${this.apiUrl}/api/products`).pipe(
      map((response: any) => {
 
        return response.data.map((item: any) => ({
          productId: item.productId,
          productName: item.productName,
          productDescription: item.productDescription,
          productPrice: item.productPrice
        }));
      })
    );
  }
}
