import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../types';
import { ToastrService } from '../toastr/toastr.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth/auth.service';
import { Subscription, take } from 'rxjs';


export interface UserProfileData {
  id: number;
  name?: string | null; // Corresponds to User.fullname, now optional and nullable
  phone?: string | null; // Corresponds to User.phone, now optional and nullable
  region?: string | null; // Corresponds to User.region, now optional and nullable
  bio?: string | null; // Corresponds to User.bio, now optional and nullable
  skills?: string[] | null; // Frontend works with skills as an ARRAY, now optional and nullable
  responseTime?: number | null; // Corrected type: number or null, now optional and nullable
  avatarUrl?: string | null; // Optional and nullable
}

export interface UserUpdatePayload {
  id: number;
  fullname?: string | null; // Corresponds to UserProfileData.name, now optional and nullable
  phone?: string | null; // Corresponds to UserProfileData.phone, now optional and nullable
  region?: string | null; // Corresponds to UserProfileData.region, now optional and nullable
  bio?: string | null; // Corresponds to UserProfileData.bio, now optional and nullable
  skills?: string | null; // Backend expects comma-separated STRING OR null, now optional and nullable
  responseTime?: number | null; // Corresponds to UserProfileData.responseTime, now optional and nullable
}

@Component({
  selector: 'app-edit-profile-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile-modal.component.html',
  styleUrl: './edit-profile-modal.component.css'
})
export class EditProfileModalComponent implements OnInit {
  @Input() user: User | null = null;
  @Output() save = new EventEmitter<UserProfileData>();
  @Output() cancel = new EventEmitter<void>();

  regions : string[] = [
    'Chennai, India',
    'Kolkata, India',
    'Bangalore, India',
    'Delhi, India',
    'Mumbai, India',
    'Coimbatore, India', // Added missing cities from previous lists
    'Hyderabad, India',
    'Pune, India',
    '' // Allow empty for "Select Region"
  ]

  editedUser!: UserProfileData; // This will be initialized in ngOnInit

  newSkill = '';
  private authUserSubscription!: Subscription; // For fallback user loading

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
      // Initialize editedUser based on the @Input() 'user' or by fetching from AuthService/UserService
    if (this.user) {
      // Map the input 'User' object to 'UserProfileData' for the form
      this.initializeEditedUserFromUser(this.user);
    } else {
      // Fallback: If no @Input user, try to load current user's profile
      this.authUserSubscription = this.authService.getCurrentUser().pipe(take(1)).subscribe(authUser => {
        if (authUser && authUser.username) {
          this.userService.getByUserName(authUser.username).subscribe({
            next: (profileData: User) => { // Expecting a User object from backend
              this.initializeEditedUserFromUser(profileData); // Map 'User' to 'UserProfileData'
              console.log('User profile initialized from fetched data:', this.editedUser);
            },
            error: (err) => {
              console.error('Failed to load user profile for editing:', err);
              this.toastr.showError('Failed to load profile data.');
            }
          });
        } else {
          console.warn('No authenticated user or username available to load profile.');
          // Initialize with all optional fields as null/empty for a new/empty profile
          this.editedUser = {
            id: 0, // Default ID for a new user, will be overwritten by actual user ID
            name: null,
            phone: null,
            region: null,
            bio: null,
            skills: null, // Start as null if no user data, or empty array if preferred
            responseTime: null,
            avatarUrl: null
          };
        }
      });
    }

  }

  ngOnDestroy(): void {
    if (this.authUserSubscription) {
      this.authUserSubscription.unsubscribe();
    }
  }

  /**
   * Helper to map the backend 'User' object to the frontend 'UserProfileData' for the form.
   * This handles the conversion of optional fields (`undefined`) to `null` and skills string to array.
   * @param data The user data received from the backend (of type 'User').
   */
  private initializeEditedUserFromUser(data: User): void {
    this.editedUser = {
      id: data.id || 0,
      name: data.fullname || null, // Map fullname to name, allow null
      phone: data.phone || null, // Allow null
      region: data.region || null, // Allow null
      bio: data.bio || null, // Allow null
      // SKILLS CONVERSION: STRING TO ARRAY. If data.skills is null, it becomes null.
      // If you prefer it to be an empty array for the form when null, change `null` to `[]`.
      skills: data.skills ? data.skills.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '') : null,
      responseTime: data.responseTime === undefined ? null : data.responseTime, // Convert undefined to null
      avatarUrl: data.avatarUrl === undefined ? null : data.avatarUrl, // Convert undefined to null
    };

    // Special handling for skills: if it's null, ensure it's an empty array for add/remove operations
    if (this.editedUser.skills === null) {
      this.editedUser.skills = [];
    }
  }

  //Add skills
  addSkill(): void {
    const skill = this.newSkill.trim();
    // Use '!' to assert that editedUser.skills is not null, as it's initialized to []
    if (skill && !this.editedUser.skills!.some(s => s.toLowerCase() === skill.toLowerCase())) {
      this.editedUser.skills!.push(skill);
      this.newSkill = '';
    }
  }

  //REmove skills
  removeSkill(index: number): void {
    this.editedUser.skills!.splice(index, 1);
  }

  //Save function
  onSave(): void {
    // --- REMOVED ALL REQUIRED FIELD VALIDATIONS ---
    // The fields are now optional as per your request.
    // You might still want to add validation for responseTime to be a valid number >= 0 if it's provided.

    // Validate Phone Number if provided
    if (typeof this.editedUser.phone === 'string' && this.editedUser.phone.trim() !== '') {
      const rawPhoneNumber = this.editedUser.phone.trim();
      const phoneRegex = /^\+?[\d\s\-\(\)]+$/; // Allows +, digits, spaces, hyphens, parentheses

      // First, check overall format
      if (!phoneRegex.test(rawPhoneNumber)) {
        this.toastr.showError('Invalid phone number format. Please use only digits, spaces, hyphens, parentheses, and an optional leading "+".');
        return;
      }

      // Step 1: Remove country code (e.g., +91, +1, +44)
      // This regex matches a string starting with '+' followed by 1 to 3 digits, then optional spaces/hyphens
      const countryCodeRegex = /^\+\d{1,3}[\s\-]* /; // Added a space after * to ensure it matches common formats like "+91 "
      let numberWithoutCountryCode = rawPhoneNumber.replace(countryCodeRegex, '');

      // Step 2: Remove all remaining non-digit characters for length check
      const cleanedPhone = numberWithoutCountryCode.replace(/\D/g, ''); // \D matches any non-digit character

      console.log('Raw Phone:', rawPhoneNumber);
      console.log('Number without country code:', numberWithoutCountryCode);
      console.log('Cleaned Phone (digits only):', cleanedPhone);


      if (cleanedPhone.length < 10) {
        this.toastr.showError('Phone number (excluding country code) is too short. Please enter at least 10 digits.');
        return;
      }
      if (cleanedPhone.length > 10) {
        this.toastr.showError('Phone number (excluding country code) is too long. Please enter a maximum of 10 digits.');
        return;
      }
    }

    // Validate Full Name (alphabets and spaces only) if provided
    if (typeof this.editedUser.name === 'string' && this.editedUser.name.trim() !== '') {
      const nameRegex = /^[a-zA-Z\s]*$/;
      if (!nameRegex.test(this.editedUser.name.trim())) {
        this.toastr.showError('Name can only contain alphabets and spaces.');
        return;
      }
    }

    // Validate Bio max character limit if provided
    if (typeof this.editedUser.bio === 'string' && this.editedUser.bio.trim() !== '') {
      if (this.editedUser.bio.length > 100) {
        this.toastr.showError('Bio must be a maximum of 100 characters long.');
        return;
      }
    }

    // Validate individual skills length (already handled in addSkill, but double-check for existing)
    if (this.editedUser.skills && this.editedUser.skills.length > 0) {
      for (const skill of this.editedUser.skills) {
        if (skill.length > 20) {
          this.toastr.showError(`Skill "${skill}" is too long. Each skill must be a maximum of 20 characters.`);
          return;
        }
      }
    }

    if (this.editedUser.responseTime !== null && this.editedUser.responseTime !== undefined && this.editedUser.responseTime < 0) {
      this.toastr.showError('Response Time cannot be negative.');
      return;
    }

    const userIdToUpdate = this.editedUser.id;
    if (userIdToUpdate === 0) {
      this.toastr.showError('Error: User ID not available for update. Please log in again.');
      return;
    }

    // Data to send to the backend, conforming to UserUpdatePayload
    // Only include fields that have a value (are not null/undefined)
    // This allows backend to only update provided fields.
    const dataToSend: UserUpdatePayload = {
      id: userIdToUpdate,
      // Use nullish coalescing (??) or conditional assignment to send null if field is empty string
      fullname: this.editedUser.name || null, // Send null if name is empty string
      phone: this.editedUser.phone || null, // Send null if phone is empty string
      region: this.editedUser.region || null, // Send null if region is empty string
      bio: this.editedUser.bio || null, // Send null if bio is empty string
      // SKILLS CONVERSION: ARRAY TO STRING. Send null if skills array is empty or null.
      skills: (this.editedUser.skills && this.editedUser.skills.length > 0)
        ? this.editedUser.skills.join(',')
        : null,
      responseTime: this.editedUser.responseTime || null // Send null if responseTime is 0 or null
    };

    // OPTIONAL: Filter out undefined/null properties from dataToSend if backend strictly expects
    // *only* the fields that are actually being updated, and not null/empty strings for unchanged fields.
    // This depends on how your backend's PATCH endpoint is implemented.
    // If backend expects all fields (even null), the above `dataToSend` is fine.
    // If backend only wants changed fields, you'd do something like:
    // const filteredDataToSend: Partial<UserUpdatePayload> = {};
    // if (dataToSend.fullname !== null) filteredDataToSend.fullname = dataToSend.fullname;
    // if (dataToSend.phone !== null) filteredDataToSend.phone = dataToSend.phone;
    // ... etc.
    // And then pass filteredDataToSend to updateUser.
    // For now, we'll send all fields as defined in dataToSend, with nulls for empty ones.


    console.log('Data to send for update:', dataToSend);

    this.userService.updateUser(userIdToUpdate, dataToSend).subscribe({
      next: (updatedUserFromBackend: User) => {
        console.log('Profile updated successfully:', updatedUserFromBackend);
        this.initializeEditedUserFromUser(updatedUserFromBackend);
        this.save.emit(this.editedUser);
        this.authService.updateCurrentUser(updatedUserFromBackend);
        this.toastr.showSuccess('Profile updated successfully!');
      },
      error: (error: any) => {
        console.error('Error updating profile:', error);
        this.toastr.showError(error.message || 'Failed to update profile. Please try again.');
      }
    });
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
