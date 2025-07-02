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
      name: 'Abhigyan',
      role: 'Front-end Developer',
      // bio: 'Visionary leader with 15+ years in tech innovation and product development.',
      imageUrl: 'assets/dummy-avatar/Image (3).jfif' // Placeholder image
    },
    {
      name: 'Sankeerth',
      role: 'Database Engineer',
      // bio: 'Master of scalable architectures and cutting-edge software solutions.',
      imageUrl: 'assets/dummy-avatar/Image (5).jfif' // Placeholder image
    },
    {
      name: 'Sathya M',
      role: 'Back-end Developer',
      // bio: 'Passionate about connecting with users and building vibrant communities.',
      imageUrl: 'assets/dummy-avatar/Image (2).jfif' // Placeholder image
    },
    {
      name: 'Rohit Mishra',
      role: 'Back-end Developer',
      // bio: 'Crafting robust and elegant code that brings ideas to life.',
      imageUrl: 'assets/dummy-avatar/Image (6).jfif' // Placeholder image
    }
  ];

  // Data for the "Our Values" section
  values = [
    {
      icon: '💡', // Unicode icons or replace with SVG/Font Awesome
      title: 'Innovation',
      description: 'We constantly explore new technologies and creative solutions to deliver a cutting-edge platform that redefines skill exchange. We believe in pushing boundaries to make learning and teaching more intuitive and impactful.'
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'We thrive on teamwork, both within our own team and with our vibrant community of users. We believe that the most powerful learning experiences come from shared knowledge and mutual support.'
    },
    {
      icon: '✨',
      title: 'Excellence',
      description: 'We are committed to delivering high-quality products and exceptional service. From the user interface to the underlying technology, we strive for perfection to ensure a seamless and rewarding experience for everyone on Bartr.'
    }
    ,
    {
      icon: '🌱',
      title: 'Growth',
      description: 'We foster an environment that encourages continuous learning and personal development for all our users. We believe in empowering individuals to expand their skill sets and achieve their full potential.'
    },
    {
      icon:'⚖️',
      title:'Equity',
      description:'We are dedicated to making skill development accessible and fair for everyone, regardless of their background or financial situation. Our XP-based system is designed to create an equitable exchange of knowledge.'
    },
    {
      icon:'🛸',
      title:'Impact',
      description:'We aim to create a meaningful difference in people\'s lives by empowering them to acquire new skills, share their expertise, and advance their personal and professional journeys'
    }
  ];
}
