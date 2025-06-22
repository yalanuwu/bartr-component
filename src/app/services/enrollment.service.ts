import { Injectable } from '@angular/core';
import axios from 'axios';
import { api } from '../api';
import { Courses, Enrollment } from '../types';
@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  defUrl:string='/api/enrollments';
  constructor() { }

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
}
