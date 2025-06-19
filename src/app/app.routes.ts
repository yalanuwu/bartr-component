import { RouterModule ,Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomePageComponent } from './home-page/home-page.component';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpModalComponent } from './register/register.component';
import { CreateCoursePageComponent } from './create-course-page/create-course-page.component';
import { ProfilePersonalPageComponent } from './profile-personal-page/profile-personal-page.component';
import { DebugComponentComponent } from './debug-component/debug-component.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { CourseDetailPageComponent } from './course-page/course-page.component';
import { PublicProfilePageComponent } from './public-profile-page/public-profile-page.component';

export const routes: Routes = [
  // Your existing home page route
  { path: '', component: HomePageComponent },

  // New routes for your pages
  { path: 'login', component: SignInComponent },
  { path: 'signup', component: SignUpModalComponent },
  // { path: 'create-course', component: CreateCoursePageComponent },
  { path: 'profile', component: ProfilePersonalPageComponent },
  { path: 'debug', component: DebugComponentComponent},
  { path: 'all-categories', component: AllCategoriesComponent},
  { path: 'course-page', component: CourseDetailPageComponent},
  { path: 'public-profile', component: PublicProfilePageComponent},

  {
    path: 'create-course',
    component: CreateCoursePageComponent,
    canActivate: [AuthGuard] // <--- This line applies the guard!
  },

  // Wildcard route to redirect to home for any undefined paths
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
