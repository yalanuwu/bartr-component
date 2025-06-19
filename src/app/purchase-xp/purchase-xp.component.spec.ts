import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseXpComponent } from './purchase-xp.component';

describe('PurchaseXpComponent', () => {
  let component: PurchaseXpComponent;
  let fixture: ComponentFixture<PurchaseXpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseXpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseXpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
