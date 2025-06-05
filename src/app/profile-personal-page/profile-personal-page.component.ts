import { Component, OnInit } from '@angular/core';
import { NavbarComponentComponent } from '../navbar-component/navbar-component.component';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';
import { CourseEnrolledComponent } from "../course-enrolled/course-enrolled.component";

export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-profile-personal-page',
  imports: [NavbarComponentComponent, PersonalInformationComponent, CourseEnrolledComponent],
  templateUrl: './profile-personal-page.component.html',
  styleUrl: './profile-personal-page.component.css'
})
export class ProfilePersonalPageComponent implements OnInit{
  userName: string = 'Username';
  userEmail: string = 'profilename123@gmail.com';
  profileName: string = 'Profile Name';
  contactNumber: string = '123456789';
  xp: number = 300;
  countryRegion: string = 'Chennai, India';

  activeSection: 'Personal Information' | 'Courses Enrolled' | 'Courses Created' | 'Profile Settings' = 'Personal Information';

  enrolledCourses: Course[] = [
    // ... (your dummy data for enrolled courses) ...
    {
      id: 'c1',
      title: 'Introduction to Web Development with HTML & CSS',
      description: 'Learn the foundational languages of the web to build structured and styled pages.',
      imageUrl: 'https://via.placeholder.com/400x200?text=Web+Dev',
      instructor: 'John Doe',
    },
    {
      id: 'c2',
      title: 'Mastering JavaScript for Beginners',
      description: 'Understand the core concepts of JavaScript, the language of the web.',
      imageUrl: 'https://via.placeholder.com/400x200?text=JavaScript',
      instructor: 'Jane Smith',
    },
    {
      id: 'c3',
      title: 'Responsive Design with Tailwind CSS',
      description: 'Build modern, responsive layouts quickly using Tailwind CSS utility classes.',
      imageUrl: 'https://via.placeholder.com/400x200?text=Tailwind+CSS',
      instructor: 'Alice Johnson',
    },
    {
      id: 'c4',
      title: 'Angular Fundamentals: Build Your First App',
      description: 'Get started with Angular and build a single-page application from scratch.',
      imageUrl: 'https://via.placeholder.com/400x200?text=Angular+Basics',
      instructor: 'Bob Brown',
    },
    {
      id: 'c5',
      title: 'Python for Data Analysis',
      description: 'An introduction to Python for data manipulation, analysis, and visualization.',
      imageUrl: 'https://via.placeholder.com/400x200?text=Python+Data',
      instructor: 'Charlie Green',
    }
  ];

  courses: Course[] = [
    {
      id: 'course-1',
      title: 'Modern Website Creation',
      instructor: 'alivdesign',
      description: 'Learn to create modern web pages using popular frameworks',
      imageUrl: 'https://placehold.co/400x250/A0A0A0/FFFFFF?text=Web+Dev' // Placeholder image
    },
    {
      id: 'course-2',
      title: 'User Interface & User Experience Designing',
      instructor: 'kaashifhaj',
      description: 'Create Responsive UI / UX mobile designs',
      imageUrl: 'https://placehold.co/400x250/808080/FFFFFF?text=UI/UX' // Placeholder image
    },
    {
      id: 'course-3',
      title: 'Amazing Website or App Promo Video',
      instructor: 'airb123',
      description: 'Learn to create an amazing website or app promo video',
      imageUrl: 'https://placehold.co/400x250/606060/FFFFFF?text=Video+Promo' // Placeholder image
    },
    {
      id: 'course-4',
      title: 'Advanced Data Structures',
      instructor: 'prof.smith',
      description: 'Deep dive into complex data structures and algorithms',
      imageUrl: 'https://placehold.co/400x250/404040/FFFFFF?text=Data+Structures' // Placeholder image
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // You can fetch this data from a service here if needed
    this.activeSection = 'Personal Information';
  }

  selectSection(section: 'Personal Information' | 'Courses Enrolled' | 'Courses Created' | 'Profile Settings'): void {
    this.activeSection = section;
    console.log(`Navigating to: ${this.activeSection}`);
  }

  signOut(): void {
    console.log('User signed out!');
    // Implement your sign-out logic here (e.g., clear session, redirect to login)
    // Example: this.router.navigate(['/login']);
  }
}
