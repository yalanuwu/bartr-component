import { Component, OnInit } from '@angular/core';
import { Courses, Category, User } from '../types';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NavbarComponentComponent } from '../navbar-component/navbar-component.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { generateAvatarUrl } from '../util';
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
  constructor(
    private route: ActivatedRoute, // To read route parameters
    private router: Router,         // To navigate if needed
    private courseService:CourseService
  ) { }

  ngOnInit(): void {
    // Get course ID from route parameters
    this.route.paramMap.subscribe(params => {
      const courseIdParam = params.get('id');
      if (courseIdParam) {
        const courseId = +courseIdParam; // Convert string to number
        this.fetchCourseDetails(courseId);
      } else {
        this.error = 'Course ID not provided in the URL.';
        this.isLoading = false;
      }
    });
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
}
