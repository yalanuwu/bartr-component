import { Component, OnInit } from '@angular/core';
import { NavbarComponentComponent } from "../navbar-component/navbar-component.component";
import { NgFor, NgIf } from '@angular/common';

interface Feature {
  text: string;
  included: boolean;
}

interface CourseLevel{
  level: 'Beginner' | 'Intermediate' | 'Advanced';

}

interface Package {
  name: 'Basic' | 'Standard' | 'Premium'; // Keep all types in interface for flexibility, or narrow to 'Basic' if preferred
  price: number;
  description: string;
  durationHours: number;
  features: Feature[];
}

@Component({
  selector: 'app-course-detail-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css'],
  imports: [NavbarComponentComponent, NgIf, NgFor]
})

export class CourseDetailPageComponent implements OnInit {

  courseTitle: string = 'Learn to build web application with react js, next js, PHP and node js';

  levelName: CourseLevel = {
    level: 'Advanced'
  }

  seller = {
    name: 'Alex J',
    avatarUrl: 'https://placehold.co/40x40/007bff/FFFFFF?text=AJ', // Placeholder avatar
    level: 'Level 2++',
    rating: 4.9,
    reviews: 54,
    responseTime: '2 Hrs'
  };

  courseImages: string[] = [
    'assets/course_detail_images/full_stack_dev_banner.jpg', // Main image from previous example
    'assets/course_detail_images/screenshot_1.jpg', // Placeholder for additional image
    'assets/course_detail_images/screenshot_2.jpg', // Placeholder for additional image
    'assets/course_detail_images/screenshot_3.jpg'  // Placeholder for additional image
  ];
  currentImageIndex: number = 0;

  // === FIXED: Only the 'Basic' package is included now ===
  packages: Package[] = [
    {
      name: 'Basic',
      price: 40,
      description: 'Enter course description here',
      durationHours: 3,
      features: [
        { text: 'Feature 1', included: true },
        { text: 'Feature 2', included: true },
        { text: 'Feature 3', included: true },
        { text: 'Feature 4', included: true },
        { text: 'Feature 5', included: true },
        { text: 'Feature 6', included: true }
      ]
    }
  ];

  selectedPackage: Package = this.packages[0]; // Still defaults to the first (and only) package //cite: {A14302EE-D70C-4D0C-BCCD-B8B6DAAF97B9}.jpg

  aboutGigContent: string = `
    Alex Jason: Web Application Development | Transforming Ideas into Scalable Web Solutions | Delivering World-Class, Modern Products | 100+ Industry-Successful Projects | Technology Innovator.
    <br>
    <br>
    Message me Before Placing an order!
    <br>
    <br>
    <strong>Who am I?</strong>
    <br>
    A Seasoned Software Engineer. I bridge the gap between your vision and technological excellence, turning your ideas into high performing web applications.
    <br>
    <br>
    Schedule a FREE 30-minute consultation to discuss your project's potential!
    <br>
    <br>
    <strong>What I offer:</strong>
    <br>
    * Startup MVP from concept to market-ready <br>
    * Enterprise-based Web applications <br>
    * Scalable Software applications <br>
    * Transform problems and ideas into Elegant Solutions <br>
  `;


  constructor() { }

  ngOnInit(): void {
  }

  // This method is no longer strictly needed if only one package is displayed,
  // as there's no UI to trigger it.
  selectPackage(pkg: Package): void {
    this.selectedPackage = pkg;
  }

  // Method to show the next image
  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.courseImages.length;
  }

  // Method to show the previous image
  prevImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.courseImages.length) % this.courseImages.length;
  }

}
