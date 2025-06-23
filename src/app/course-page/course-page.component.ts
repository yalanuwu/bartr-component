import { EnrollmentService } from './../services/enrollment.service';
// src/app/course-detail-page/course-page.component.ts
import { Component, Input, OnInit } from '@angular/core'; // Removed @Input as data will be fetched
import { NavbarComponentComponent } from "../navbar-component/navbar-component.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // NEW: Import ActivatedRoute
import { NotEnoughXpModalComponent } from "../not-enough-xp-modal/not-enough-xp-modal.component";
import { EnrollmentSuccessModalComponent } from "../enrollment-success-modal/enrollment-success-modal.component";

// NEW: Import your CourseService and Courses interface
import { CourseService } from '../services/course.service'; // Adjust path if necessary
import { Courses, User } from '../types'; // Adjust path if necessary, assuming Courses is the interface from your backend
import { UserService } from '../services/user.service';
import { generateAvatarUrl } from '../util';

// Define the structure of your Feature, CourseLevel, Package interfaces if not already global
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
  standalone: true, // Assuming this is a standalone component
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css'],
  imports: [NavbarComponentComponent, NgIf, NgFor, NotEnoughXpModalComponent, EnrollmentSuccessModalComponent, NgClass]
})
export class CourseDetailPageComponent implements OnInit {

  // Removed @Input() enrolled: boolean = false; -> this state should be derived after fetching course data and user's enrolled courses
  @Input() enrolled: boolean = false;

  // Property to hold the fetched course data
  course: Courses | null = null;
  private courseId: number | null = null; // To store the ID from the route
  user: User | null = null;

  // Mock user XP data (will be replaced by actual system later)
  userCurrentXp: number = 500; // Simulate the user having 500 XP

  showNotEnoughXpModal: boolean = false;
  showEnrollmentSuccessModal: boolean = false;

  currentImageIndex: number = 0;

  // Assume a default/loading package until the course is loaded
  selectedPackage: Package = {
    name: 'Basic',
    price: 0, // Default price
    description: '',
    durationHours: 0,
    features: []
  };

  // Keep these for initial display/loading state if needed, or remove if directly from course object
  // courseTitle: string = 'Loading Course...';
  // levelName: CourseLevel = { level: 'Beginner' };
  // seller: any = { /* default values or null */ };
  // courseImages: string[] = [];
  // aboutGigContent: string = '';


  constructor(
    private router: Router,
    private route: ActivatedRoute, // NEW: Inject ActivatedRoute
    private courseService: CourseService, // NEW: Inject CourseService
    private userService : UserService,
    private enrollmentService:EnrollmentService
  ) { }

  ngOnInit(): void {
    // Subscribe to route parameters to get the course ID
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString) {
        this.courseId = +idString; // Convert string ID to number
        this.fetchCourseDetails(this.courseId);
      } else {
        console.error('Course ID not found in URL. Redirecting to home or course list.');
        this.router.navigate(['/']); // Redirect if no ID is found
      }
    });

    const username = localStorage.getItem('username');
    if (username) {
      this.userService.getByUserName(username).subscribe({
        next: (userData : User) => {
          this.user = userData;
          console.log('CoursePageComponent: User data fetched:', this.user.xp);
        }
      })
    } else {
      console.warn('CoursePageComponent: Username not found in localStorage. Cannot fetch user data.');
      this.user = null;
    }

  }

  fetchCourseDetails(id: number): void {
    this.courseService.getCourseById(id).subscribe({
      next: (data: Courses) => {
        this.course = data;
        console.log('Fetched course details:', this.course);

        if (this.course && this.course.creator && this.course.creator.fullname) {
          // NEW: Override creator's avatarUrl with the generated one
          // This modifies the fetched 'course' object directly, which is fine for display
          this.course.creator.avatarUrl = generateAvatarUrl(this.course.creator.fullname);
        }

        // After fetching the course, initialize derived properties
        // For simplicity, let's assume the first package is always "Basic" and required
        if (this.course.price !== undefined) { // Check if price exists from backend
          this.selectedPackage = {
            name: 'Basic', // Assuming 'Basic' as fixed package from your HTML
            price: this.course.price,
            description: this.course.description, // Use course description for package
            durationHours: 0, // You might need to add this to your Courses interface or derive
            features: this.course.features.map(f => ({ text: f, included: true }))
          };
        }
        // You might need to check if the user is already enrolled here after loading the course
        // For example: this.checkEnrollmentStatus(this.course.id);
      },
      error: (error) => {
        console.error('Error fetching course details:', error);
        // Handle error, e.g., display a message, redirect to 404 page, or courses list
        alert('Could not load course details. Please try again or choose another course.');
        this.router.navigate(['/courses']); // Redirect to course list
      }
    });
  }


  // This method is no longer strictly needed if only one package is displayed,
  // as there's no UI to trigger it.
  // Kept for consistency if you plan to add multiple packages later.
  selectPackage(pkg: Package): void {
    this.selectedPackage = pkg;
  }

  // Method to show the next image
  nextImage(): void {
    if (this.course && this.course.imageUrl) { // Ensure course and imageUrl exists
      // If you have a single imageUrl string and want to simulate multiple, you'll need an array
      // For now, assuming you might fetch multiple images or just have one.
      // If courseImages is an array on your Courses interface:
      // this.currentImageIndex = (this.currentImageIndex + 1) % this.course.courseImages.length;
      // If you only have course.imageUrl: you might want to remove prev/next buttons
    }
     // If you have a single imageUrl and not an array, this functionality needs rethinking
     // For now, let's keep it simple and assume courseImages is part of the fetched course or remove this
  }

  // Method to show the previous image
  prevImage(): void {
    if (this.course && this.course.imageUrl) {
      // Similar to nextImage, depends on how you handle multiple images from backend
      // this.currentImageIndex = (this.currentImageIndex - 1 + this.course.courseImages.length) % this.course.courseImages.length;
    }
  }

  onEnroll(): void {
    if (!this.course) {
      console.error('Course data not loaded yet.');
      alert('Course data not loaded. Please try again.');
      return;

    }

    // Now uses the actual course price from the fetched data
    if (this.userCurrentXp >= this.course.price) {
      // Simulate enrollment
      this.enrollmentService.enroll((this.courseId||0),(this.user?.id||0));
      this.showEnrollmentSuccessModal = true;
      // In a real application, you would:
      // 1. Deduct XP from the user via an API call.
      // 2. Call a service to enroll the user in the course via an API call.
      // 3. Update UI to reflect enrollment status.
      this.userCurrentXp -= this.course.price; // Simulate XP deduction
      console.log(`Enrolled in "${this.course.title}". Remaining XP: ${this.userCurrentXp}`);
      // this.enrolled = true; // This state should likely come from backend after successful enrollment
    } else {
      // User does NOT have enough XP: Show the popup
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
    if (!this.course) return; // Guard against null course

    console.log('User wants to view the enrolled course. Navigating to course content.');
    this.showEnrollmentSuccessModal = false;

    // Simulate navigation to the course content page
    this.router.navigate(['/course-content', this.course.id]); // Example: navigate to a course content route
  }

  closeEnrollmentModal(): void {
    console.log('Enrollment Success Modal closed. Navigating to home.');
    this.showEnrollmentSuccessModal = false;
    this.router.navigate(['/']); // Navigate to home or course list
  }
}
