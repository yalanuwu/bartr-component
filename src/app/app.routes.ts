import { RouterModule ,Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomePageComponent } from './home-page/home-page.component';

import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { CreateCoursePageComponent } from './create-course-page/create-course-page.component';

export const routes: Routes = [
  // Your existing home page route
  { path: '', component: HomePageComponent },

  // New routes for your pages
  { path: 'login', component: SignInComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'create-course', component: CreateCoursePageComponent },

  // Wildcard route to redirect to home for any undefined paths
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
