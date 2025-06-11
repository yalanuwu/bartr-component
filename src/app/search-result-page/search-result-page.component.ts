import { Component } from '@angular/core';
import { NavbarComponentComponent } from "../navbar-component/navbar-component.component";
import { CourseCardGeneralComponent } from "../course-card-general/course-card-general.component";
import { NgFor } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-search-result-page',
  imports: [NavbarComponentComponent, CourseCardGeneralComponent, NgFor, FooterComponent],
  templateUrl: './search-result-page.component.html',
  styleUrl: './search-result-page.component.css'
})
export class SearchResultPageComponent {

  searchParam : String = 'web application';

  courses = [
    {
      imageUrl: 'assets/course_images/modern_website.png',
      imageBackgroundGradient: 'from-purple-500 to-pink-500',
      authorAvatarUrl: 'assets/avatars/avatar1.png',
      authorName: 'alixdesign',
      title: 'Modern Website Creation',
      description: 'Learn to create modern web pages using popular frameworks',
      xp: 50
    },
    {
      imageUrl: 'assets/course_images/responsive_ui.png',
      imageBackgroundGradient: 'from-red-500 to-orange-500',
      authorAvatarUrl: 'assets/avatars/avatar2.png',
      authorName: 'kashiftaj',
      title: 'Create Responsive UI / UX mobile designs',
      description: 'Create responsive UI / UX mobile designs',
      xp: 50
    },
    {
      imageUrl: 'assets/course_images/app_promo.png',
      imageBackgroundGradient: 'from-blue-500 to-green-500',
      authorAvatarUrl: 'assets/avatars/avatar3.png',
      authorName: 'airb123',
      title: 'Learn to create an amazing website or app promo video',
      description: 'Learn to create an amazing website or app promo video',
      xp: 40
    },
    {
      imageUrl: 'assets/course_images/social_media.png',
      imageBackgroundGradient: 'from-yellow-500 to-orange-500',
      authorAvatarUrl: 'assets/avatars/avatar4.png',
      authorName: 'almomen980',
      title: 'Learn to design social media post, Instagram post, Facebook post ads',
      description: 'Learn to design social media post, Instagram post, Facebook post ads',
      xp: 30
    },
    {
      imageUrl: 'assets/course_images/modern_website.png',
      imageBackgroundGradient: 'from-purple-500 to-pink-500',
      authorAvatarUrl: 'assets/avatars/avatar1.png',
      authorName: 'alixdesign',
      title: 'Modern Website Creation',
      description: 'Learn to create modern web pages using popular frameworks',
      xp: 50
    },
    {
      imageUrl: 'assets/course_images/responsive_ui.png',
      imageBackgroundGradient: 'from-red-500 to-orange-500',
      authorAvatarUrl: 'assets/avatars/avatar2.png',
      authorName: 'kashiftaj',
      title: 'Create Responsive UI / UX mobile designs',
      description: 'Create responsive UI / UX mobile designs',
      xp: 50
    },
    {
      imageUrl: 'assets/course_images/app_promo.png',
      imageBackgroundGradient: 'from-blue-500 to-green-500',
      authorAvatarUrl: 'assets/avatars/avatar3.png',
      authorName: 'airb123',
      title: 'Learn to create an amazing website or app promo video',
      description: 'Learn to create an amazing website or app promo video',
      xp: 40
    },
    {
      imageUrl: 'assets/course_images/social_media.png',
      imageBackgroundGradient: 'from-yellow-500 to-orange-500',
      authorAvatarUrl: 'assets/avatars/avatar4.png',
      authorName: 'almomen980',
      title: 'Learn to design social media post, Instagram post, Facebook post ads',
      description: 'Learn to design social media post, Instagram post, Facebook post ads',
      xp: 30
    },

    // Add more course objects here as needed
  ];
}
