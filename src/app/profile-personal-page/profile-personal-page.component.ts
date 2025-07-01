// src/app/profile/profile-personal-page/profile-personal-page.component.ts

import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core'; // Add OnDestroy
import { NavbarComponentComponent } from '../navbar-component/navbar-component.component';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';
import { CourseEnrolledComponent } from "../course-enrolled/course-enrolled.component";
import { CourseCreatedComponent } from "../course-created/course-created.component";
import { ProfileSettingsSectionComponent } from '../profile-settings-section/profile-settings-section.component';
import { TransactionHistoryComponent } from "../transaction-history/transaction-history.component";
import { Courses, User } from '../types';
// import axios from 'axios'; // Not used, can be removed
import { UserService } from '../services/user.service';
import { NgIf } from '@angular/common'; // NgIf is already implicitly imported via standalone components if used
import { CourseService } from '../services/course.service';
import { EnrollmentService } from '../services/enrollment.service';
import { generateAvatarUrl } from '../util';
import { Subscription } from 'rxjs';
import { UserProfileData, EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal.component';


export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-profile-personal-page',
  standalone: true, // Assuming standalone
  imports: [NavbarComponentComponent, PersonalInformationComponent, CourseEnrolledComponent, CourseCreatedComponent, ProfileSettingsSectionComponent, TransactionHistoryComponent, NgIf, EditProfileModalComponent],
  templateUrl: './profile-personal-page.component.html',
  styleUrl: './profile-personal-page.component.css'
})
export class ProfilePersonalPageComponent implements OnInit, OnDestroy { // Implement OnDestroy
  userName: string = 'Username'; // Unused, can be removed if not displayed elsewhere
  userEmail: string = 'profilename123@gmail.com'; // Unused, can be removed
  profileName: string = 'Profile Name'; // Unused, can be removed
  contactNumber: string = '123456789'; // Unused, can be removed
  xp: number = 300; // Unused, can be removed
  countryRegion: string = 'Chennai, India'; // Unused, can be removed

  activeTab: 'Personal Information' | 'Courses Enrolled' | 'Courses Created'| 'Transaction' | 'Profile Settings' = 'Personal Information';

  user: User | null = null; // This is the user object that needs to be populated
  enrolledCourses: Courses[] | null = null;
  coursesCreated: Courses[] | null = null;
  userAvatarUrl : string = '';

  showEditProfileModal: boolean = false;
  private userSubscription! : Subscription; // For the getByUserName subscription

  constructor(
    private userService:UserService,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log('ProfilePersonalPageComponent: ngOnInit started.');
    const username = localStorage.getItem("username");
    console.log('ProfilePersonalPageComponent: Username from localStorage:', username);

    if (username) {
      this.userAvatarUrl = generateAvatarUrl(username);
      // Subscribe to getByUserName and store the subscription
      this.userSubscription = this.userService.getByUserName(username).subscribe({
        next: (userData: User) => {
          this.user = userData; // This is where the user object is assigned
          console.log('ProfilePersonalPageComponent: User data fetched and assigned:', this.user);

          // Now that we have the user ID, fetch enrolled/created courses
          if (this.user.id) {
            this.courseService.getCoursesByCreator(this.user.id).subscribe({
              next: (coursesData: Courses[]) => {
                this.coursesCreated = coursesData;
                console.log('ProfilePersonalPageComponent: Created courses fetched:', this.coursesCreated);
              },
              error: (err) => {
                console.error('ProfilePersonalPageComponent: Failed to fetch created courses:', err);
                this.coursesCreated = [];
              }
            });

            this.enrollmentService.getEnrolledCoursesById(this.user.id).subscribe({
              next: (coursesData: Courses[]) => {
                this.enrolledCourses = coursesData;
                console.log('ProfilePersonalPageComponent: Enrolled courses fetched:', this.enrolledCourses);
              },
              error: (err) => {
                console.error('ProfilePersonalPageComponent: Failed to fetch enrolled courses:', err);
                this.enrolledCourses = [];
              }
            });
          } else {
            console.warn('ProfilePersonalPageComponent: User ID not available to fetch courses (user object exists but id is null/undefined).');
          }
        },
        error: (err) => {
          console.error('ProfilePersonalPageComponent: Failed to fetch user data:', err);
          this.user = null; // Set user to null on error
          this.enrolledCourses = [];
          this.coursesCreated = [];
        }
      });
    } else {
      console.warn('ProfilePersonalPageComponent: Username not found in localStorage. Cannot fetch user data.');
      this.userAvatarUrl = generateAvatarUrl('');
      this.user = null;
      this.enrolledCourses = [];
      this.coursesCreated = [];
    }
    console.log('ProfilePersonalPageComponent: ngOnInit finished. Current user state:', this.user);
  }

  // Implement ngOnDestroy to unsubscribe
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
      console.log('ProfilePersonalPageComponent: userSubscription unsubscribed.');
    }
  }

  setActiveTab(tab: 'Personal Information' | 'Courses Enrolled' | 'Courses Created'| 'Transaction' | 'Profile Settings'): void {
    this.activeTab = tab;
    console.log(`ProfilePersonalPageComponent: Navigating to tab: ${this.activeTab}`);
  }

  signOut(): void {
    console.log('User signed out!');
    // Implement your sign-out logic here
  }

  /**
   * Called when the "Edit Profile" button in PersonalInformationComponent is clicked.
   * Opens the EditProfileModal.
   */
  openEditProfileModal(): void {
    this.showEditProfileModal = true;
    console.log('ProfilePersonalPageComponent: openEditProfileModal called. showEditProfileModal set to TRUE.');
    console.log('ProfilePersonalPageComponent: Current user state when opening modal:', this.user); // Crucial log
  }

  /**
   * Called when the EditProfileModal emits its 'save' event.
   */
  onProfileSaved(updatedProfileData: UserProfileData): void {
    console.log('ProfilePersonalPageComponent: onProfileSaved called. Modal data:', updatedProfileData);
    this.showEditProfileModal = false; // Hide the modal
    // The user object in this component will be updated automatically because it's subscribed
    // to authService.getCurrentUser(), and the modal updates authService.updateCurrentUser().
  }

  /**
   * Called when the EditProfileModal emits its 'cancel' event.
   */
  onCancelEditProfile(): void {
    this.showEditProfileModal = false;
    console.log('ProfilePersonalPageComponent: Edit profile modal cancelled.');
  }
}
