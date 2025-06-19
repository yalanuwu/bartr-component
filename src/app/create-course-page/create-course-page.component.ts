import { FormsModule } from '@angular/forms';
import { Component, NgModule } from '@angular/core'; // NgModule is usually in app.module.ts, remove if standalone
import { NavbarComponentComponent } from "../navbar-component/navbar-component.component";
import { NgFor, NgIf } from '@angular/common'; // Already imported by standalone
import { Router } from '@angular/router';
import { GenericSuccessModalComponent } from "../generic-success-modal/generic-success-modal.component";

interface Course {
  title: string;
  description: string;
  category: string;
  // xpPrice: number; // Keeping commented out as per your code
  courseImages: File[];
  level: string;
  features: string[]; // Array of strings for features
  courseContent: string; // Placeholder for content, could be richer in a real app
  courseVideo: File | null;
}

@Component({
  selector: 'app-create-course-page',
  // If this is a standalone component, you don't need @NgModule decorator here.
  // The 'imports' array within @Component is for standalone components.
  // If it's part of a module, the 'imports' here should be in the module's @NgModule.
  // Assuming it's standalone based on recent Angular conventions.
  standalone: true, // Add this if it's not already defined elsewhere (e.g., in module file if not standalone)
  imports: [NavbarComponentComponent, NgIf, NgFor, FormsModule, GenericSuccessModalComponent],
  templateUrl: './create-course-page.component.html',
  styleUrl: './create-course-page.component.css'
})
export class CreateCoursePageComponent {

  currentStep: number = 1;

  newCourse: Course = {
    title: '',
    description: '',
    category: '', // Default empty
    // xpPrice: 0, // Keeping commented out as per your code
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

  // <--- NEW: Property to control success modal visibility
  showCourseCreationSuccessModal: boolean = false;
  createdCourseTitle: string = '';
   // To pass to the modal

  constructor(private router: Router) {}




  // === NEW: trackBy function for ngFor ===
  trackByFeature(index: number, feature: string): number {
    return index; // Uniquely identifies each item by its index
  }

  // === Step Navigation Methods ===
  goToNextStep(): void {
    // Validate current step before moving to the next
    if (this.currentStep === 1) {
      // Adjusted validation based on your provided interface and common sense for required fields
      if (!this.newCourse.title || !this.newCourse.description || !this.newCourse.category || !this.newCourse.level || !this.newCourse.courseContent) {
        alert('Please fill in all required fields for Basic Details (Title, Description, Category, Level, Course Content Outline).');
        return;
      }
      if (this.newCourse.features.some(f => !f || f.trim() === '')) {
         alert('Please ensure all course features are filled or remove empty ones.');
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
      const file = input.files[0];
      if (file.type.startsWith('video/')) {
        this.newCourse.courseVideo = file;
        console.log('Selected video:', this.newCourse.courseVideo.name);
      } else {
        alert('Only video files are allowed.');
        this.newCourse.courseVideo = null;
        input.value = ''; // Clear the input if not a video
      }
    } else {
      this.newCourse.courseVideo = null;
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.newCourse.courseImages = []; // Clear existing images on new selection
      // Add up to 4 selected files to the array
      for (let i = 0; i < input.files.length && i < 4; i++) {
        const file = input.files[i];
        if (file.type.startsWith('image/')) {
            this.newCourse.courseImages.push(file); // Store File object
        } else {
            alert(`File "${file.name}" is not an image and will be skipped.`);
        }
      }
      console.log('Selected images:', this.newCourse.courseImages.map(f => f.name));
      // No need to clear input.value if you want to display selected file names and manage them.
      // If you want to force re-selection: input.value = '';
    }
  }

  // Remove a specific image by its index
  removeImage(index: number): void {
    if (index > -1 && index < this.newCourse.courseImages.length) {
      this.newCourse.courseImages.splice(index, 1);
    }
  }

  // Add a new feature field
  addFeatures(): void {
    if (this.newCourse.features.length < 6) { // Limit to 6 features as an example
      this.newCourse.features.push('');
    } else {
        alert('You can add a maximum of 6 features.');
    }
  }

  // Remove a feature field
  removeFeatures(index: number): void {
    if (this.newCourse.features.length > 1) { // Ensure at least one feature input remains
      this.newCourse.features.splice(index, 1);
    }
  }

  // Handle course submission
  onSubmit(): void {

    if (!this.newCourse.title || this.newCourse.title.trim() === '') {
      alert('Course title cannot be empty.');
      this.currentStep = 1; // Go back to step 1
      return;
    }

    // Final validation for Step 2
    if (this.currentStep === 2) {
      if (!this.newCourse.courseVideo) {
        alert('Please upload the main course video.');
        return;
      }
    }

    console.log('New Course Data:', this.newCourse);

    // Simulate API call for course creation
    // In a real application, you would send this.newCourse to your backend service
    // e.g., this.courseService.createCourse(this.newCourse).subscribe(...)

    alert('Course created successfully! (Simulated)'); // This alert will now be replaced by the modal.

    // --- MODIFIED SECTION ---
    // Capture the title for the modal message before resetting
    this.createdCourseTitle = this.newCourse.title;

    // Show the success modal
    this.showCourseCreationSuccessModal = true;

    // DO NOT reset form here. Reset happens when modal is closed.
    // this.newCourse = { ... };
    // this.currentStep = 1;
  }

  // <--- NEW / MODIFIED: Handlers for Course Creation Success Modal ---
  onCourseCreationModalClose(): void {
    console.log('Course creation success modal closed.');
    this.showCourseCreationSuccessModal = false; // Close the modal
    this.resetForm(); // Reset form when modal is explicitly closed
    // Optionally navigate or refresh data here if not handled by primary action
  }

  onViewCreatedCourse(): void {
    console.log('Primary action from Course Creation Success Modal: Navigating to My Courses.');
    this.showCourseCreationSuccessModal = false; // Close the modal
    this.resetForm(); // Reset form when modal primary action is taken
    // Example navigation to the user's "My Courses" section
    this.router.navigate(['/profile'], { queryParams: { tab: 'My Courses' } });
  }

  // New utility method to reset the form state
  resetForm(): void {
    this.newCourse = {
      title: '',
      description: '',
      category: '',
      // xpPrice: 0,
      level: '',
      courseImages: [],
      features: [''], // Reset with one empty feature
      courseContent: '',
      courseVideo: null
    };
    this.currentStep = 1; // Reset to the first step
    this.createdCourseTitle = ''; // Clear the captured title
  }
}
