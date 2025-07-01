import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, QueryList, ViewChildren, OnDestroy } from '@angular/core';
import { NavbarComponentComponent } from '../navbar-component/navbar-component.component';
import { CourseCardGeneralComponent } from "../course-card-general/course-card-general.component";
import { isPlatformBrowser, NgClass, NgFor } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CategoryCardComponent } from "../category-card/category-card.component";
import { Category, Courses } from '../types';
import { Router, RouterLink } from '@angular/router';
import { CourseService } from '../services/course.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from '../toastr/toastr.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponentComponent, CourseCardGeneralComponent, NgFor, FooterComponent, NgClass, RouterLink,FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {

  // New array to manage visibility for Course Cards
  courseCardsVisible: boolean[] = [];
  searchQuery:string='';
  // @ViewChildren to get references to all CourseCardGeneralComponent instances
  @ViewChildren(CourseCardGeneralComponent) courseCardComponents!: QueryList<CourseCardGeneralComponent>;

  private courseObserver: IntersectionObserver | undefined; // Observer for course cards

  @ViewChildren('categoryCardElement') categoryCardElements!: QueryList<ElementRef>;

  cardsVisible: boolean[] = [false, false, false, false, false, false, false, false];

  constructor(
    private cdr: ChangeDetectorRef,
    private courseService:CourseService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {
    // Your existing ngOnInit logic
    this.courseService.getAllCourses().subscribe({
      next: (coursesData: Courses[]) => {
        this.allCourses = coursesData;
        console.log('ProfilePersonalPageComponent: Created courses fetched:', this.allCourses);
      },
      error: (err) => {
        console.error('ProfilePersonalPageComponent: Failed to fetch enrolled courses:', err);
        this.allCourses = []; // Set to empty array on error or null
      }
    })
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {

      // --- Preserve your existing IntersectionObserver logic for category cards ---
      if (this.categoryCardElements && this.categoryCardElements.length > 0) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const index = Array.from(this.categoryCardElements.toArray()).findIndex(
                (elementRef) => elementRef.nativeElement === entry.target
              );

              if (index !== -1 && entry.isIntersecting) {
                this.cardsVisible[index] = true;
                this.cdr.detectChanges();
                observer.unobserve(entry.target);
              }
            });
          },
          {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
          }
        );

        this.categoryCardElements.forEach((elementRef) => {
          observer.observe(elementRef.nativeElement);
        });
      }

      // --- NEW: Main Section Pinning Effect (like Poppins.agency's initial scroll) ---
      const mainSection = document.getElementById('main-pinned-section');


      // --- Optional: Existing Parallax for Background Image (inside pinned main) ---
      // This will animate the background *relative to the pinned main section*.
      // It uses the same ScrollTrigger as the main section itself.
      gsap.to(".absolute.inset-0 img", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: mainSection, // Trigger on the pinned section itself
          start: "top top",     // When the pin starts
          end: () => `+=${window.innerHeight}`, // Ends when mainSection unpins
          scrub: true,
        }
      });

      // --- Optional: Existing Parallax for Main Heading Text (inside pinned main) ---
      // This will animate the heading *relative to the pinned main section*.
      gsap.fromTo(".max-w-4xl h1",
        { y: 0, opacity: 1 },
        {
          y: -100,
          opacity: 0.5,
          ease: "power1.out",
          scrollTrigger: {
            trigger: mainSection, // Trigger relative to the pinned section
            start: "top top",
            end: () => `+=${window.innerHeight}`, // Ends when mainSection unpins
            scrub: true,
          }
        }
      );

      // if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      //   gsap.timeline({
      //     scrollTrigger: {
      //       trigger: "#card2", // Trigger on Card 2.
      //       start: "top bottom", // When Card 2's top hits the bottom of the viewport.
      //       end: "bottom bottom", // When Card 2's top reaches the top of the viewport.
      //       scrub: true, // Smooth scroll-based animation.
      //       markers: true,
      //       pin: '#card1'
      //     }
      //   }).fromTo(
      //     "#card2", // Animate Card 2.
      //     { y: "100%" }, // Starting position: completely below the viewport.
      //     { y: "0%", ease: "none" } // Ending position: fully sliding into place.
      //   );
      // }

      // --- NEW: IntersectionObserver for Course Cards ---
      const coursesSection = document.getElementById('top-courses-section'); // Get the section containing courses

      if (coursesSection && this.courseCardComponents && this.courseCardComponents.length > 0) {
        this.courseObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // If the section is visible, start the staggered animation for its cards
                this.courseCardComponents.forEach((component, index) => {
                  setTimeout(() => {
                    this.courseCardsVisible[index] = true;
                    this.cdr.detectChanges(); // Update the view for each card
                  }, index * 120); // Stagger delay (e.g., 120ms per card)
                });
                this.courseObserver?.unobserve(entry.target); // Unobserve once animation is triggered
              }
            });
          },
          {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the section is visible
          }
        );
        this.courseObserver.observe(coursesSection); // Observe the courses section
      }

    } // End of isPlatformBrowser check
  } // End of ngAfterViewInit

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (this.courseObserver) {
        this.courseObserver.disconnect(); // Disconnect the new observer
      }
    }
  }

  // Your placeholder methods and courses array
  onCreateCourse(): void { console.log('Create a Course clicked!'); }
  onLogin(): void { console.log('Log In clicked!'); }
  onSignUp(): void { console.log('Sign Up clicked!'); }
  onSearch(): void { console.log('Search clicked!'); }
  onCategoryClick(category: string): void { console.log('Category clicked:', category); }
  allCategories(): void { console.log("Explore Clicked"); }
  search():void
  {
    if(this.searchQuery==='')
    {
      this.toastr.showError('Please fill something to search');
      return;
    }
    this.router.navigate(['/search-result', this.searchQuery]);
  }
  searchForIT():void
  {
    this.router.navigate(['/search-result','Information Technology']);
  }
  searchForMusic():void
  {
    this.router.navigate(['/search-result','Music']);
  }
  searchForLanguage():void
  {
    this.router.navigate(['/search-result','Language']);
  }
  searchForArt():void
  {
    this.router.navigate(['/search-result','Art']);
  }

  allCourses: Courses[] = [
      {
        id: 1,
        title: 'Modern Website Creation',
        description: 'Learn to create modern web pages using popular frameworks',
        level: 'Beginner',
        features: ['Responsive Design', 'HTML5', 'CSS3', 'JavaScript Basics'],
        courseOutLine: 'Detailed course outline for modern web development.',
        price: 19.99, // Example price
        imageUrl: 'assets/course_images/modern_website.png',
        videoUrl: 'https://www.example.com/modern_website_video.mp4',
        enrolledUser: 120,
        category: { id: 1, name: 'Web Development', imageUrl: 'path/to/web_icon.png', description: 'Courses on web development.' },
        creator: { id: 101, username: 'alixdesign', email: 'alix@example.com', phone: '123-456-7890', fullname: 'Alix Design', xp: 50, skills: '' },
        createdAt: '2023-01-15T10:00:00Z',
      },
      {
        id: 2,
        title: 'Create Responsive UI / UX mobile designs',
        description: 'Create responsive UI / UX mobile designs',
        level: 'Intermediate',
        features: ['Figma', 'Sketch', 'User Research', 'Prototyping'],
        courseOutLine: 'Comprehensive guide to responsive UI/UX.',
        price: 29.99, // Example price
        imageUrl: 'assets/course_images/responsive_ui.png',
        videoUrl: 'https://www.example.com/responsive_ui_video.mp4',
        enrolledUser: 90,
        category: { id: 2, name: 'UI/UX Design', imageUrl: 'path/to/uiux_icon.png', description: 'Courses on user interface and experience design.' },
        creator: { id: 102, username: 'kashiftaj', email: 'kashif@example.com', phone: '987-654-3210', fullname: 'Kashif Taj', xp: 75, skills: '' },
        createdAt: '2023-02-20T11:30:00Z',
      },
      {
        id: 3,
        title: 'Learn to create an amazing website or app promo video',
        description: 'Learn to create an amazing website or app promo video',
        level: 'Beginner',
        features: ['Adobe Premiere', 'Video Editing', 'Motion Graphics'],
        courseOutLine: 'Learn video production for app promotion.',
        price: 24.99, // Example price
        imageUrl: 'assets/course_images/app_promo.png',
        videoUrl: 'https://www.example.com/app_promo_video.mp4',
        enrolledUser: 70,
        category: { id: 3, name: 'Video Production', imageUrl: 'path/to/video_icon.png', description: 'Courses on video creation.' },
        creator: { id: 103, username: 'airb123', email: 'airb@example.com', phone: '555-123-4567', fullname: 'Air B', xp: 40, skills: '' },
        createdAt: '2023-03-10T09:15:00Z',
      },
      {
        id: 4,
        title: 'Learn to design social media post, Instagram post, Facebook post ads',
        description: 'Learn to design social media post, Instagram post, Facebook post ads',
        level: 'Advanced',
        features: ['Photoshop', 'Illustrator', 'Social Media Marketing'],
        courseOutLine: 'Master social media graphic design.',
        price: 34.99, // Example price
        imageUrl: 'assets/course_images/social_media.png',
        videoUrl: 'https://www.example.com/social_media_video.mp4',
        enrolledUser: 150,
        category: { id: 4, name: 'Marketing', imageUrl: 'path/to/marketing_icon.png', description: 'Courses on digital marketing.' },
        creator: { id: 104, username: 'almomen980', email: 'almo@example.com', phone: '111-222-3333', fullname: 'Al Momen', xp: 100, skills: '' },
        createdAt: '2023-04-01T14:00:00Z',
      },
      {
        id: 5,
        title: 'Backend Development with Node.js',
        description: 'Build robust backend systems using Node.js and Express',
        level: 'Advanced',
        features: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
        courseOutLine: 'Advanced backend development concepts.',
        price: 49.99, // Example price
        imageUrl: 'assets/course_images/backend_node.png',
        videoUrl: 'https://www.example.com/backend_node_video.mp4',
        enrolledUser: 80,
        category: { id: 1, name: 'Web Development', imageUrl: 'path/to/web_icon.png', description: 'Courses on web development.' },
        creator: { id: 101, username: 'alixdesign', email: 'alix@example.com', phone: '123-456-7890', fullname: 'Alix Design', xp: 150, skills: '' },
        createdAt: '2023-05-05T16:00:00Z',
      },
      {
        id: 6,
        title: 'Mobile App Design with Sketch',
        description: 'Design intuitive and beautiful mobile applications',
        level: 'Intermediate',
        features: ['Sketch', 'UI Grids', 'Design Systems', 'User Flows'],
        courseOutLine: 'Master mobile app design with Sketch.',
        price: 39.99, // Example price
        imageUrl: 'assets/course_images/mobile_sketch.png',
        videoUrl: 'https://www.example.com/mobile_sketch_video.mp4',
        enrolledUser: 60,
        category: { id: 2, name: 'UI/UX Design', imageUrl: 'path/to/uiux_icon.png', description: 'Courses on user interface and experience design.' },
        creator: { id: 102, username: 'kashiftaj', email: 'kashif@example.com', phone: '987-654-3210', fullname: 'Kashif Taj', xp: 120, skills: '' },
        createdAt: '2023-06-10T10:00:00Z',
      },
    ];
}
