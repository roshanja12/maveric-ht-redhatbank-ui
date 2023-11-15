import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SavingsAccountModel } from '../models/savings-account.model';
import { SavingsAccountDTO } from '../models/savings-account.dto';

@Injectable({
  providedIn: 'root',
})
export class SavingsAccountsService {
  constructor(private http: HttpClient) {}
  apiGateWayUrl = 'http://saving-service-senthilkn-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/';
  apiVersion = 'api/v1/';
  getAllSavingsAccountsUrl: string =
    this.apiGateWayUrl + this.apiVersion + 'accounts/saving';
  getSearchSavingsAccountsUrl: string =
    this.apiGateWayUrl + this.apiVersion + 'saving';
  addSavingsAccountUrl: string =
    this.apiGateWayUrl + this.apiVersion + 'accounts/saving';
  modifySavingsAccountUrl: string =
    this.apiGateWayUrl + this.apiVersion + 'saving';
  getSavingsAccountByCustomerIdUrl: string =
    this.apiGateWayUrl + this.apiVersion + 'accounts/saving';

  getAllSavingsAccounts(page: number, size: number): Observable<any> {

    //http://localhost:8080/api/v1/accounts/saving?page=1&size=11&search=
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    // Make the HTTP request with query parameters
    return this.http.get<any>(this.getAllSavingsAccountsUrl, { params });
  }
  getSearchSavingsAccounts(search: string): Observable<SavingsAccountDTO[]> {
    return this.http.get<SavingsAccountDTO[]>(
      this.getSearchSavingsAccountsUrl + '/' + search
    );
  }
  addSavingsAccount(file: File, body: any) {
    let formData: FormData = new FormData();
    if (file != undefined) {
      formData.append('image', file, file.name);
    }
    formData.append(
      'savingsAccountRequestDto',
      JSON.stringify(body)
    );
    console.log(body);
    console.log(formData);
    return this.http.post(this.addSavingsAccountUrl, formData);
  }
  modifySavingsAccount(body: any) {
    return this.http.put(this.modifySavingsAccountUrl, body);
  }
  getSavingsAccountsByCustomerId(
    customerId: number
  ): Observable<SavingsAccountModel> {
    return this.http
      .get<any>(this.getSavingsAccountByCustomerIdUrl + '/' + customerId)
      .pipe(map((response) => response.data));
  }
}
