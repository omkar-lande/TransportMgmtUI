import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //imported
import {Observable } from 'rxjs';
import { ClientList } from '../../models/client-list';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private basePath = 'https://localhost:44382'; 
  constructor(private http : HttpClient) { }
  getClientNames(): Observable<ClientList[]> {
    return this.http.get<any>(this.basePath + '/api/clients').pipe(
      map((response: any) => {
        return response.data.map((item: any) => ({
          id: item.id,
          name: item.name
        }));
      })
    );
  }
}
