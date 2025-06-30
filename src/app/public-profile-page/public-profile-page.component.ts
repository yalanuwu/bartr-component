import { Component, OnInit } from '@angular/core';
import { CourseCardGeneralComponent } from "../course-card-general/course-card-general.component";
import { NavbarComponentComponent } from "../navbar-component/navbar-component.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { Courses } from '../types';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../types';
import { CourseService } from '../services/course.service';
import { generateAvatarUrl } from '../util';


@Component({
  selector: 'app-public-profile-page',
  imports: [CourseCardGeneralComponent, NavbarComponentComponent, NgIf, NgFor, FooterComponent, NgClass],
  templateUrl: './public-profile-page.component.html',
  styleUrl: './public-profile-page.component.css'
})

export class PublicProfilePageComponent implements OnInit {

  // New property to hold the randomly selected gradient class
  randomBannerGradient!: string;
  user: User | null = null;
  private username: string | null = null; // To store the username from the route
  coursesCreated:Courses[]=[];
  userAvatarUrl: any;
  constructor(private router: Router,
    private route: ActivatedRoute, // NEW: Inject ActivatedRoute
    private userService : UserService,
    private courseService:CourseService ) {}


    ngOnInit(): void {
      this.randomBannerGradient = this.getRandomGradient();
      this.route.paramMap.subscribe(params => {
        const username = params.get('username');
        if (username) {
          this.username = username; // Convert string ID to number
          this.userAvatarUrl = generateAvatarUrl(username);
          this.userService.getByUserName(username).subscribe({
            next: (userData: User) => {
              this.user = userData;
              if (this.user.id) { // Ensure user.id exists
                this.courseService.getCoursesByCreator(this.user.id).subscribe({
                  next: (coursesData: Courses[]) => {
                    this.coursesCreated = coursesData;
                    console.log('ProfilePublicPageComponent: Created courses fetched:', this.coursesCreated);
                  },
                  error: (err) => {
                    console.error('ProfilePublicPageComponent: Failed to fetch enrolled courses:', err);
                    this.coursesCreated = []; // Set to empty array on error or null
                  }
                });
              }
            },
            error: (err) => {
              console.error('unable to fetch user', err);
            }
          });
        } else {
          console.error('Username not found in URL. Redirecting to home or course list.');
          this.router.navigate(['/']); // Redirect if no ID is found
        }
      });
      


      
    }
  
    private getRandomGradient(): string {
      const randomIndex = Math.floor(Math.random() * this.gradientOptions.length);
      return this.gradientOptions[randomIndex];
    }


  // Array of predefined Tailwind gradient classes
  gradientOptions: string[] = [
    'from-green-600 to-blue-600',
    'from-blue-500 via-purple-500 to-pink-500',
    'from-red-600 to-yellow-600',
    'from-teal-600 to-emerald-600',
    'from-indigo-600 to-purple-600',
    'from-orange-600 to-red-600',
    // 'from-slate-200 via-teal-100 to-gray-400',
    // 'from-sky-600 to-blue-600'
  ];

  // Dummy data for the public profile
  // user = {
  //   name: 'Alex Jason',
  //   handle: '@alexjasondev',
  //   email: 'AlexJason@gmail.com',
  //   phone: '+91 9876543210',
  //   tagline: 'Full Stack Software Developer | Transforming Ideas into Scalable Web Solutions',
  //   avatarUrl: 'https://placehold.co/100x100/34D399/FFFFFF?text=AJ', // Placeholder avatar
  //   location: 'Bengaluru, India',
  //   memberSince: 'January 2022',
  //   description: `A Seasoned Software Engineer. I bridge the gap between your vision and technological excellence, turning your ideas into high performing web applications. I specialize in React, Next.js, Node.js, and various database technologies. I'm passionate about building robust and scalable web solutions.`,
  //   skills: [
  //     'Web Development', 'React.js', 'Next.js', 'Node.js', 'PHP', 'MongoDB',
  //     'PostgreSQL', 'UI/UX Design', 'API Development', 'Cloud Deployment'
  //   ],
  //   // skills: [],
  //   socialLinks: {
  //     twitter: '#',
  //     linkedin: '#',
  //     github: '#'
  //   },
  //   responseTime: '2 Hrs',
  //   lastSeen: '1 hour ago'
  // };

  // Dummy courses created by this user
  // coursesCreated: PublicProfileCourse[] = []
  // coursesCreated: PublicProfileCourse[] = [
  //   {
  //     id: 'c1',
  //     imageUrl: 'assets/search_results/laravel_web_app.png', // Placeholder
  //     title: 'Mastering Laravel Web Development',
  //     description: 'Learn to develop robust and scalable web applications using the Laravel framework from scratch.',
  //     authorName: this.user.name,
  //     authorAvatarUrl: this.user.avatarUrl,
  //     xp: 750, // Example XP value
  //     imageBackgroundGradient: 'from-purple-400 to-indigo-500' // Example gradient
  //   },
  //   {
  //     id: 'c2',
  //     imageUrl: 'assets/search_results/web_applications.png', // Placeholder
  //     title: 'React & Node.js: Build a Full Stack App',
  //     description: 'Dive deep into building modern web applications with React on the frontend and Node.js on the backend.',
  //     authorName: this.user.name,
  //     authorAvatarUrl: this.user.avatarUrl,
  //     xp: 900,
  //     imageBackgroundGradient: 'from-blue-400 to-cyan-500'
  //   },
  //   {
  //     id: 'c3',
  //     imageUrl: 'assets/search_results/full_stack_dev.png', // Placeholder
  //     title: 'MERN Stack Zero to Hero',
  //     description: 'Become a full-stack MERN developer by building multiple projects using MongoDB, Express, React, and Node.js.',
  //     authorName: this.user.name,
  //     authorAvatarUrl: this.user.avatarUrl,
  //     xp: 1200,
  //     imageBackgroundGradient: 'from-pink-400 to-red-500'
  //   }
  //   // Add more courses as needed, ensuring they match PublicProfileCourse interface
  // ];

  // allCourses: Courses[] = [
  //     {
  //       id: 1,
  //       title: 'Modern Website Creation',
  //       description: 'Learn to create modern web pages using popular frameworks',
  //       level: 'Beginner',
  //       features: ['Responsive Design', 'HTML5', 'CSS3', 'JavaScript Basics'],
  //       courseOutLine: 'Detailed course outline for modern web development.',
  //       price: 19.99, // Example price
  //       imageUrl: 'assets/course_images/modern_website.png',
  //       videoUrl: 'https://www.example.com/modern_website_video.mp4',
  //       enrolledUser: 120,
  //       category: { id: 1, name: 'Web Development', imageUrl: 'path/to/web_icon.png', description: 'Courses on web development.' },
  //       creator: { id: 101, username: 'alixdesign', email: 'alix@example.com', phone: '123-456-7890', fullname: 'Alix Design', xp: 50 },
  //       createdAt: '2023-01-15T10:00:00Z',
  //     },
  //     {
  //       id: 2,
  //       title: 'Create Responsive UI / UX mobile designs',
  //       description: 'Create responsive UI / UX mobile designs',
  //       level: 'Intermediate',
  //       features: ['Figma', 'Sketch', 'User Research', 'Prototyping'],
  //       courseOutLine: 'Comprehensive guide to responsive UI/UX.',
  //       price: 29.99, // Example price
  //       imageUrl: 'assets/course_images/responsive_ui.png',
  //       videoUrl: 'https://www.example.com/responsive_ui_video.mp4',
  //       enrolledUser: 90,
  //       category: { id: 2, name: 'UI/UX Design', imageUrl: 'path/to/uiux_icon.png', description: 'Courses on user interface and experience design.' },
  //       creator: { id: 102, username: 'kashiftaj', email: 'kashif@example.com', phone: '987-654-3210', fullname: 'Kashif Taj', xp: 75 },
  //       createdAt: '2023-02-20T11:30:00Z',
  //     },
  //     {
  //       id: 3,
  //       title: 'Learn to create an amazing website or app promo video',
  //       description: 'Learn to create an amazing website or app promo video',
  //       level: 'Beginner',
  //       features: ['Adobe Premiere', 'Video Editing', 'Motion Graphics'],
  //       courseOutLine: 'Learn video production for app promotion.',
  //       price: 24.99, // Example price
  //       imageUrl: 'assets/course_images/app_promo.png',
  //       videoUrl: 'https://www.example.com/app_promo_video.mp4',
  //       enrolledUser: 70,
  //       category: { id: 3, name: 'Video Production', imageUrl: 'path/to/video_icon.png', description: 'Courses on video creation.' },
  //       creator: { id: 103, username: 'airb123', email: 'airb@example.com', phone: '555-123-4567', fullname: 'Air B', xp: 40 },
  //       createdAt: '2023-03-10T09:15:00Z',
  //     },
  //     {
  //       id: 4,
  //       title: 'Learn to design social media post, Instagram post, Facebook post ads',
  //       description: 'Learn to design social media post, Instagram post, Facebook post ads',
  //       level: 'Advanced',
  //       features: ['Photoshop', 'Illustrator', 'Social Media Marketing'],
  //       courseOutLine: 'Master social media graphic design.',
  //       price: 34.99, // Example price
  //       imageUrl: 'assets/course_images/social_media.png',
  //       videoUrl: 'https://www.example.com/social_media_video.mp4',
  //       enrolledUser: 150,
  //       category: { id: 4, name: 'Marketing', imageUrl: 'path/to/marketing_icon.png', description: 'Courses on digital marketing.' },
  //       creator: { id: 104, username: 'almomen980', email: 'almo@example.com', phone: '111-222-3333', fullname: 'Al Momen', xp: 100 },
  //       createdAt: '2023-04-01T14:00:00Z',
  //     },
  //     {
  //       id: 5,
  //       title: 'Backend Development with Node.js',
  //       description: 'Build robust backend systems using Node.js and Express',
  //       level: 'Advanced',
  //       features: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
  //       courseOutLine: 'Advanced backend development concepts.',
  //       price: 49.99, // Example price
  //       imageUrl: 'assets/course_images/backend_node.png',
  //       videoUrl: 'https://www.example.com/backend_node_video.mp4',
  //       enrolledUser: 80,
  //       category: { id: 1, name: 'Web Development', imageUrl: 'path/to/web_icon.png', description: 'Courses on web development.' },
  //       creator: { id: 101, username: 'alixdesign', email: 'alix@example.com', phone: '123-456-7890', fullname: 'Alix Design', xp: 150 },
  //       createdAt: '2023-05-05T16:00:00Z',
  //     },
  //     {
  //       id: 6,
  //       title: 'Mobile App Design with Sketch',
  //       description: 'Design intuitive and beautiful mobile applications',
  //       level: 'Intermediate',
  //       features: ['Sketch', 'UI Grids', 'Design Systems', 'User Flows'],
  //       courseOutLine: 'Master mobile app design with Sketch.',
  //       price: 39.99, // Example price
  //       imageUrl: 'assets/course_images/mobile_sketch.png',
  //       videoUrl: 'https://www.example.com/mobile_sketch_video.mp4',
  //       enrolledUser: 60,
  //       category: { id: 2, name: 'UI/UX Design', imageUrl: 'path/to/uiux_icon.png', description: 'Courses on user interface and experience design.' },
  //       creator: { id: 102, username: 'kashiftaj', email: 'kashif@example.com', phone: '987-654-3210', fullname: 'Kashif Taj', xp: 120 },
  //       createdAt: '2023-06-10T10:00:00Z',
  //     },
  //   ];

 

}
