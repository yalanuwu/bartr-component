import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Courses, Category, User } from '../types';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NavbarComponentComponent } from '../navbar-component/navbar-component.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { generateAvatarUrl } from '../util';
import { catchError, forkJoin, of, Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { EnrollmentService } from '../services/enrollment.service';
import { ToastrService } from '../toastr/toastr.service';

@Component({
  selector: 'app-course-content-page',
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    NavbarComponentComponent
  ],
  templateUrl: './course-content-page.component.html',
  styleUrl: './course-content-page.component.css'
})

export class CourseContentPageComponent implements OnInit{

  course: Courses | undefined;
  isLoading: boolean = true;
  error: string | null = null;
  username:string='';
  creatorAvatarUrl: string = '';
  currentUser: User | null = null; // To store the current logged-in user
  isEnrolled: boolean = false;
  isCreator: boolean = false;
  accessGranted: boolean = false; // Flag to control content display
  private subscriptions: Subscription = new Subscription(); // To manage subscriptions

  constructor(
    private route: ActivatedRoute, // To read route parameters
    private router: Router,         // To navigate if needed
    private courseService:CourseService,
    private authService: AuthService, // Inject AuthService
    private userService : UserService,
    private enrollmentService: EnrollmentService, // Inject EnrollmentService
    private toastr: ToastrService // Inject ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.error = null;

    this.subscriptions.add(
      this.route.paramMap.pipe(
        switchMap(params => {
          const courseIdParam = params.get('id');
          if (!courseIdParam) {
            this.error = 'Course ID not provided in the URL.';
            this.isLoading = false;
            this.toastr.showError(this.error);
            this.router.navigate(['/courses']); // Redirect if ID is missing
            return of(null); // Return observable that emits null and completes
          }
          const courseId = +courseIdParam;

          // Use forkJoin to get both current user and course details concurrently
          // Then, based on these, determine access
          return forkJoin({
            user: this.userService.getByUserName(localStorage.getItem('username')!),
            course: this.courseService.getCourseById(courseId)
          }).pipe(
            tap(({ user, course }) => {
              this.currentUser = user;
              this.course = course;

              if (!this.currentUser) {
                // User not logged in, or session expired. Redirect to login.
                this.toastr.showError('Please log in to view course content.');
                this.router.navigate(['/auth/signin']);
                this.isLoading = false;
                this.accessGranted = false;
                throw new Error('User not authenticated'); // Stop further processing in this pipe
              }

              if (!this.course) {
                this.error = `Course with ID ${courseId} not found.`;
                this.toastr.showError(this.error);
                this.router.navigate(['/courses']); // Redirect if course not found
                this.isLoading = false;
                this.accessGranted = false;
                throw new Error('Course not found'); // Stop further processing
              }

              this.creatorAvatarUrl = generateAvatarUrl(this.course.creator.fullname || '');
              this.username = this.course.creator.username || ''; // Assuming username is what you want
              console.log('Course fetched:', this.course);
              console.log('Current User:', this.currentUser);

              // Check if current user is the creator
              this.isCreator = (this.currentUser.id === this.course.creator.id);

            }),
            switchMap(({ user, course }) => {
              if (this.isCreator) {
                // If current user is the creator, grant access directly
                this.isEnrolled = false; // Not relevant if creator
                return of(true); // Emit true for access granted
              } else {
                // If not creator, check enrollment status
                return this.enrollmentService.isUserEnrolled(course.id, user!.id);
              }
            }),
            catchError(err => {
              // Catch errors from any of the preceding observables or thrown errors
              console.error('Error in course content access flow:', err);
              if (err.message !== 'User not authenticated' && err.message !== 'Course not found') {
                  this.toastr.showError('An error occurred while checking access. Please try again.');
                  this.router.navigate(['/courses']);
              }
              this.isLoading = false;
              this.accessGranted = false;
              return of(false); // Emit false to indicate no access
            })
          );
        })
      ).subscribe({
        next: (accessResult) => {
          if (accessResult === null) { // This handles the case where courseIdParam was missing
            return;
          }
          this.isEnrolled = accessResult as boolean; // Cast as boolean, as `of(true)` or `isUserEnrolled` returns boolean
          this.accessGranted = this.isCreator || this.isEnrolled;
          this.isLoading = false;

          if (!this.accessGranted && this.course) { // Only show error and redirect if access is genuinely denied
            this.toastr.showError('You do not have access to this course content. Please enroll.');
            this.router.navigate(['/course-details', this.course.id]); // Redirect to course details
          } else if (!this.accessGranted && !this.course) {
             // This case should be handled by earlier checks, but as a fallback
             this.toastr.showError('Access denied or course not found.');
             this.router.navigate(['/courses']);
          }
        },
        error: (err) => {
          // This error block catches errors from the subscription itself if any
          console.error('Subscription error:', err);
          this.isLoading = false;
          this.accessGranted = false;
          this.toastr.showError('Failed to load course content. Please try again.');
          this.router.navigate(['/courses']);
        }
      })
    );
  }

  // Simulate fetching course details from a backend API
  // In a real application, you would inject a service here
  // e.g., constructor(private courseService: CourseService) { }
  // then: this.courseService.getCourseById(id).subscribe(...)
  private fetchCourseDetails(id: number): void {
    this.isLoading = true;
    this.error = null;
    let courseN:Courses;
    let b:boolean=false;
    this.courseService.getCourseById(id).subscribe({
      next: (coursesData: Courses) => {
        courseN = coursesData;
        b=true;
        this.username=generateAvatarUrl(courseN.creator.fullname||'');
        console.log('ProfilePersonalPageComponent: Created courses fetched:',courseN);
      },
      error: (err) => {
        console.error('ProfilePersonalPageComponent: Failed to fetch enrolled courses:', err);
        b=false;
      }
    });
    // Simulate network delay
    setTimeout(() => {
      // Dummy data for demonstration
      if (id === 123) { // Example ID
        this.course = {
          id: 123,
          title: 'Mastering Angular Components & Lifecycle',
          description: 'A comprehensive course to understand Angular components, their lifecycle hooks, and best practices for building reusable UI.',
          level: 'Intermediate',
          features: [
            'In-depth component architecture',
            'Understanding lifecycle hooks (ngOnInit, ngOnChanges, etc.)',
            'Component communication (@Input, @Output)',
            'Building reusable components',
            'Performance optimization tips'
          ],
          courseOutLine: `
            Module 1: Introduction to Angular Components
            - What are Components?
            - Component structure (TS, HTML, CSS)
            - Decorators: @Component

            Module 2: Component Lifecycle Hooks
            - ngOnInit, ngOnChanges, ngDoCheck
            - ngAfterContentInit, ngAfterContentChecked
            - ngAfterViewInit, ngAfterViewChecked
            - ngOnDestroy

            Module 3: Component Interaction
            - Parent-to-Child with @Input()
            - Child-to-Parent with @Output() and EventEmitter
            - ViewChild and ContentChild

            Module 4: Advanced Topics
            - Change Detection Strategies
            - OnPush optimization
            - Dynamic components
          `,
          price: 90,
          imageUrl: 'https://via.placeholder.com/600x400/0000FF/FFFFFF?text=Angular+Course',
          videoUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', // Example MP4 video
          enrolledUser: 150,
          category: {
            id: 1, name: 'Web Development',
            imageUrl: '',
            description: ''
          },
          creator: {
            id: 101, username: 'Jane Doe',
            email: '',
            password: '',
            phone: '',
            fullname: '',
            xp: 0,
            skills: ''
          },
          createdAt: '2023-04-15T10:00:00Z',
        };
      } else if (id === 456) { // Another example course
        this.course = {
          id: 456,
          title: 'Introduction to Python for Data Science',
          description: 'Learn the fundamentals of Python programming specifically tailored for data analysis and scientific computing.',
          level: 'Beginner',
          features: [
            'Python basics and syntax',
            'Working with data structures (lists, dictionaries)',
            'NumPy for numerical operations',
            'Pandas for data manipulation',
            'Basic data visualization with Matplotlib'
          ],
          courseOutLine: `
            Lesson 1: Python Setup and Basics
            Lesson 2: Data Types and Variables
            Lesson 3: Control Flow and Functions
            Lesson 4: Introduction to NumPy
            Lesson 5: DataFrames with Pandas
            Lesson 6: Simple Data Visualization
          `,
          price: 70,
          imageUrl: 'https://via.placeholder.com/600x400/FF0000/FFFFFF?text=Python+Course',
          videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Another example video
          enrolledUser: 320,
          category: { id: 3, name: 'Data Science', imageUrl:'',  description: ''},
          creator: {
            id: 102, username: 'John Smith',
            email: '',
            password: '',
            phone: '',
            fullname: '',
            xp: 0,
            skills: ''
          },
          createdAt: '2024-01-20T14:30:00Z',
        };
      }
      else if(b)
      {
        this.course=courseN;
      }
      else {
        this.error = `Course with ID ${id} not found.`;
        this.course = undefined;
      }
      this.isLoading = false;
    }, 1000); // 1 second delay
  }

  // Optional: Method to navigate back to a course listing or profile
  goBack(): void {
    // Navigate back to where the user came from, or to a default listing page
    this.router.navigate(['/all-categories']);
    // Or this.router.navigate(['/profile'], { queryParams: { tab: 'Enrolled Courses' } });
  }

  onContactClick() {
    // throw new Error('Method not implemented.');
    window.location.href = 'mailto:' + this.course?.creator?.email;
  }

  onCreatorClick() {
    this.router.navigate(['/public-profile/', this.course?.creator?.username])
  }

  onCourseDetailClick() {
    this.router.navigate(['/course-details', this.course?.id])
  }
}
