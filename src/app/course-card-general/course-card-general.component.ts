import { NgClass } from '@angular/common';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Courses } from '../types';
import { Router } from '@angular/router';
import { generateAvatarUrl } from '../util';
import { User } from '../types';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-course-card-general',
  imports: [NgClass],
  templateUrl: './course-card-general.component.html',
  styleUrl: './course-card-general.component.css'
})
export class CourseCardGeneralComponent implements OnInit{
  @Input() course!: Courses;
  @Input() showXP: boolean = true;
  @Input() animation: boolean = false;

  courseEnrolledNumber : number = 200;

  creatorAvatarUrl: string = '';

  ngOnInit(): void {
    if (this.course && this.course.creator && this.course.creator.fullname) {
      this.creatorAvatarUrl = generateAvatarUrl(this.course.creator.fullname);
    } else {
      // Fallback if creator fullname is not available
      this.creatorAvatarUrl = generateAvatarUrl('');
    }
  }

  constructor (public elementRef: ElementRef, private router: Router,private userService:UserService) {

  }

  goToCourseDetails(): void {
    // Navigate to the course details page using the course's ID
    // Assuming your route is defined like '/courses/:id' or '/course/:id'
    this.router.navigate(['/course', this.course.id]);
    // Or if you want to use query parameters:
    // this.router.navigate(['/course-page'], { queryParams: { id: this.course.id } });
  }

  publicProfile(username:string):void{
    this.router.navigate(['/public-profile',this.course.creator.username]);
  }

}
