import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoanAccountsModel } from '../models/loan-account.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoanAccountsService {
  constructor(private http: HttpClient) {}
  apiGateWayUrl = 'http://52.90.228.22:8082/';
  apiVersion = 'api/v1/';
  getAllLoanAccountsUrl: string =
    this.apiGateWayUrl + this.apiVersion + 'loan?page=0&size=10';
  getSearchLoanAccountsUrl: string =
    this.apiGateWayUrl + this.apiVersion + '/loan';
  addLoanAccountUrl: string = this.apiGateWayUrl + this.apiVersion + '/loan';
  modifyLoanAccountUrl: string = this.apiGateWayUrl + this.apiVersion + '/loan';

  getAllLoanAccounts(): Observable<LoanAccountsModel[]> {
    return this.http.get<LoanAccountsModel[]>(this.getAllLoanAccountsUrl);
  }
  getSearchLoanAccounts(search: string): Observable<LoanAccountsModel[]> {
    return this.http.get<LoanAccountsModel[]>(
      this.getSearchLoanAccountsUrl + '/' + search
    );
  }
  addLoanAccount(body: any) {
    return this.http.post(this.addLoanAccountUrl, body);
  }
  modifyLoanAccount(body: any) {
    return this.http.put(this.modifyLoanAccountUrl, body);
  }
}
