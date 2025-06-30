import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent{

  constructor(
    private router: Router,
  ) {}

  onAboutUsClick() {
    this.router.navigate(['/about-us']);
  }

  onPrivacyClick() {
    this.router.navigate(['/privacy-policy']);
  }

  onSupportClick() {
    this.router.navigate(['/support']);
  }

  onTermsAndConditionClick() {
    this.router.navigate(['/terms-and-conditions']);
  }
}
