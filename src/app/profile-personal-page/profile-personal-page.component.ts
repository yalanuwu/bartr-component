import { Component, OnInit } from '@angular/core';
import { NavbarComponentComponent } from '../navbar-component/navbar-component.component';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';

export interface Course {
  id: string;
  title: string;
  instructor: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-profile-personal-page',
  imports: [NavbarComponentComponent, PersonalInformationComponent],
  templateUrl: './profile-personal-page.component.html',
  styleUrl: './profile-personal-page.component.css'
})
export class ProfilePersonalPageComponent implements OnInit{
  userName: string = 'Username';
  userEmail: string = 'profilename123@gmail.com';
  profileName: string = 'Profile Name';
  contactNumber: string = '123456789';
  xp: number = 300;
  countryRegion: string = 'Chennai, India';

  activeSection: 'Personal Information' | 'Courses Enrolled' | 'Courses Created' | 'Profile Settings' = 'Personal Information';

  courses: Course[] = [
    {
      id: 'course-1',
      title: 'Modern Website Creation',
      instructor: 'alivdesign',
      description: 'Learn to create modern web pages using popular frameworks',
      imageUrl: 'https://placehold.co/400x250/A0A0A0/FFFFFF?text=Web+Dev' // Placeholder image
    },
    {
      id: 'course-2',
      title: 'User Interface & User Experience Designing',
      instructor: 'kaashifhaj',
      description: 'Create Responsive UI / UX mobile designs',
      imageUrl: 'https://placehold.co/400x250/808080/FFFFFF?text=UI/UX' // Placeholder image
    },
    {
      id: 'course-3',
      title: 'Amazing Website or App Promo Video',
      instructor: 'airb123',
      description: 'Learn to create an amazing website or app promo video',
      imageUrl: 'https://placehold.co/400x250/606060/FFFFFF?text=Video+Promo' // Placeholder image
    },
    {
      id: 'course-4',
      title: 'Advanced Data Structures',
      instructor: 'prof.smith',
      description: 'Deep dive into complex data structures and algorithms',
      imageUrl: 'https://placehold.co/400x250/404040/FFFFFF?text=Data+Structures' // Placeholder image
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // You can fetch this data from a service here if needed
    this.activeSection = 'Personal Information';
  }

  selectSection(section: 'Personal Information' | 'Courses Enrolled' | 'Courses Created' | 'Profile Settings'): void {
    this.activeSection = section;
    console.log(`Navigating to: ${this.activeSection}`);
  }

  signOut(): void {
    console.log('User signed out!');
    // Implement your sign-out logic here (e.g., clear session, redirect to login)
    // Example: this.router.navigate(['/login']);
  }
}
