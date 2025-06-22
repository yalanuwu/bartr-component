import { Injectable } from '@angular/core';
import axios from 'axios';
import { api } from '../api';
import { Courses } from '../types';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  defUrl:string='/api/courses';
  constructor() { }
  getAllCourses():Courses[]{
    let courses:Courses[]=[];
    axios.get(api.url+this.defUrl).then(function(response){
      for(let d of response.data)
        courses.push(d);
    });
    return courses;
  }


  getCoursesByCreator(creatorId:number):Courses[]{
    let courses:Courses[]=[];
    axios.get(api.url+this.defUrl+`/creator/${creatorId}`).then(function(response){
      for(let d of response.data)
        courses.push(d);
    });
    return courses;
  }

  getCoursesByCategory(categoryId:number):Courses[]{
    let courses:Courses[]=[];
    axios.get(api.url+this.defUrl+`/category/${categoryId}`).then(function(response){
      for(let d of response.data)
        courses.push(d);
    });
    return courses;
  }

  async getCourseById(courseId:number):Promise<Courses>{
    let course:any;
    await axios.get(api.url+this.defUrl+`/${courseId}`).then(function(response){course=response.data;course.features=response.data.features.split(",")});
    return course;
  }

  deleteCourse(courseId:number):void{
    axios.delete(api.url+this.defUrl+`/deleteCourse/${courseId}`).then(function(response){alert(response.data)});
  }

  updateCourse(course:Courses):void{
    axios.put(api.url+this.defUrl+`/updateCourse/${course.id}`,course).then(function(response){alert("Course updated successfully")});
  }

  insertCourse(course:Courses):void{
    axios.post(api.url+this.defUrl+`/insertCourse`,course).then(function(response){console.log("Course inserted successfully")});
  }
}
