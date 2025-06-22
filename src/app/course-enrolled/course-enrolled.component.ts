import { Component, Input } from '@angular/core';
import { CourseCardComponent } from '../course-card/course-card.component';
import { Course } from '../profile-personal-page/profile-personal-page.component';
import { CourseCardGeneralComponent } from "../course-card-general/course-card-general.component";
import { RouterLink } from '@angular/router';
import { Courses } from '../types';

@Component({
  selector: 'app-course-enrolled',
  imports: [ CourseCardGeneralComponent, RouterLink],
  templateUrl: './course-enrolled.component.html',
  styleUrl: './course-enrolled.component.css'
})
export class CourseEnrolledComponent {
    @Input() courses: Courses[] = [];

    explore = () => {
      console.log("Explore Courses Component load");
      //TODO : Add course exploration logic
    }

    constructor() {}
}
