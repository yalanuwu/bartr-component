import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  imports: [NgFor],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  // Data for the "Our Team" section
  teamMembers = [
    {
      name: 'John Doe',
      role: 'CEO & Co-Founder',
      bio: 'Visionary leader with 15+ years in tech innovation and product development.',
      imageUrl: 'https://via.placeholder.com/150/C7D2FE/3730A3?text=JD' // Placeholder image
    },
    {
      name: 'Jane Smith',
      role: 'CTO & Co-Founder',
      bio: 'Master of scalable architectures and cutting-edge software solutions.',
      imageUrl: 'https://via.placeholder.com/150/A78BFA/5B21B6?text=JS' // Placeholder image
    },
    {
      name: 'Alice Johnson',
      role: 'Head of Marketing',
      bio: 'Passionate about connecting with users and building vibrant communities.',
      imageUrl: 'https://via.placeholder.com/150/FBCFE8/9D174D?text=AJ' // Placeholder image
    },
    {
      name: 'Bob Williams',
      role: 'Lead Developer',
      bio: 'Crafting robust and elegant code that brings ideas to life.',
      imageUrl: 'https://via.placeholder.com/150/D1FAE5/065F46?text=BW' // Placeholder image
    }
  ];

  // Data for the "Our Values" section
  values = [
    {
      icon: '💡', // Unicode icons or replace with SVG/Font Awesome
      title: 'Innovation',
      description: 'Constantly exploring new technologies to deliver cutting-edge solutions.'
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'Believing in the power of teamwork, both internally and with our users.'
    },
    {
      icon: '✨',
      title: 'Excellence',
      description: 'Committed to delivering high-quality products and exceptional service.'
    }
  ];
}
