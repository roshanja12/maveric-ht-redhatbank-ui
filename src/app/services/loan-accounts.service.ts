import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoanAccountsModel } from '../models/loan-account.model';
import { Observable, map } from 'rxjs';
import { LoanTransactionHistoryModel } from '../models/loan-transaction-history.model';

@Injectable({
  providedIn: 'root',
})
export class LoanAccountsService {
  constructor(private http: HttpClient) {}
  apiGateWayUrl = 'http://52.90.228.22:8083/';
  apiVersion = 'api/v1/';
  getAllLoanAccountsUrl: string =
    this.apiGateWayUrl + this.apiVersion + 'loan?page=0&size=10000';
  getTransActionHistoryByLoanIdUrl: string =
    this.apiGateWayUrl + this.apiVersion + 'loan/loanid/';
  getSearchLoanAccountsUrl: string =
    this.apiGateWayUrl +
    this.apiVersion +
    'loan/search?page=0&size=10000&searchValue';

  addLoanAccountUrl: string = this.apiGateWayUrl + this.apiVersion + 'loan';
  modifyLoanAccountUrl: string = this.apiGateWayUrl + this.apiVersion + 'loan';

  getAllLoanAccounts(): Observable<LoanAccountsModel[]> {
    return this.http
      .get<any>(this.getAllLoanAccountsUrl)
      .pipe(map((response) => response.data));
  }
  getTransActionHistoryByLoanId(
    loanId: number
  ): Observable<LoanTransactionHistoryModel[]> {
    console.log(
      this.getTransActionHistoryByLoanIdUrl + loanId + '?page=0&size=10000'
    );

    return this.http
      .get<any>(
        this.getTransActionHistoryByLoanIdUrl + loanId + '?page=0&size=10000'
      )
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
    formData.append(
      'loanDto',
      new Blob([JSON.stringify(body)], { type: 'application/json' })
    );
    // formData.append('supportingDoc', file, file.name);
    console.log(body);

    console.log(formData);
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
