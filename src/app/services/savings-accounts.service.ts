import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SavingsAccountsService {
  constructor(private http: HttpClient) {}
  apiGateWayUrl = 'http://localhost:8085/accounts';
  apiVersion = '';
  getAllSavingsAccountsUrl: string = this.apiGateWayUrl + this.apiVersion + '/saving';
  getSearchSavingsAccountsUrl: string = this.apiGateWayUrl + this.apiVersion + '/saving';
  addSavingsAccountUrl: string =this.apiGateWayUrl + this.apiVersion + '/saving';
  modifySavingsAccountUrl: string = this.apiGateWayUrl + this.apiVersion + '/saving';

  getAllSavingsAccounts() {
    return this.http.get(this.getAllSavingsAccountsUrl);
  }
  getSearchSavingsAccounts(search: string) {
    return this.http.get(this.getSearchSavingsAccountsUrl + '/' + search);
  }
  addSavingsAccount(body: any) {
    return this.http.post(this.addSavingsAccountUrl, body);
  }
  modifySavingsAccount(applicationId: number, body: any) {
    return this.http.put(this.modifySavingsAccountUrl + '/' + applicationId, body);
  }
}
