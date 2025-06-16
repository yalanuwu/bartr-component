import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, QueryList, ViewChildren, OnDestroy } from '@angular/core';
import { NavbarComponentComponent } from '../navbar-component/navbar-component.component';
import { CourseCardGeneralComponent } from "../course-card-general/course-card-general.component";
import { isPlatformBrowser, NgClass, NgFor } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponentComponent, CourseCardGeneralComponent, NgFor, FooterComponent, NgClass],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('categoryCardElement') categoryCardElements!: QueryList<ElementRef>;

  cardsVisible: boolean[] = [false, false, false, false, false, false, false, false];

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    // Your existing ngOnInit logic

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


    } // End of isPlatformBrowser check
  } // End of ngAfterViewInit

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }

  // Your placeholder methods and courses array
  onCreateCourse(): void { console.log('Create a Course clicked!'); }
  onLogin(): void { console.log('Log In clicked!'); }
  onSignUp(): void { console.log('Sign Up clicked!'); }
  onSearch(): void { console.log('Search clicked!'); }
  onCategoryClick(category: string): void { console.log('Category clicked:', category); }

  courses = [
    // ... your courses data ...
    { imageUrl: 'assets/course_images/modern_website.png', imageBackgroundGradient: 'from-purple-500 to-pink-500', authorAvatarUrl: 'assets/avatars/avatar1.png', authorName: 'alixdesign', title: 'Modern Website Creation', description: 'Learn to create modern web pages using popular frameworks', xp: 50 },
    { imageUrl: 'assets/course_images/responsive_ui.png', imageBackgroundGradient: 'from-red-500 to-orange-500', authorAvatarUrl: 'assets/avatars/avatar2.png', authorName: 'kashiftaj', title: 'Create Responsive UI / UX mobile designs', description: 'Create responsive UI / UX mobile designs', xp: 50 },
    { imageUrl: 'assets/course_images/app_promo.png', imageBackgroundGradient: 'from-blue-500 to-green-500', authorAvatarUrl: 'assets/avatars/avatar3.png', authorName: 'airb123', title: 'Learn to create an amazing website or app promo video', description: 'Learn to create an amazing website or app promo video', xp: 40 },
    { imageUrl: 'assets/course_images/social_media.png', imageBackgroundGradient: 'from-yellow-500 to-orange-500', authorAvatarUrl: 'assets/avatars/avatar4.png', authorName: 'almomen980', title: 'Learn to design social media post, Instagram post, Facebook post ads', description: 'Learn to design social media post, Instagram post, Facebook post ads', xp: 30 },
    { imageUrl: 'assets/course_images/modern_website.png', imageBackgroundGradient: 'from-purple-500 to-pink-500', authorAvatarUrl: 'assets/avatars/avatar1.png', authorName: 'alixdesign', title: 'Modern Website Creation', description: 'Learn to create modern web pages using popular frameworks', xp: 50 },
    { imageUrl: 'assets/course_images/responsive_ui.png', imageBackgroundGradient: 'from-red-500 to-orange-500', authorAvatarUrl: 'assets/avatars/avatar2.png', authorName: 'kashiftaj', title: 'Create Responsive UI / UX mobile designs', description: 'Create responsive UI / UX mobile designs', xp: 50 },
    { imageUrl: 'assets/course_images/app_promo.png', imageBackgroundGradient: 'from-blue-500 to-green-500', authorAvatarUrl: 'assets/avatars/avatar3.png', authorName: 'airb123', title: 'Learn to create an amazing website or app promo video', description: 'Learn to create an amazing website or app promo video', xp: 40 },
    { imageUrl: 'assets/course_images/social_media.png', imageBackgroundGradient: 'from-yellow-500 to-orange-500', authorAvatarUrl: 'assets/avatars/avatar4.png', authorName: 'almomen980', title: 'Learn to design social media post, Instagram post, Facebook post ads', description: 'Learn to design social media post, Instagram post, Facebook post ads', xp: 30 },
  ];
}
