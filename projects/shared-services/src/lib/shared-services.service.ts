import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  //signup user
  signup(user: {
    name: string,
    email: string,
    password: string,
    phone_no: string
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  //login user
  login(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

//logout
  // logout(): void {
  //   localStorage.removeItem('token');
  // }
  logoutApi(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {});
  }

}
