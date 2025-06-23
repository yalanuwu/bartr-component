import { Injectable } from '@angular/core';
import axios from 'axios';
import { api } from '../api';
import { Courses, Enrollment } from '../types';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  defUrl:string='/api/enrollments';
  private readonly enrollmentsApiUrl = `${environment.apiUrl}/api/enrollments`;
  constructor(private http: HttpClient) { }

  enroll(course:Courses,userId:number):void{
    axios.post(api.url+this.defUrl+`/insert/${userId}/${course.id}`).then(function(response){"Enrolled successfully"});
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

}
