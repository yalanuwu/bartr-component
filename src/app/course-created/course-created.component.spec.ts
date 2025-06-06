import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCreatedComponent } from './course-created.component';

describe('CourseCreatedComponent', () => {
  let component: CourseCreatedComponent;
  let fixture: ComponentFixture<CourseCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCreatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
