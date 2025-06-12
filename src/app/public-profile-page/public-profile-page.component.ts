import { Component, OnInit } from '@angular/core';
import { CourseCardGeneralComponent } from "../course-card-general/course-card-general.component";
import { NavbarComponentComponent } from "../navbar-component/navbar-component.component";
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";

interface PublicProfileCourse {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  authorName: string;
  authorAvatarUrl: string;
  xp: number; // Matches the 'xp' input in your course-card
  imageBackgroundGradient?: string; // Optional, as per your course-card HTML
}

@Component({
  selector: 'app-public-profile-page',
  imports: [CourseCardGeneralComponent, NavbarComponentComponent, NgIf, NgFor, FooterComponent, NgClass],
  templateUrl: './public-profile-page.component.html',
  styleUrl: './public-profile-page.component.css'
})

export class PublicProfilePageComponent implements OnInit {

  // New property to hold the randomly selected gradient class
  randomBannerGradient!: string;

  constructor() {}

  // Array of predefined Tailwind gradient classes
  gradientOptions: string[] = [
    'from-green-600 to-blue-600',
    'from-purple-600 to-pink-600',
    'from-red-600 to-yellow-600',
    'from-teal-600 to-emerald-600',
    'from-indigo-600 to-purple-600',
    'from-orange-600 to-red-600',
    // 'from-sky-600 to-blue-600'
  ];

  // Dummy data for the public profile
  user = {
    name: 'Alex Jason',
    handle: '@alexjasondev',
    email: 'AlexJason@gmail.com',
    phone: '+91 9876543210',
    tagline: 'Full Stack Software Developer | Transforming Ideas into Scalable Web Solutions',
    avatarUrl: 'https://placehold.co/100x100/34D399/FFFFFF?text=AJ', // Placeholder avatar
    location: 'Bengaluru, India',
    memberSince: 'January 2022',
    description: `A Seasoned Software Engineer. I bridge the gap between your vision and technological excellence, turning your ideas into high performing web applications. I specialize in React, Next.js, Node.js, and various database technologies. I'm passionate about building robust and scalable web solutions.`,
    skills: [
      'Web Development', 'React.js', 'Next.js', 'Node.js', 'PHP', 'MongoDB',
      'PostgreSQL', 'UI/UX Design', 'API Development', 'Cloud Deployment'
    ],
    // skills: [],
    socialLinks: {
      twitter: '#',
      linkedin: '#',
      github: '#'
    },
    responseTime: '2 Hrs',
    lastSeen: '1 hour ago'
  };

  // Dummy courses created by this user
  // coursesCreated: PublicProfileCourse[] = []
  coursesCreated: PublicProfileCourse[] = [
    {
      id: 'c1',
      imageUrl: 'assets/search_results/laravel_web_app.png', // Placeholder
      title: 'Mastering Laravel Web Development',
      description: 'Learn to develop robust and scalable web applications using the Laravel framework from scratch.',
      authorName: this.user.name,
      authorAvatarUrl: this.user.avatarUrl,
      xp: 750, // Example XP value
      imageBackgroundGradient: 'from-purple-400 to-indigo-500' // Example gradient
    },
    {
      id: 'c2',
      imageUrl: 'assets/search_results/web_applications.png', // Placeholder
      title: 'React & Node.js: Build a Full Stack App',
      description: 'Dive deep into building modern web applications with React on the frontend and Node.js on the backend.',
      authorName: this.user.name,
      authorAvatarUrl: this.user.avatarUrl,
      xp: 900,
      imageBackgroundGradient: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'c3',
      imageUrl: 'assets/search_results/full_stack_dev.png', // Placeholder
      title: 'MERN Stack Zero to Hero',
      description: 'Become a full-stack MERN developer by building multiple projects using MongoDB, Express, React, and Node.js.',
      authorName: this.user.name,
      authorAvatarUrl: this.user.avatarUrl,
      xp: 1200,
      imageBackgroundGradient: 'from-pink-400 to-red-500'
    }
    // Add more courses as needed, ensuring they match PublicProfileCourse interface
  ];

  ngOnInit(): void {
    this.randomBannerGradient = this.getRandomGradient();
  }

  private getRandomGradient(): string {
    const randomIndex = Math.floor(Math.random() * this.gradientOptions.length);
    return this.gradientOptions[randomIndex];
  }

}
