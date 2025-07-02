import { RouterModule ,Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomePageComponent } from './home-page/home-page.component';

import { CreateCoursePageComponent } from './create-course-page/create-course-page.component';
import { ProfilePersonalPageComponent } from './profile-personal-page/profile-personal-page.component';
import { DebugComponentComponent } from './debug-component/debug-component.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CourseDetailPageComponent } from './course-page/course-page.component';
import { PublicProfilePageComponent } from './public-profile-page/public-profile-page.component';
import { PurchaseXpComponent } from './purchase-xp/purchase-xp.component';
import { CourseContentPageComponent } from './course-content-page/course-content-page.component';
import { SignUpPageComponent } from './auth/sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './auth/sign-in-page/sign-in-page.component';
import { authGuard } from './auth/auth.guard';
import { SearchResultPageComponent } from './search-result-page/search-result-page.component';
import { AboutUsComponent } from './footer_pages/about-us/about-us.component';
import { PrivacyPolicyComponent } from './footer_pages/privacy-policy/privacy-policy.component';
import { SupportComponent } from './footer_pages/support/support.component';
import { TermsAndCondiComponent } from './footer_pages/terms-and-condi/terms-and-condi.component';

export const routes: Routes = [
  // Your existing home page route
  { path: '', component: HomePageComponent },

  // New routes for your pages
  { path: 'auth/signin', component: SignInPageComponent },
  { path: 'auth/signup', component: SignUpPageComponent },
  // { path: 'create-course', component: CreateCoursePageComponent },
  { path: 'profile', component: ProfilePersonalPageComponent, canActivate: [authGuard] },
  { path: 'debug', component: DebugComponentComponent},
  { path: 'all-categories', component: AllCategoriesComponent},
  // { path: 'course-page', component: CourseDetailPageComponent},
  { path: 'course/:id', component: CourseDetailPageComponent},
  { path: 'public-profile/:username', component: PublicProfilePageComponent},
  { path: 'purchase-xp', component: PurchaseXpComponent},
  { path: 'search-result/:searchQuery', component: SearchResultPageComponent},

  { path: 'course-content/:id',
    component: CourseContentPageComponent,
    canActivate: [authGuard]
  },

  {
    path: 'create-course',
    component: CreateCoursePageComponent,
    canActivate: [authGuard] // <--- This line applies the guard!
  },


  //Footer routes
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'support',
    component: SupportComponent,
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndCondiComponent
  },

  // Wildcard route to redirect to home for any undefined paths
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
