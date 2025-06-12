import { FormsModule } from '@angular/forms';
import { Component, NgModule } from '@angular/core';
import { NavbarComponentComponent } from "../navbar-component/navbar-component.component";
import { NgFor, NgIf } from '@angular/common';

interface Course {
  title: string;
  description: string;
  category: string;
  xpPrice: number;
  courseImages: File[];
  level: string;
  features: string[]; // Array of strings for features
  courseContent: string; // Placeholder for content, could be richer in a real app
  courseVideo: File | null;
}

@Component({
  selector: 'app-create-course-page',
  imports: [NavbarComponentComponent, NgIf, NgFor, FormsModule],
  templateUrl: './create-course-page.component.html',
  styleUrl: './create-course-page.component.css'
})
export class CreateCoursePageComponent {

  currentStep: number = 1;

  newCourse: Course = {
    title: '',
    description: '',
    category: '', // Default empty
    xpPrice: 0,
    level: '',
    courseImages: [],
    features: [''], // Start with one empty field
    courseContent: '',
    courseVideo: null
  };

  categories: string[] = [
    'Information Technology',
    'Music',
    'Language',
    'Drawing',
  ];

  level: string[] = [
    'Beginner',
    'Intermediate',
    'Advanced'
  ];

  // === NEW: trackBy function for ngFor ===
  trackByFeature(index: number, feature: string): number {
    return index; // Uniquely identifies each item by its index
  }
  
  // === Step Navigation Methods ===
  goToNextStep(): void {
    // Validate current step before moving to the next
    if (this.currentStep === 1) {
      if (!this.newCourse.title || !this.newCourse.description || !this.newCourse.category || this.newCourse.xpPrice <= 0) {
        alert('Please fill in all required fields for basic details (Title, Description, Category, XP Price).');
        return;
      }
      if (this.newCourse.courseImages.length === 0) {
        alert('Please upload at least one course image.');
        return;
      }
    }
    this.currentStep++;
  }

  goToPreviousStep(): void {
    this.currentStep--;
  }

  onVideoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.newCourse.courseVideo = input.files[0];
      console.log('Selected video:', this.newCourse.courseVideo.name);
    } else {
      this.newCourse.courseVideo = null;
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.newCourse.courseImages = []; // Clear existing images on new selection

      // Add up to 4 selected files to the array
      for (let i = 0; i < input.files.length && i < 4; i++) {
        this.newCourse.courseImages.push(input.files[i]);
      }
      console.log('Selected images:', this.newCourse.courseImages.map(f => f.name));

      // Optional: clear input value to allow selecting same files again (if needed)
      input.value = '';
    }
  }

  // Remove a specific image by its index
  removeImage(index: number): void {
    if (index > -1 && index < this.newCourse.courseImages.length) {
      this.newCourse.courseImages.splice(index, 1);
    }
  }




  // Add a new prerequisite field
  addFeatures(): void {
    this.newCourse.features.push('');
  }

  // Remove a prerequisite field
  removeFeatures(index: number): void {
    this.newCourse.features.splice(index, 1);
  }

  // Handle course submission
  onSubmit(): void {
    // Basic validation
    if (!this.newCourse.title || !this.newCourse.description || !this.newCourse.category || this.newCourse.xpPrice <= 0) {
      alert('Please fill in all required fields (Title, Description, Category, XP Price).');
      return;
    }

    console.log('New Course Data:', this.newCourse);
    alert('Course created successfully! (Simulated)');
    // In a real application, you would send this data to a backend service
    // e.g., this.courseService.createCourse(this.newCourse).subscribe(...)

    // Optionally reset form after submission
    this.newCourse = {
      title: '',
      description: '',
      category: '',
      level: '',
      xpPrice: 0,
      courseImages: [],
      features: [''],
      courseContent: '',
      courseVideo: null
    };

    this.currentStep = 1;
  }
}

