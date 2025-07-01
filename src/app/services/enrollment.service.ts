import { Injectable } from '@angular/core';
import axios from 'axios';
import { api } from '../api';
import { Courses, Enrollment } from '../types';
import { environment } from '../../environments/environment';
import { catchError, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  defUrl:string='/api/enrollments';
  private readonly enrollmentsApiUrl = `${environment.apiUrl}/api/enrollments`;
  constructor(private http: HttpClient) { }

  // enroll(courseId:number,userId:number):void{
  //   axios.post(`${this.enrollmentsApiUrl}/insert/${userId}/${courseId}`,{},{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).then(function(response){"Enrolled successfully"});
  // }
  enroll(courseId: number, userId: number): Observable<any> { // Change return type to Observable<any>
    const token = localStorage.getItem('token');
    if (!token) {
      // You might want to return an observable error here or redirect
      return new Observable(observer => observer.error('No token'));
    }

    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});

    // HttpClient's post method for an empty body can take null or an empty object {}
    // Passing {} will send an empty JSON object as the body, which is usually what you want.
    // If your backend truly expects no body, you can use null.
    return this.http.post(`${this.enrollmentsApiUrl}/insert/${userId}/${courseId}`, {}, { headers }).pipe(
      tap((response) => {
        console.log('Enrollment successful:', response);
      }),
      catchError(error => {
        console.error('Enrollment error:', error);
        throw error; // Re-throw the error to be handled by the component
      })
    );
  }

  getAllEnrollments():Enrollment[]{
    let enrollments:Enrollment[]=[];
    axios.get(api.url+this.defUrl).then(function(response){
      for(let d of response.data)
        enrollments.push(d);
    });
    return enrollments;
  }

  getEnrollmentsOfUser(userId:number):Enrollment[]{
    let enrollments:Enrollment[]=[];
    axios.get(api.url+this.defUrl+`/learner/${userId}`).then(function(response){
      for(let d of response.data)
        enrollments.push(d);
    });
    return enrollments;
  }

  getEnrollmentsOfCourse(courseId:number):Enrollment[]{
    let enrollments:Enrollment[]=[];
    axios.get(api.url+this.defUrl+`/learner/${courseId}`).then(function(response){
      for(let d of response.data)
        enrollments.push(d);
    });
    return enrollments;
  }

  getEnrolledCoursesById(userId: number): Observable<Courses[]> { // <-- NEW SERVICE FUNCTION
    const url = `${this.enrollmentsApiUrl}/${userId}/courses`; // Construct the specific URL
    let headers = new HttpHeaders();
    headers= headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    console.log(`UserService: Fetching enrolled courses from: ${url}`); // Diagnostic log
    return this.http.get<Courses[]>(url, {headers: headers});
  }

  isUserEnrolled(coureId:number,learnerId:number):Observable<Boolean>{
    const url=`${this.enrollmentsApiUrl}/isEnrolled?learnerId=${learnerId}&courseId=${coureId}`;
    let headers = new HttpHeaders();
    headers= headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Boolean>(url,{headers:headers});
  }
}
