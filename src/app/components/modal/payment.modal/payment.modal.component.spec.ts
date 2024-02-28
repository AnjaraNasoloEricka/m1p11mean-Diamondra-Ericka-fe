import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Payment.ModalComponent } from './payment.modal.component';

describe('Payment.ModalComponent', () => {
  let component: Payment.ModalComponent;
  let fixture: ComponentFixture<Payment.ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Payment.ModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Payment.ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
