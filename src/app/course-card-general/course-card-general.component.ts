import { NgClass } from '@angular/common';
import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-card-general',
  imports: [NgClass],
  templateUrl: './course-card-general.component.html',
  styleUrl: './course-card-general.component.css'
})
export class CourseCardGeneralComponent implements OnInit{
  @Input() course: any;
  @Input() showXP: boolean = true;
  @Input() animation: boolean = false;

  ngOnInit(): void {

  }

  constructor (public elementRef: ElementRef) {

  }

}
