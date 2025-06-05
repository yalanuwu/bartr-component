import { Component, Input } from '@angular/core';
import { Course } from '../profile-personal-page/profile-personal-page.component';

@Component({
  selector: 'app-course-card',
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
	@Input() course!: Course;

  constructor() {}
}
