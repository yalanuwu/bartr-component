import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../api';
import { Observable } from 'rxjs';
import { Courses } from '../types';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly defUrl: string = '/api/search';
  private readonly baseUrl: string; // To store the combined base URL
  constructor(private http:HttpClient) { 
    this.baseUrl = api.url + this.defUrl;
  }
  searchCourses(keyword: string): Observable<Courses[]> {
    // Create HttpParams to send query parameters
    let params = new HttpParams();
    params = params.append('keyword', keyword);

    // Make the GET request to the /search endpoint
    return this.http.get<Courses[]>(this.baseUrl, { params: params });
  }
}
