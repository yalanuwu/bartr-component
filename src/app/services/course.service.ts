// src/app/services/course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs'; // Import Observable
import { map } from 'rxjs/operators'; // Import map operator for transformations
import { api } from '../api'; // Assuming 'api' is a constant with your base URL
import { Courses } from '../types'; // Import Courses interface

// Remove axios as we are switching to HttpClient
// import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private readonly defUrl: string = '/api/courses';
  private readonly baseUrl: string; // To store the combined base URL

  constructor(private http: HttpClient) {
    this.baseUrl = api.url + this.defUrl; // Combine api.url with defUrl in constructor
  }

  /**
   * Fetches all courses from the backend.
   * @returns An Observable that emits an array of Courses.
   */
  getAllCourses(): Observable<Courses[]> {
    return this.http.get<Courses[]>(this.baseUrl);
  }

  /**
   * Fetches courses created by a specific creator.
   * @param creatorId The ID of the creator.
   * @returns An Observable that emits an array of Courses.
   */
  getCoursesByCreator(creatorId: number): Observable<Courses[]> {
    return this.http.get<Courses[]>(`${this.baseUrl}/creator/${creatorId}`);
  }

  /**
   * Fetches courses belonging to a specific category.
   * @param categoryId The ID of the category.
   * @returns An Observable that emits an array of Courses.
   */
  getCoursesByCategory(categoryId: number): Observable<Courses[]> {
    return this.http.get<Courses[]>(`${this.baseUrl}/category/${categoryId}`);
  }

  /**
   * Fetches a single course by its ID and processes its features string.
   * @param courseId The ID of the course.
   * @returns An Observable that emits the Course object with features as an array.
   */
  getCourseById(courseId: number): Observable<Courses> {
    return this.http.get<Courses>(`${this.baseUrl}/${courseId}`).pipe(
      map(course => {
        // Assuming course.features is a comma-separated string from the backend
        // We'll split it into an array here.
        if (typeof course.features === 'string') {
          // Type assertion to ensure 'features' can be assigned to 'string[]'
          // This requires your Courses interface to have `features: string | string[];`
          // or `features: any;` or better, adjust the backend to send it as array if possible
          (course.features as any) = (course.features as string).split(',').map(f => f.trim());
        }
        return course;
      })
    );
  }

  /**
   * Deletes a course by its ID.
   * The component calling this method should handle success/error messages.
   * @param courseId The ID of the course to delete.
   * @returns An Observable that emits the backend response (or void if no content).
   */
  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteCourse/${courseId}`);
  }

  /**
   * Updates an existing course.
   * The component calling this method should handle success/error messages.
   * @param course The Course object with updated data.
   * @returns An Observable that emits the backend response (or void if no content).
   */
  updateCourse(course: Courses): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateCourse/${course.id}`, course);
  }

  /**
   * Inserts a new course.
   * The component calling this method should handle success/error messages.
   * @param course The Course object to insert.
   * @returns An Observable that emits the backend response (or void if no content).
   */
  insertCourse(course: Courses): Observable<any> {
    return this.http.post(`${this.baseUrl}/insertCourse`, course);
  }
}
