import { Component, Input } from '@angular/core';
import { CourseCardGeneralComponent } from "../course-card-general/course-card-general.component";
import { RouterLink } from '@angular/router';
import { Courses } from '../types';

@Component({
  selector: 'app-course-created',
  imports: [ CourseCardGeneralComponent, RouterLink],
  templateUrl: './course-created.component.html',
  styleUrl: './course-created.component.css'
})
export class CourseCreatedComponent {
  @Input() courses: Courses[] | null = null;


  createCourse = () => {
    //TODO : Add course creation logic
    console.log("Course Created Component load");

  }
}
