import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs'; // Import Observable
import { api } from '../api'; // Assuming 'api' is a constant with your base URL
import { Transaction } from '../types'; // Import Courses interface
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly defUrl: string = '/api/transactions';
  private readonly baseUrl: string; // To store the combined base URL
  
  constructor(private http: HttpClient) {
    this.baseUrl = api.url + this.defUrl; // Combine api.url with defUrl in constructor
  }
  
  
  getTransactionsByUserId(userId: number): Observable<Transaction[]> {
    let headers = new HttpHeaders();
    headers= headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Transaction[]>(`${this.baseUrl}/user/${userId}`,{headers:headers});
  }
}
