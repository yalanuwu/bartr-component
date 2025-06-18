import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentSuccessModalComponent } from './enrollment-success-modal.component';

describe('EnrollmentSuccessModalComponent', () => {
  let component: EnrollmentSuccessModalComponent;
  let fixture: ComponentFixture<EnrollmentSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentSuccessModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollmentSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
