// src/app/search-result-page/search-result-page.component.ts
import { Component, OnInit } from '@angular/core';
import { NavbarComponentComponent } from "../navbar-component/navbar-component.component";
import { CourseCardGeneralComponent } from "../course-card-general/course-card-general.component";
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { Courses } from '../types';



@Component({
  selector: 'app-search-result-page',
  imports: [NavbarComponentComponent, CourseCardGeneralComponent, NgFor, CommonModule, FooterComponent, FormsModule, NgIf],
  templateUrl: './search-result-page.component.html',
  styleUrl: './search-result-page.component.css'
})
export class SearchResultPageComponent implements OnInit {

  searchParam: string = 'web application';

  // --- Filter State Properties ---
  selectedCategory: string = 'All Categories';
  minPrice: number | null = null; // Changed from minXp to minPrice
  maxPrice: number | null = null; // Changed from maxXp to maxPrice
  selectedLevel: string = 'All';

  // Define available options for dropdowns
  categories: string[] = ['All Categories', 'Web Development', 'UI/UX Design', 'Marketing', 'Video Production'];
  levels: string[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // --- Data Properties ---
  allCourses: Courses[] = [
    {
      id: 1,
      title: 'Modern Website Creation',
      description: 'Learn to create modern web pages using popular frameworks',
      level: 'Beginner',
      features: ['Responsive Design', 'HTML5', 'CSS3', 'JavaScript Basics'],
      courseOutline: 'Detailed course outline for modern web development.',
      price: 19.99, // Example price
      photoUrl: 'assets/course_images/modern_website.png',
      videoUrl: 'https://www.example.com/modern_website_video.mp4',
      enrolledUser: 120,
      category: { id: 1, name: 'Web Development', imageUrl: 'path/to/web_icon.png', description: 'Courses on web development.' },
      creator: { id: 101, username: 'alixdesign', email: 'alix@example.com', phone: '123-456-7890', fullname: 'Alix Design', xp: 50 },
      createdAt: '2023-01-15T10:00:00Z',
    },
    {
      id: 2,
      title: 'Create Responsive UI / UX mobile designs',
      description: 'Create responsive UI / UX mobile designs',
      level: 'Intermediate',
      features: ['Figma', 'Sketch', 'User Research', 'Prototyping'],
      courseOutline: 'Comprehensive guide to responsive UI/UX.',
      price: 29.99, // Example price
      photoUrl: 'assets/course_images/responsive_ui.png',
      videoUrl: 'https://www.example.com/responsive_ui_video.mp4',
      enrolledUser: 90,
      category: { id: 2, name: 'UI/UX Design', imageUrl: 'path/to/uiux_icon.png', description: 'Courses on user interface and experience design.' },
      creator: { id: 102, username: 'kashiftaj', email: 'kashif@example.com', phone: '987-654-3210', fullname: 'Kashif Taj', xp: 75 },
      createdAt: '2023-02-20T11:30:00Z',
    },
    {
      id: 3,
      title: 'Learn to create an amazing website or app promo video',
      description: 'Learn to create an amazing website or app promo video',
      level: 'Beginner',
      features: ['Adobe Premiere', 'Video Editing', 'Motion Graphics'],
      courseOutline: 'Learn video production for app promotion.',
      price: 24.99, // Example price
      photoUrl: 'assets/course_images/app_promo.png',
      videoUrl: 'https://www.example.com/app_promo_video.mp4',
      enrolledUser: 70,
      category: { id: 3, name: 'Video Production', imageUrl: 'path/to/video_icon.png', description: 'Courses on video creation.' },
      creator: { id: 103, username: 'airb123', email: 'airb@example.com', phone: '555-123-4567', fullname: 'Air B', xp: 40 },
      createdAt: '2023-03-10T09:15:00Z',
    },
    {
      id: 4,
      title: 'Learn to design social media post, Instagram post, Facebook post ads',
      description: 'Learn to design social media post, Instagram post, Facebook post ads',
      level: 'Advanced',
      features: ['Photoshop', 'Illustrator', 'Social Media Marketing'],
      courseOutline: 'Master social media graphic design.',
      price: 34.99, // Example price
      photoUrl: 'assets/course_images/social_media.png',
      videoUrl: 'https://www.example.com/social_media_video.mp4',
      enrolledUser: 150,
      category: { id: 4, name: 'Marketing', imageUrl: 'path/to/marketing_icon.png', description: 'Courses on digital marketing.' },
      creator: { id: 104, username: 'almomen980', email: 'almo@example.com', phone: '111-222-3333', fullname: 'Al Momen', xp: 100 },
      createdAt: '2023-04-01T14:00:00Z',
    },
    {
      id: 5,
      title: 'Backend Development with Node.js',
      description: 'Build robust backend systems using Node.js and Express',
      level: 'Advanced',
      features: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
      courseOutline: 'Advanced backend development concepts.',
      price: 49.99, // Example price
      photoUrl: 'assets/course_images/backend_node.png',
      videoUrl: 'https://www.example.com/backend_node_video.mp4',
      enrolledUser: 80,
      category: { id: 1, name: 'Web Development', imageUrl: 'path/to/web_icon.png', description: 'Courses on web development.' },
      creator: { id: 101, username: 'alixdesign', email: 'alix@example.com', phone: '123-456-7890', fullname: 'Alix Design', xp: 150 },
      createdAt: '2023-05-05T16:00:00Z',
    },
    {
      id: 6,
      title: 'Mobile App Design with Sketch',
      description: 'Design intuitive and beautiful mobile applications',
      level: 'Intermediate',
      features: ['Sketch', 'UI Grids', 'Design Systems', 'User Flows'],
      courseOutline: 'Master mobile app design with Sketch.',
      price: 39.99, // Example price
      photoUrl: 'assets/course_images/mobile_sketch.png',
      videoUrl: 'https://www.example.com/mobile_sketch_video.mp4',
      enrolledUser: 60,
      category: { id: 2, name: 'UI/UX Design', imageUrl: 'path/to/uiux_icon.png', description: 'Courses on user interface and experience design.' },
      creator: { id: 102, username: 'kashiftaj', email: 'kashif@example.com', phone: '987-654-3210', fullname: 'Kashif Taj', xp: 120 },
      createdAt: '2023-06-10T10:00:00Z',
    },
  ];

  filteredCourses: Courses[] = [];

  ngOnInit(): void {
    this.applyFilters();
  }

  /**
   * Applies the selected filters to the courses data and updates the displayed results.
   */
  applyFilters(): void {
    let tempCourses = [...this.allCourses]; // Start with a fresh copy of all courses

    // 1. Filter by Category
    if (this.selectedCategory !== 'All Categories') {
      tempCourses = tempCourses.filter(course =>
        course.category.name === this.selectedCategory
      );
    }

    // 2. Filter by Price Range (using course.price)
    if (this.minPrice !== null && this.minPrice >= 0) {
      tempCourses = tempCourses.filter(course =>
        course.price >= this.minPrice!
      );
    }
    if (this.maxPrice !== null && this.maxPrice >= 0) {
      tempCourses = tempCourses.filter(course =>
        course.price <= this.maxPrice!
      );
    }

    // 3. Filter by Level (string comparison)
    if (this.selectedLevel !== 'All') {
      tempCourses = tempCourses.filter(course =>
        course.level === this.selectedLevel
      );
    }

    this.filteredCourses = tempCourses;
    console.log('Applied filters. Displaying', this.filteredCourses.length, 'courses.');
  }

  // Function to clear all filters
  clearFilters(): void {
    this.selectedCategory = 'All Categories';
    this.minPrice = null; // Corrected to minPrice
    this.maxPrice = null; // Corrected to maxPrice
    this.selectedLevel = 'All';
    this.applyFilters();
  }

  toggleFilterDropdown(filterType: string): void {
    console.log(`Toggle dropdown for ${filterType}`);
  }
}
