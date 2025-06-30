import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-terms-and-condi',
  imports: [CommonModule],
  templateUrl: './terms-and-condi.component.html',
  styleUrl: './terms-and-condi.component.css'
})
export class TermsAndCondiComponent {
  lastUpdated: string = 'June 30, 2025';
}
