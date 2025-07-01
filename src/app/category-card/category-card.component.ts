import { CommonModule } from '@angular/common';
import { Component, Input, Output, ElementRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Category } from '../types';
import { Router } from '@angular/router';



@Component({
  selector: 'app-category-card',
  imports: [CommonModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  // Input property to receive category data
  @Input() category: Category | undefined;

  // Input property to control the 'animate-slide-in-right' CSS class
  @Input() isVisible: boolean = true;

  // Output event emitter for when the card is clicked
  @Output() cardClick = new EventEmitter<string>();

  // ElementRef is injected and made public so the parent component can access the native host element for IntersectionObserver
  constructor(public ElementRef: ElementRef,private router:Router) { }

  // Method to handle card clicks and emit the category name
  onClick(): void {
    if (this.category?.name) {
      this.cardClick.emit(this.category.name);
    }
  }

  search():void{
    this.router.navigate(['/search-result',this.category?.name]);
  }
}
