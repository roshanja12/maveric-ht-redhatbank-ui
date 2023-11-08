import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CustomerModel } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerAccountsService {
  constructor(private http: HttpClient) {}
  apiGateWayUrl = 'http://52.90.228.22:8080';
  apiVersion = '/api/v1';
  getAllCustomersUrl: string =
    this.apiGateWayUrl + this.apiVersion + '/customers/search';
  getSearchCustomersUrl: string =
    this.apiGateWayUrl + this.apiVersion + '/customers/search';
  addCustomerUrl: string = this.apiGateWayUrl + this.apiVersion + '/customers';
  modifyCustomerUrl: string =
    this.apiGateWayUrl + this.apiVersion + '/customers';
  getCustomerUrl: string = this.apiGateWayUrl + this.apiVersion + '/customers'

  getAllCustomers(): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>(this.getAllCustomersUrl);
  }
  getSearchCustomers(search: string): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>(
      this.getSearchCustomersUrl + '/' + search
    );
  }
  getCustomer(customerId: number): Observable<CustomerModel> {
    return this.http.get<CustomerModel>(
      this.getCustomerUrl+'/'+customerId
    );
  }
  addCustomer(body: CustomerModel) {
    return this.http.post(this.addCustomerUrl, body);
  }
  modifyCustomer(body: CustomerModel) {
    return this.http.put(this.modifyCustomerUrl, body);
  }
}
