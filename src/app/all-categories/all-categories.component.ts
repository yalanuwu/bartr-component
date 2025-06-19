import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID, QueryList, ViewChildren } from '@angular/core';
import { CategoryCardComponent } from "../category-card/category-card.component";
import { Category } from '../types';
import { CommonModule, isPlatformBrowser, NgFor } from '@angular/common';
import { NavbarComponentComponent } from "../navbar-component/navbar-component.component";

@Component({
  selector: 'app-all-categories',
  imports: [CategoryCardComponent, CommonModule, NgFor, NavbarComponentComponent],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.css'
})
export class AllCategoriesComponent implements AfterViewInit, OnDestroy {

  // Output to emit when a category card is clicked, bubbling up to the parent
  @Output() categorySelected = new EventEmitter<string>();

  // Use @ViewChildren to get references to the rendered CategoryCardComponent instances
  @ViewChildren(CategoryCardComponent) categoryCardComponents!: QueryList<CategoryCardComponent>;

  // Internal state to manage the visibility for each card (for the CSS animation)
  cardsVisible: boolean[] = [];

  private intersectionObserver: IntersectionObserver | undefined;

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngAfterViewInit(): void {
    // Initialize cardsVisible array based on the actual number of categories received
    this.cardsVisible = Array(this.categoriesData.length).fill(false);

    // Only set up IntersectionObserver if running in a browser environment
    if (isPlatformBrowser(this.platformId)) {
      if (this.categoryCardComponents && this.categoryCardComponents.length > 0) {
        this.intersectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // Find the index of the component whose native element intersected
              const index = this.categoryCardComponents.toArray().findIndex(
                (component) => component.ElementRef.nativeElement === entry.target
              );

              if (index !== -1 && entry.isIntersecting) {
                // Set the visibility flag for the corresponding card
                this.cardsVisible[index] = true;
                this.cdr.detectChanges(); // Ensures Angular updates the view
                // Optionally, stop observing once visible
                this.intersectionObserver?.unobserve(entry.target);
              }
            });
          },
          {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the card is visible
          }
        );

        // Observe the native element of each CategoryCardComponent instance
        this.categoryCardComponents.forEach((component) => {
          this.intersectionObserver?.observe(component.ElementRef.nativeElement);
        });
      }
    }
  }

  ngOnDestroy(): void {
    // Disconnect the IntersectionObserver when the component is destroyed to prevent memory leaks
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  // Handle the click event emitted by the child CategoryCardComponent
  onCategoryCardClick(categoryName: string): void {
    // Re-emit the event upwards to the parent (HomePageComponent)
    this.categorySelected.emit(categoryName);
  }

  categoriesData: Category[] = [
    { id: 0, name: 'Information Technology', imageUrl: 'assets/category_images/it.png', description: 'Information Technology icon' },
    { id: 1, name: 'Music', imageUrl: 'assets/category_images/music2.png', description: 'Music icon' },
    { id: 2, name: 'Language', imageUrl: 'assets/category_images/language2.png', description: 'Language icon' },
    { id: 3, name: 'Art', imageUrl: 'assets/category_images/art.png', description: 'Art icon' },
    { id: 4, name: 'Art', imageUrl: 'assets/category_images/art.png', description: 'Art icon' },
    { id: 5, name: 'Information Technology', imageUrl: 'assets/category_images/it.png', description: 'Information Technology icon' },
    { id: 6, name: 'Music', imageUrl: 'assets/category_images/music2.png', description: 'Music icon' },
    { id: 7, name: 'Language', imageUrl: 'assets/category_images/language2.png', description: 'Language icon' },
    // Add more category objects here if needed
  ];
}
