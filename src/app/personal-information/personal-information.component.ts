import { Component } from '@angular/core';

@Component({
  selector: 'app-personal-information',
  imports: [],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css'
})

export class PersonalInformationComponent {
  userName: string = 'Username';
  userEmail: string = 'profilename123@gmail.com';
  profileName: string = 'Profile Name';
  contactNumber: string = '123456789';
  xp: number = 300;
  countryRegion: string = 'Chennai, India';

  signOut(): void {
    console.log('User signed out!');
    // Implement your sign-out logic here (e.g., clear session, redirect to login)
    // Example: this.router.navigate(['/login']);
  }
}
