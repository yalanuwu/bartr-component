// src/app/search-result-page/search-result-page.component.ts
import { Component, OnInit } from '@angular/core';
import { NavbarComponentComponent } from "../navbar-component/navbar-component.component";
import { CourseCardGeneralComponent } from "../course-card-general/course-card-general.component";
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { Courses } from '../types'; // Assuming 'Courses' is now 'Course' from xp.service
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-result-page',
  standalone: true, // Assuming this component is standalone
  imports: [NavbarComponentComponent, CourseCardGeneralComponent, NgFor, CommonModule, FooterComponent, FormsModule, NgIf],
  templateUrl: './search-result-page.component.html',
  styleUrl: './search-result-page.component.css'
})
export class SearchResultPageComponent implements OnInit {

  searchParam: string = 'web application'; // Default search param

  // --- Filter State Properties ---
  selectedCategory: string = 'All Categories';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  selectedLevel: string = 'All';

  // Define available options for dropdowns
  categories: string[] = ['All Categories']; // Categories will be populated from fetched courses
  levels: string[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // --- Data Properties ---
  allCourses: Courses[] = []; // Initialize as empty, will be populated by API call
  filteredCourses: Courses[] = [];

  constructor(
    private route: ActivatedRoute, // To read route parameters
    private router: Router,
    private searchService: SearchService // Use XpService as it contains searchCourses
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const searchParam = params.get('searchQuery');
      if (searchParam) {
        this.searchParam = searchParam; // Update searchParam
        this.searchService.searchCourses(searchParam).subscribe({
          next: (coursesData: Courses[]) => {
            this.allCourses = coursesData;
            console.log('SearchComponent: courses fetched:', coursesData);
            this.populateCategories(coursesData); // Populate categories from fetched data
            this.applyFilters(); // <--- IMPORTANT: Apply filters AFTER data is fetched
          },
          error: (err) => {
            console.error('SearchResultPageComponent: Failed to fetch courses:', err);
            this.allCourses = []; // Clear courses on error
            this.filteredCourses = []; // Clear filtered courses on error
          }
        });
      } else {
        console.log("No search query parameter found. Displaying all courses or default.");
        // Optionally, if no search query, fetch all courses or a default set
        // For now, it will just show empty if no searchParam
        this.applyFilters(); // Apply filters even if no initial searchParam, will filter empty allCourses
      }
    });
  }

  /**
   * Populates the categories array based on the fetched courses.
   * Ensures 'All Categories' is always present.
   */
  populateCategories(courses: Courses[]): void {
    const uniqueCategories = new Set<string>();
    courses.forEach(course => {
      if (course.category && course.category.name) {
        uniqueCategories.add(course.category.name);
      }
    });
    this.categories = ['All Categories', ...Array.from(uniqueCategories).sort()];
  }

  /**
   * Applies the selected filters to the courses data and updates the displayed results.
   */
  applyFilters(): void {
    let tempCourses = [...this.allCourses]; // Start with a fresh copy of all courses

    // 1. Filter by Category
    if (this.selectedCategory !== 'All Categories') {
      tempCourses = tempCourses.filter(course =>
        course.category?.name === this.selectedCategory // Use optional chaining for safety
      );
    }

    // 2. Filter by Price Range (using course.price)
    if (this.minPrice !== null && this.minPrice >= 0) {
      tempCourses = tempCourses.filter(course =>
        course.price !== undefined && course.price >= this.minPrice!
      );
    }
    if (this.maxPrice !== null && this.maxPrice >= 0) {
      tempCourses = tempCourses.filter(course =>
        course.price !== undefined && course.price <= this.maxPrice!
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
    this.minPrice = null;
    this.maxPrice = null;
    this.selectedLevel = 'All';
    this.applyFilters();
  }

  toggleFilterDropdown(filterType: string): void {
    console.log(`Toggle dropdown for ${filterType}`);
  }
}
