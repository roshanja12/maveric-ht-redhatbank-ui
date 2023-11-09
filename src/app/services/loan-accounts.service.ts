import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoanAccountsModel } from '../models/loan-account.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoanAccountsService {
  constructor(private http: HttpClient) {}
  apiGateWayUrl = 'http://52.90.228.22:8083/';
  apiVersion = 'api/v1/';
  getAllLoanAccountsUrl: string =
    this.apiGateWayUrl + this.apiVersion + 'loan?page=0&size=10000';
  getSearchLoanAccountsUrl: string =
    this.apiGateWayUrl +
    this.apiVersion +
    'loan/search?page=0&size=10000&searchValue';
  addLoanAccountUrl: string = this.apiGateWayUrl + this.apiVersion + 'loan/';
  modifyLoanAccountUrl: string = this.apiGateWayUrl + this.apiVersion + 'loan/';

  getAllLoanAccounts(): Observable<LoanAccountsModel[]> {
    return this.http
      .get<any>(this.getAllLoanAccountsUrl)
      .pipe(map((response) => response.data));
  }

  getSearchLoanAccounts(search: string): Observable<LoanAccountsModel[]> {
    console.log(this.getSearchLoanAccountsUrl + '=' + search);
    return this.http
      .get<any>(this.getSearchLoanAccountsUrl + '=' + search)
      .pipe(map((response) => response.data));
  }
  addLoanAccount(file: File, body: any) {
    const formData: FormData = new FormData();
    formData.append('supportingDoc', file, file.name);
    const loanDtoBlob = new Blob([JSON.stringify(body)], {
      type: 'application/json',
    });
    formData.append('loanDto', loanDtoBlob, 'loanDto.json');
    return this.http.post(this.addLoanAccountUrl, formData);
  }
  modifyLoanAccount(applicationId: number, statusUpdate: string) {
    console.log(this.modifyLoanAccountUrl + applicationId + '/' + statusUpdate);
    return this.http.put(
      this.modifyLoanAccountUrl + applicationId + '/' + statusUpdate,
      null
    );
  }
}
