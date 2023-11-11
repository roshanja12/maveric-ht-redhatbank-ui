import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsightsService {
  constructor(private http: HttpClient) {}
  apiGateWayUrl = 'http://52.90.228.22:8082';
  apiVersion = '/api/v1';
  getCustomerCountUrl: string =
    this.apiGateWayUrl +
    this.apiVersion +
    '/insights/GetCustomerCountByMonth?year=';
  getLoanProductsUrl: string =
    this.apiGateWayUrl + this.apiVersion + '/insights/count-by-month?year=';
  getTotalCustomerPercentageByCityUrl: string =
    this.apiGateWayUrl + this.apiVersion + '/insights/percentage?city=';

  getCustomerCount(year: number): Observable<any> {
    return this.http
      .get<any>(this.getCustomerCountUrl + year)
      .pipe(map((response) => response.data));
  }
  getLoanProducts(year: number): Observable<any> {
    return this.http
      .get<any>(this.getLoanProductsUrl + year)
      .pipe(map((response) => response.data));
  }
  getTotalCustomerPercentageByCity(city: string): Observable<any> {
    return this.http
      .get<any>(this.getTotalCustomerPercentageByCityUrl + city)
      .pipe(map((response) => response.data));
  }
}
