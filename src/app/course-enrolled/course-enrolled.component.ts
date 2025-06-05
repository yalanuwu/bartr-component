import { Component, Input } from '@angular/core';
import { CourseCardComponent } from '../course-card/course-card.component';
import { Course } from '../profile-personal-page/profile-personal-page.component';

@Component({
  selector: 'app-course-enrolled',
  imports: [CourseCardComponent],
  templateUrl: './course-enrolled.component.html',
  styleUrl: './course-enrolled.component.css'
})
export class CourseEnrolledComponent {
    @Input() courses: Course[] = [];

    constructor() {}
}
