import { EnrollmentService } from './../services/enrollment.service';
// src/app/course-detail-page/course-page.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponentComponent } from "../navbar-component/navbar-component.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NotEnoughXpModalComponent } from "../not-enough-xp-modal/not-enough-xp-modal.component";
import { EnrollmentSuccessModalComponent } from "../enrollment-success-modal/enrollment-success-modal.component";

import { CourseService } from '../services/course.service';
import { Courses, User } from '../types';
import { UserService } from '../services/user.service';
import { generateAvatarUrl } from '../util';
import { ToastrService } from '../toastr/toastr.service';
import { forkJoin, of } from 'rxjs'; // Import forkJoin and of
import { switchMap, tap, catchError } from 'rxjs/operators'; // Import operators


interface Feature {
  text: string;
  included: boolean;
}

interface CourseLevel {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface Package {
  name: 'Basic' | 'Standard' | 'Premium';
  price: number;
  description: string;
  durationHours: number;
  features: Feature[];
}


@Component({
  selector: 'app-course-detail-page',
  standalone: true,
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css'],
  imports: [NavbarComponentComponent, NgIf, NgFor, NotEnoughXpModalComponent, EnrollmentSuccessModalComponent, NgClass]
})
export class CourseDetailPageComponent implements OnInit {


  @Input() enrolled: boolean = false;

  course: Courses | null = null;
  private courseId: number | null = null;
  user: User | null = null;
  categoryName: string = '';

  userCurrentXp: number = 0; // Initialize with 0, will be updated from user data

  showNotEnoughXpModal: boolean = false;
  showEnrollmentSuccessModal: boolean = false;

  currentImageIndex: number = 0;

  selectedPackage: Package = {
    name: 'Basic',
    price: 0,
    description: '',
    durationHours: 0,
    features: []
  };

  isEnrolledOrCreated: Boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private userService: UserService,
    private enrollmentService: EnrollmentService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    // Use switchMap to chain the observables
    this.route.paramMap.pipe(
      switchMap(params => {
        const idString = params.get('id');
        if (idString) {
          this.courseId = +idString;
          // Use forkJoin to fetch course and user data in parallel
          const username = localStorage.getItem('username');
          return forkJoin([
            this.courseService.getCourseById(this.courseId).pipe(
              tap((courseData: Courses) => {
                this.course = courseData;
                this.categoryName = courseData.category.name!;
                console.log('Course Category Name:', this.categoryName);
                console.log('Fetched course details:', this.course);
                if (this.course && this.course.creator && this.course.creator.fullname) {
                  this.course.creator.avatarUrl = generateAvatarUrl(this.course.creator.fullname);
                }
                if (this.course.price !== undefined) {
                  this.selectedPackage = {
                    name: 'Basic',
                    price: this.course.price,
                    description: this.course.description,
                    durationHours: 0,
                    features: this.course.features.map(f => ({ text: f, included: true }))
                  };
                }
              }),
              catchError(err => {
                console.error('Error fetching course details:', err);
                this.toastr.showError('Could not load course details. Please try again or choose another course.');
                this.router.navigate(['/courses']);
                return of(null); // Return an observable of null to continue forkJoin but handle error
              })
            ),
            username ? this.userService.getByUserName(username).pipe(
              tap((userData: User) => {
                this.user = userData;
                this.userCurrentXp = userData.xp!;
                console.log('CoursePageComponent: User data fetched:', this.user.xp);
              }),
              catchError(err => {
                console.error('CoursePageComponent: Failed to fetch user:', err);
                return of(null); // Return an observable of null to continue forkJoin but handle error
              })
            ) : of(null) // If no username, provide an observable of null for the user
          ]);
        } else {
          console.error('Course ID not found in URL. Redirecting to home or course list.');
          this.router.navigate(['/']);
          return of([null, null]); // Return an observable with nulls
        }
      }),
      switchMap(([courseData, userData]) => {
        if (!courseData) {
          return of(false); // If course data failed to load, no need to check enrollment
        }

        // Check if the current user is the creator
        const username = localStorage.getItem('username');
        if (username && courseData.creator && username === courseData.creator.username) {
          this.isEnrolledOrCreated = true;
          return of(true); // User is creator, no need to check enrollment
        }

        // Only proceed to check enrollment if a user is logged in and not the creator
        if (this.user && this.courseId && !this.isEnrolledOrCreated) {
          return this.enrollmentService.isUserEnrolled(this.courseId, this.user.id!).pipe(
            tap((isEnrolled: Boolean) => {
              this.isEnrolledOrCreated = isEnrolled;
              console.log('Enrollment status:', this.isEnrolledOrCreated);
            }),
            catchError(err => {
              console.error('CoursePageComponent: Failed to fetch enrollment:', err);
              this.isEnrolledOrCreated = false;
              return of(false); // Return observable of false on error
            })
          );
        }
        return of(false); // Default to not enrolled if conditions aren't met
      })
    ).subscribe({
      next: () => {
        // All data fetched and enrollment status checked
        console.log('All initial data loaded and enrollment status set.');
      },
      error: (err) => {
        // This catch-all error might be too broad; individual catches are better.
        console.error('An unexpected error occurred during initialization:', err);
      }
    });
  }

  // No longer needed as fetchCourseDetails is integrated into ngOnInit's observable chain
  // fetchCourseDetails(id: number): void { ... }

  // ... rest of your component methods ...

  selectPackage(pkg: Package): void {
    this.selectedPackage = pkg;
  }

  nextImage(): void {
    // Implement if you have an array of images in your Courses interface
  }

  prevImage(): void {
    // Implement if you have an array of images in your Courses interface
  }

  onEnroll(): void {
    if (!this.course) {
      console.error('Course data not loaded yet.');
      this.toastr.showError('Course data not loaded. Please try again.');
      return;
    }

    if (!this.user) {
      this.toastr.showError('Please sign in to enroll in courses.');
      this.router.navigate(['auth/signin']);
      return;
    }

    if (this.isEnrolledOrCreated) {
      this.router.navigate(['/course-content', this.course.id]);
      return;
    }

    if (this.userCurrentXp >= this.course.price) {
      this.enrollmentService.enroll(this.courseId!, this.user.id!).subscribe({
        next: () => {
          this.showEnrollmentSuccessModal = true;
          this.userCurrentXp -= this.course!.price; // Deduct XP after successful enrollment
          console.log(`Enrolled in "${this.course!.title}". Remaining XP: ${this.userCurrentXp}`);
          this.isEnrolledOrCreated = true; // Update status
          this.toastr.showSuccess('Enrollment successful!');
        },
        error: (err) => {
          console.error('Error during enrollment:', err);
          this.toastr.showError('Enrollment failed. Please try again.');
        }
      });
    } else {
      this.showNotEnoughXpModal = true;
      console.log(`Insufficient XP to enroll. Required: ${this.course.price}, Available: ${this.userCurrentXp}`);
    }
  }

  closeXpModal(): void {
    console.log('Not Enough XP Modal closed.');
    this.showNotEnoughXpModal = false;
  }

  earnMoreXpFromModal(): void {
    console.log('User wants to earn more XP. Navigating to profile courses enrolled tab.');
    this.showNotEnoughXpModal = false;
    this.router.navigate(['/profile'], { queryParams: { tab: 'Courses Enrolled' } });
  }

  viewEnrolledCourse(): void {
    if (!this.course) return;

    console.log('User wants to view the enrolled course. Navigating to course content.');
    this.showEnrollmentSuccessModal = false;
    this.router.navigate(['/course-content', this.course.id]);
  }

  closeEnrollmentModal(): void {
    console.log('Enrollment Success Modal closed. Navigating to home.');
    this.showEnrollmentSuccessModal = false;
    this.router.navigate(['/']);
  }

  onContactClick() {
    // throw new Error('Method not implemented.');
    window.location.href = 'mailto:' + this.course?.creator?.email;
  }

  onCreatorClick() {
    this.router.navigate(['/public-profile/', this.course?.creator?.username])
  }
}
