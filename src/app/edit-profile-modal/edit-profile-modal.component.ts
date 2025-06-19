import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


export interface UserProfileData {
  name: string;
  tagline: string; // From previous iteration, keep for consistency
  description: string; // Renamed to 'bio' in modal label for clarity
  contact: string; // NEW FIELD
  country: string; // NEW FIELD
  avatarUrl: string;
  skills: string[];
  responseTime: number;
}

@Component({
  selector: 'app-edit-profile-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile-modal.component.html',
  styleUrl: './edit-profile-modal.component.css'
})
export class EditProfileModalComponent implements OnInit {
  @Input() user: UserProfileData | undefined;
  @Output() save = new EventEmitter<UserProfileData>();
  @Output() cancel = new EventEmitter<void>();

  regions : string[] = [
    'Chennai, India',
    'Kolkata, India',
    'Bangalore, India',
    'Delhi, India',
    'Mumbai, India',
    ''
  ]

  // Internal model for the form, initialized with a copy of input user data
  editedUser: UserProfileData = {
    name: '',
    tagline: '',
    description: '',
    contact: '', // Initialize new fields
    country: '', // Initialize new fields
    avatarUrl: '',
    skills: [],
    responseTime: 0 // Initialize new fields
  };

  newSkill = '';

  ngOnInit() {
    if (this.user) {
      // Create a deep copy to avoid modifying the original user object directly
      this.editedUser = {
        ...this.user,
        skills: [...this.user.skills] // Deep copy the skills array too
      };
    }
  }

  //Add skills
  addSkill(): void {
    const skill = this.newSkill.trim();
    if (skill && !this.editedUser.skills.includes(skill)) {
      this.editedUser.skills.push(skill);
      this.newSkill = ''; // Clear input field
    }
  }

  //REmove skills
  removeSkill(index: number): void {
    this.editedUser.skills.splice(index, 1);
  }

  //Save function
  onSave(): void {
    // Basic validation (can be more robust with Angular Forms)
    if (!this.editedUser.name || !this.editedUser.tagline || !this.editedUser.description || !this.editedUser.contact || !this.editedUser.country || !this.editedUser.responseTime) {
      alert('Please fill in all required fields.');
      return;
    }
    this.save.emit(this.editedUser);
  }

  //Cancel
  onCancel(): void {
    this.cancel.emit();
  }

  //BackDrop click closes the modal
  onBackdropClick(event: MouseEvent): void {
    // Check if the click target is the backdrop itself, not a child element within the modal content
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }

}
