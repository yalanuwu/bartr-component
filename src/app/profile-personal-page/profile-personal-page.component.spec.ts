import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePersonalPageComponent } from './profile-personal-page.component';

describe('ProfilePersonalPageComponent', () => {
  let component: ProfilePersonalPageComponent;
  let fixture: ComponentFixture<ProfilePersonalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePersonalPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePersonalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
