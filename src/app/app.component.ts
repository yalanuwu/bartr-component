import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfilePersonalPageComponent } from './profile-personal-page/profile-personal-page.component';
import { HomePageComponent } from "./home-page/home-page.component";
import { SearchResultPageComponent } from "./search-result-page/search-result-page.component";
import { CourseDetailPageComponent } from "./course-page/course-page.component";
import { CreateCoursePageComponent } from "./create-course-page/create-course-page.component";
import { PublicProfilePageComponent } from "./public-profile-page/public-profile-page.component";

@Component({
  selector: 'app-root',
  imports: [RegisterComponent, SignInComponent, ProfilePersonalPageComponent, HomePageComponent, SearchResultPageComponent, CourseDetailPageComponent, CreateCoursePageComponent, PublicProfilePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bartr_component';
}
