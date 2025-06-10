import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-card-general',
  imports: [NgClass],
  templateUrl: './course-card-general.component.html',
  styleUrl: './course-card-general.component.css'
})
export class CourseCardGeneralComponent {
  @Input() course: any;
}
