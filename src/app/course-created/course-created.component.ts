import { CourseCardComponent } from '../course-card/course-card.component';
import { Course } from '../profile-personal-page/profile-personal-page.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-created',
  imports: [CourseCardComponent],
  templateUrl: './course-created.component.html',
  styleUrl: './course-created.component.css'
})
export class CourseCreatedComponent {
  @Input() courses: Course[] = [];


  createCourse = () => {
    //TODO : Add course creation logic
    console.log("Course Created Component load");

  }
}
