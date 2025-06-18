import { Component, OnInit } from '@angular/core';
import { NavbarComponentComponent } from '../navbar-component/navbar-component.component';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';
import { CourseEnrolledComponent } from "../course-enrolled/course-enrolled.component";
import { CourseCreatedComponent } from "../course-created/course-created.component";
import { ProfileSettingsSectionComponent } from '../profile-settings-section/profile-settings-section.component';
import { TransactionHistoryComponent } from "../transaction-history/transaction-history.component";


export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-profile-personal-page',
  imports: [NavbarComponentComponent, PersonalInformationComponent, CourseEnrolledComponent, CourseCreatedComponent, ProfileSettingsSectionComponent, TransactionHistoryComponent],
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

  enrolledCourses =  [

      {
        imageUrl: 'assets/course_images/modern_website.png',
        imageBackgroundGradient: 'from-purple-500 to-pink-500',
        authorAvatarUrl: 'assets/avatars/avatar1.png',
        authorName: 'alixdesign',
        title: 'Modern Website Creation',
        description: 'Learn to create modern web pages using popular frameworks',
        xp: 50
      },
      {
        imageUrl: 'assets/course_images/responsive_ui.png',
        imageBackgroundGradient: 'from-red-500 to-orange-500',
        authorAvatarUrl: 'assets/avatars/avatar2.png',
        authorName: 'kashiftaj',
        title: 'Create Responsive UI / UX mobile designs',
        description: 'Create responsive UI / UX mobile designs',
        xp: 50
      },
      {
        imageUrl: 'assets/course_images/app_promo.png',
        imageBackgroundGradient: 'from-blue-500 to-green-500',
        authorAvatarUrl: 'assets/avatars/avatar3.png',
        authorName: 'airb123',
        title: 'Learn to create an amazing website or app promo video',
        description: 'Learn to create an amazing website or app promo video',
        xp: 40
      },
      {
        imageUrl: 'assets/course_images/social_media.png',
        imageBackgroundGradient: 'from-yellow-500 to-orange-500',
        authorAvatarUrl: 'assets/avatars/avatar4.png',
        authorName: 'almomen980',
        title: 'Learn to design social media post, Instagram post, Facebook post ads',
        description: 'Learn to design social media post, Instagram post, Facebook post ads',
        xp: 30
      },
      {
        imageUrl: 'assets/course_images/modern_website.png',
        imageBackgroundGradient: 'from-purple-500 to-pink-500',
        authorAvatarUrl: 'assets/avatars/avatar1.png',
        authorName: 'alixdesign',
        title: 'Modern Website Creation',
        description: 'Learn to create modern web pages using popular frameworks',
        xp: 50
      },
      {
        imageUrl: 'assets/course_images/responsive_ui.png',
        imageBackgroundGradient: 'from-red-500 to-orange-500',
        authorAvatarUrl: 'assets/avatars/avatar2.png',
        authorName: 'kashiftaj',
        title: 'Create Responsive UI / UX mobile designs',
        description: 'Create responsive UI / UX mobile designs',
        xp: 50
      },
      {
        imageUrl: 'assets/course_images/app_promo.png',
        imageBackgroundGradient: 'from-blue-500 to-green-500',
        authorAvatarUrl: 'assets/avatars/avatar3.png',
        authorName: 'airb123',
        title: 'Learn to create an amazing website or app promo video',
        description: 'Learn to create an amazing website or app promo video',
        xp: 40
      },
      {
        imageUrl: 'assets/course_images/social_media.png',
        imageBackgroundGradient: 'from-yellow-500 to-orange-500',
        authorAvatarUrl: 'assets/avatars/avatar4.png',
        authorName: 'almomen980',
        title: 'Learn to design social media post, Instagram post, Facebook post ads',
        description: 'Learn to design social media post, Instagram post, Facebook post ads',
        xp: 30
      },

      // Add more course objects here as needed

  ];

  coursesCreated = [
    {
      imageUrl: 'assets/course_images/modern_website.png',
      imageBackgroundGradient: 'from-purple-500 to-pink-500',
      authorAvatarUrl: 'assets/avatars/avatar1.png',
      authorName: 'alixdesign',
      title: 'Modern Website Creation',
      description: 'Learn to create modern web pages using popular frameworks',
      xp: 50
    },
    {
      imageUrl: 'assets/course_images/responsive_ui.png',
      imageBackgroundGradient: 'from-red-500 to-orange-500',
      authorAvatarUrl: 'assets/avatars/avatar2.png',
      authorName: 'kashiftaj',
      title: 'Create Responsive UI / UX mobile designs',
      description: 'Create responsive UI / UX mobile designs',
      xp: 50
    },
    {
      imageUrl: 'assets/course_images/app_promo.png',
      imageBackgroundGradient: 'from-blue-500 to-green-500',
      authorAvatarUrl: 'assets/avatars/avatar3.png',
      authorName: 'airb123',
      title: 'Learn to create an amazing website or app promo video',
      description: 'Learn to create an amazing website or app promo video',
      xp: 40
    },
    {
      imageUrl: 'assets/course_images/social_media.png',
      imageBackgroundGradient: 'from-yellow-500 to-orange-500',
      authorAvatarUrl: 'assets/avatars/avatar4.png',
      authorName: 'almomen980',
      title: 'Learn to design social media post, Instagram post, Facebook post ads',
      description: 'Learn to design social media post, Instagram post, Facebook post ads',
      xp: 30
    },
    {
      imageUrl: 'assets/course_images/modern_website.png',
      imageBackgroundGradient: 'from-purple-500 to-pink-500',
      authorAvatarUrl: 'assets/avatars/avatar1.png',
      authorName: 'alixdesign',
      title: 'Modern Website Creation',
      description: 'Learn to create modern web pages using popular frameworks',
      xp: 50
    },
    {
      imageUrl: 'assets/course_images/responsive_ui.png',
      imageBackgroundGradient: 'from-red-500 to-orange-500',
      authorAvatarUrl: 'assets/avatars/avatar2.png',
      authorName: 'kashiftaj',
      title: 'Create Responsive UI / UX mobile designs',
      description: 'Create responsive UI / UX mobile designs',
      xp: 50
    },
    {
      imageUrl: 'assets/course_images/app_promo.png',
      imageBackgroundGradient: 'from-blue-500 to-green-500',
      authorAvatarUrl: 'assets/avatars/avatar3.png',
      authorName: 'airb123',
      title: 'Learn to create an amazing website or app promo video',
      description: 'Learn to create an amazing website or app promo video',
      xp: 40
    },
    {
      imageUrl: 'assets/course_images/social_media.png',
      imageBackgroundGradient: 'from-yellow-500 to-orange-500',
      authorAvatarUrl: 'assets/avatars/avatar4.png',
      authorName: 'almomen980',
      title: 'Learn to design social media post, Instagram post, Facebook post ads',
      description: 'Learn to design social media post, Instagram post, Facebook post ads',
      xp: 30
    },
  ];

  constructor() { }

  ngOnInit(): void {

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
