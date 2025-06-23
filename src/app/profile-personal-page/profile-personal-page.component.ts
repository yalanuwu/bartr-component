import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavbarComponentComponent } from '../navbar-component/navbar-component.component';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';
import { CourseEnrolledComponent } from "../course-enrolled/course-enrolled.component";
import { CourseCreatedComponent } from "../course-created/course-created.component";
import { ProfileSettingsSectionComponent } from '../profile-settings-section/profile-settings-section.component';
import { TransactionHistoryComponent } from "../transaction-history/transaction-history.component";
import { Courses, User } from '../types';
import axios from 'axios';
import { UserService } from '../services/user.service';
import { NgIf } from '@angular/common';
import { CourseService } from '../services/course.service';
import { EnrollmentService } from '../services/enrollment.service';


export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-profile-personal-page',
  imports: [NavbarComponentComponent, PersonalInformationComponent, CourseEnrolledComponent, CourseCreatedComponent, ProfileSettingsSectionComponent, TransactionHistoryComponent, NgIf],
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

  activeTab: 'Personal Information' | 'Courses Enrolled' | 'Courses Created'| 'Transaction' | 'Profile Settings' = 'Personal Information';

  user: User | null = null;
  enrolledCourses: Courses[] | null = null;
  coursesCreated: Courses[] | null = null;



  // allCourses: Courses[] = [
  //       {
  //         id: 1,
  //         title: 'Modern Website Creation',
  //         description: 'Learn to create modern web pages using popular frameworks',
  //         level: 'Beginner',
  //         features: ['Responsive Design', 'HTML5', 'CSS3', 'JavaScript Basics'],
  //         courseOutLine: 'Detailed course outline for modern web development.',
  //         price: 19.99, // Example price
  //         imageUrl: 'assets/course_images/modern_website.png',
  //         videoUrl: 'https://www.example.com/modern_website_video.mp4',
  //         enrolledUser: 120,
  //         category: { id: 1, name: 'Web Development', imageUrl: 'path/to/web_icon.png', description: 'Courses on web development.' },
  //         creator: { id: 101, username: 'alixdesign', email: 'alix@example.com', phone: '123-456-7890', fullname: 'Alix Design', xp: 50 },
  //         createdAt: '2023-01-15T10:00:00Z',
  //       },
  //       {
  //         id: 2,
  //         title: 'Create Responsive UI / UX mobile designs',
  //         description: 'Create responsive UI / UX mobile designs',
  //         level: 'Intermediate',
  //         features: ['Figma', 'Sketch', 'User Research', 'Prototyping'],
  //         courseOutLine: 'Comprehensive guide to responsive UI/UX.',
  //         price: 29.99, // Example price
  //         imageUrl: 'assets/course_images/responsive_ui.png',
  //         videoUrl: 'https://www.example.com/responsive_ui_video.mp4',
  //         enrolledUser: 90,
  //         category: { id: 2, name: 'UI/UX Design', imageUrl: 'path/to/uiux_icon.png', description: 'Courses on user interface and experience design.' },
  //         creator: { id: 102, username: 'kashiftaj', email: 'kashif@example.com', phone: '987-654-3210', fullname: 'Kashif Taj', xp: 75 },
  //         createdAt: '2023-02-20T11:30:00Z',
  //       },
  //       {
  //         id: 3,
  //         title: 'Learn to create an amazing website or app promo video',
  //         description: 'Learn to create an amazing website or app promo video',
  //         level: 'Beginner',
  //         features: ['Adobe Premiere', 'Video Editing', 'Motion Graphics'],
  //         courseOutLine: 'Learn video production for app promotion.',
  //         price: 24.99, // Example price
  //         imageUrl: 'assets/course_images/app_promo.png',
  //         videoUrl: 'https://www.example.com/app_promo_video.mp4',
  //         enrolledUser: 70,
  //         category: { id: 3, name: 'Video Production', imageUrl: 'path/to/video_icon.png', description: 'Courses on video creation.' },
  //         creator: { id: 103, username: 'airb123', email: 'airb@example.com', phone: '555-123-4567', fullname: 'Air B', xp: 40 },
  //         createdAt: '2023-03-10T09:15:00Z',
  //       },
  //       {
  //         id: 4,
  //         title: 'Learn to design social media post, Instagram post, Facebook post ads',
  //         description: 'Learn to design social media post, Instagram post, Facebook post ads',
  //         level: 'Advanced',
  //         features: ['Photoshop', 'Illustrator', 'Social Media Marketing'],
  //         courseOutLine: 'Master social media graphic design.',
  //         price: 34.99, // Example price
  //         imageUrl: 'assets/course_images/social_media.png',
  //         videoUrl: 'https://www.example.com/social_media_video.mp4',
  //         enrolledUser: 150,
  //         category: { id: 4, name: 'Marketing', imageUrl: 'path/to/marketing_icon.png', description: 'Courses on digital marketing.' },
  //         creator: { id: 104, username: 'almomen980', email: 'almo@example.com', phone: '111-222-3333', fullname: 'Al Momen', xp: 100 },
  //         createdAt: '2023-04-01T14:00:00Z',
  //       },
  //       {
  //         id: 5,
  //         title: 'Backend Development with Node.js',
  //         description: 'Build robust backend systems using Node.js and Express',
  //         level: 'Advanced',
  //         features: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
  //         courseOutLine: 'Advanced backend development concepts.',
  //         price: 49.99, // Example price
  //         imageUrl: 'assets/course_images/backend_node.png',
  //         videoUrl: 'https://www.example.com/backend_node_video.mp4',
  //         enrolledUser: 80,
  //         category: { id: 1, name: 'Web Development', imageUrl: 'path/to/web_icon.png', description: 'Courses on web development.' },
  //         creator: { id: 101, username: 'alixdesign', email: 'alix@example.com', phone: '123-456-7890', fullname: 'Alix Design', xp: 150 },
  //         createdAt: '2023-05-05T16:00:00Z',
  //       },
  //       {
  //         id: 6,
  //         title: 'Mobile App Design with Sketch',
  //         description: 'Design intuitive and beautiful mobile applications',
  //         level: 'Intermediate',
  //         features: ['Sketch', 'UI Grids', 'Design Systems', 'User Flows'],
  //         courseOutLine: 'Master mobile app design with Sketch.',
  //         price: 39.99, // Example price
  //         imageUrl: 'assets/course_images/mobile_sketch.png',
  //         videoUrl: 'https://www.example.com/mobile_sketch_video.mp4',
  //         enrolledUser: 60,
  //         category: { id: 2, name: 'UI/UX Design', imageUrl: 'path/to/uiux_icon.png', description: 'Courses on user interface and experience design.' },
  //         creator: { id: 102, username: 'kashiftaj', email: 'kashif@example.com', phone: '987-654-3210', fullname: 'Kashif Taj', xp: 120 },
  //         createdAt: '2023-06-10T10:00:00Z',
  //       },
  //     ];

  constructor(private service:UserService, private courseService: CourseService, private enrollmentService: EnrollmentService, private authService: AuthService) { }

  ngOnInit(): void {
    const username = localStorage.getItem("username");
    if (username) {
      this.service.getByUserName(username).subscribe({
        next: (userData: User) => {
          this.user = userData;
          console.log('ProfilePersonalPageComponent: User data fetched:', this.user);

          // Now that we have the user ID, fetch enrolled courses
          if (this.user.id) { // Ensure user.id exists
            this.courseService.getCoursesByCreator(this.user.id).subscribe({
              next: (coursesData: Courses[]) => {
                this.coursesCreated = coursesData;
                console.log('ProfilePersonalPageComponent: Created courses fetched:', this.coursesCreated);
              },
              error: (err) => {
                console.error('ProfilePersonalPageComponent: Failed to fetch enrolled courses:', err);
                this.coursesCreated = []; // Set to empty array on error or null
              }
            });

            this.enrollmentService.getEnrolledCoursesById(this.user.id).subscribe({ // <-- USING THE NEW FUNCTION HERE
              next: (coursesData: Courses[]) => {
                this.enrolledCourses = coursesData;
                console.log('ProfilePersonalPageComponent: Enrolled courses fetched:', this.enrolledCourses);
              },
              error: (err) => {
                console.error('ProfilePersonalPageComponent: Failed to fetch enrolled courses:', err);
                this.enrolledCourses = []; // Set to empty array on error
              }
            });

            // If you also want to fetch courses created by this user
            // this.userService.getCoursesCreatedByCreator(this.user.id).subscribe({
            //   next: (createdCoursesData: Courses[]) => {
            //     this.coursesCreated = createdCoursesData;
            //     console.log('ProfilePersonalPageComponent: Created courses fetched:', this.coursesCreated);
            //   },
            //   error: (err) => {
            //     console.error('ProfilePersonalPageComponent: Failed to fetch created courses:', err);
            //     this.coursesCreated = [];
            //   }
            // });

          } else {
            console.warn('ProfilePersonalPageComponent: User ID not available to fetch enrolled courses.');
          }
        },
        error: (err) => {
          console.error('ProfilePersonalPageComponent: Failed to fetch user data:', err);
          this.user = null;
          this.enrolledCourses = []; // Clear enrolled courses if user data fails
          this.coursesCreated = [];
        }
      });
    } else {
      console.warn('ProfilePersonalPageComponent: Username not found in localStorage. Cannot fetch user data.');
      this.user = null;
      this.enrolledCourses = [];
    }
  }

  setActiveTab(tab: 'Personal Information' | 'Courses Enrolled' | 'Courses Created'| 'Transaction' | 'Profile Settings'): void {
    this.activeTab = tab;
    console.log(`Navigating to: ${this.activeTab}`);
  }

  signOut(): void {
    console.log('User signed out!');
    // Implement your sign-out logic here (e.g., clear session, redirect to login)
    // Example: this.router.navigate(['/login']);
  }
}
