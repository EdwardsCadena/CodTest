import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({ providedIn: 'root' })
export class SalesService {
  private apiUrl = 'https://localhost:7240/api';

  constructor(private http: HttpClient) {}

  getPredictions(search: string = '', page: number = 1, size: number = 10): Observable<Customer[]> {
    const params = new HttpParams()
      .set('search', search)
      .set('page', page)
      .set('size', size);
      return this.http.get<Customer[]>(`${this.apiUrl}/Customers/predictions`, { params });
  }

  getOrdersByCustomer(customerName: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`, { params: new HttpParams().set('customerName', customerName) });
  }

  createOrder(order: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, order);
  }
}
