import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TransactionDto } from "../models/transations.dto";

@Injectable({
  providedIn: 'root',
})
export class CustomerTransactionService {
  apiGateWayUrl = 'http://52.90.228.22:8083/';
  apiVersion = 'api/v1/';
  transactionBaseUrl =
    this.apiGateWayUrl + this.apiVersion + 'accounts/saving/';

  constructor(private http: HttpClient) {}

  getTransactionsForSavingsAccount( savingsAccountId: number,pageNumber: number,pageSize: number ): Observable<TransactionDto[]> {
    const url = `${this.transactionBaseUrl}${savingsAccountId}/transactions`;
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<TransactionDto[]>(url, { params });
  }
  withdrawAmount(accountId: number, amount: number): Observable<any> {
    const withdrawalUrl = this.transactionBaseUrl + 'withdraws';

    const withdrawalBody = {
        amount: amount,
        accountId: accountId,
      };

    return this.http.put(withdrawalUrl, withdrawalBody);
  }



  depositsAmount(accountId: number, amount: number): Observable<any> {
    const depositUrl = this.transactionBaseUrl + 'deposits';

    const deposityBody = {
        amount: amount,
        accountId: accountId,
      };

    return this.http.put(depositUrl, deposityBody);
  }
  overDraftAmount(requestBody: any): Observable<any>{
    return this.http.put(this.transactionBaseUrl, requestBody);

  }
}