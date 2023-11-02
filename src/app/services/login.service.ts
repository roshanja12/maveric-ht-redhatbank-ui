import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login-model.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient) {}

  apiGateWayUrl = 'http://localhost:8085';
  loginUrl :string = this.apiGateWayUrl+'/api/v1/login';

  login(data: LoginModel){
    return this.http.post(this.loginUrl, data)
  }

}
