import { Injectable } from '@angular/core';
import { Payment } from '../types';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../api';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly defUrl: string = '/api/payments';
  private readonly baseUrl: string; // To store the combined base URL
  constructor(private http:HttpClient) { 
    this.baseUrl = api.url + this.defUrl;
  }

  buyXp(userId: number, xpToBuy: number): Observable<Payment> {
    // Create HttpParams to send query parameters
    let params = new HttpParams();
    params = params.append('userId', userId.toString());
    params = params.append('xpToBuy', xpToBuy.toString());
    let headers = new HttpHeaders();
    headers= headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    // Make the POST request to the /buy-xp endpoint
    // The second argument of http.post can be a body (if sending JSON) or options (if sending params)
    // Since your Spring Boot endpoint uses @RequestParam, we pass params in the options object.
    // The request body for a POST with @RequestParam is typically empty or not relevant.
    return this.http.post<Payment>(`${this.baseUrl}/buy-xp`, null, { headers:headers,params: params });
  }
}
