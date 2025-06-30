import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UserProfileData } from '../edit-profile-modal/edit-profile-modal.component';
import { EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal.component';
import { User } from '../types';

@Component({
  selector: 'app-personal-information',
  imports: [NgFor, CommonModule, FormsModule, EditProfileModalComponent],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css',
  standalone: true
})

export class PersonalInformationComponent implements OnInit {

  @Input() user: User | null = null;

  userName: string = 'Username';
  userEmail: string = 'profilename123@gmail.com';

  currentUserProfile: UserProfileData = {
    name: 'Profile Name',
    // tagline: 'Your tagline here',
    description: 'This is a sample bio.', // Corresponds to `bio`
    contact: '123456789', // Corresponds to `contactNumber`
    country: 'Chennai, India', // Corresponds to `countryRegion`
    avatarUrl: 'assets/dummy-avatar/avataaars.png', // Default avatar
    skills: ['Angular', 'TypeScript', 'JavaScript'],
    responseTime: '24' // Add a default, as modal expects this
  }
   xp: number = 300;

   // Properties to be displayed in the template, derived from currentUserProfile
  profileName: string;
  contactNumber: string;
  countryRegion: string;
  bio: string;
  skills: string[];

   showEditProfileModal: boolean = false;
  // skills: string[] = [];

  constructor () {
    // Initialize these properties directly in the constructor
    // before ngOnInit, to ensure they always have a value.
    this.profileName = this.currentUserProfile.name;
    this.contactNumber = this.currentUserProfile.contact;
    this.countryRegion = this.currentUserProfile.country;
    this.bio = this.currentUserProfile.description;
    this.skills = [...this.currentUserProfile.skills]; // Create a copy
  }

  ngOnInit() {
    // Initialize component display properties from currentUserProfile
    // this.updateDisplayProperties();
  }

  // Helper method to update the component's individual display properties
  // whenever currentUserProfile changes (e.g., after modal save)
  private updateDisplayProperties(): void {
    this.profileName = this.currentUserProfile.name;
    this.contactNumber = this.currentUserProfile.contact;
    this.countryRegion = this.currentUserProfile.country;
    this.bio = this.currentUserProfile.description;
    this.skills = [...this.currentUserProfile.skills]; // Create a copy of skills array
    // Note: userName, userEmail, and xp are not directly managed by the modal in this setup.
    // If userName/userEmail should also be editable, you'd add them to UserProfileData.
  }

  onEdit(): void {
    console.log('Edit Profile button clicked!');
    this.showEditProfileModal = true; // Show the modal
  }

  onProfileSaved(updatedUser: UserProfileData): void {
    console.log('Profile saved from modal:', updatedUser);
    // Update the main currentUserProfile with the data from the modal
    this.currentUserProfile = { ...updatedUser }; // Create a new object reference
    this.updateDisplayProperties(); // Update display properties
    this.showEditProfileModal = false; // Hide the modal
    // In a real application, you would typically send this 'updatedUser' object to your backend API here.
  }

  onCancelEditProfile(): void {
    console.log('Edit profile canceled from modal.');
    this.showEditProfileModal = false; // Hide the modal
  }

}
