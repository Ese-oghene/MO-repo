import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {


  private apiUrl = 'http://127.0.0.1:8000/api'; // Adjust as needed

  constructor(private http: HttpClient) {}

  login(data: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }



  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard-stats`);
  }

  postProduct(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, data);
  }

  // Add more methods as needed...
}
