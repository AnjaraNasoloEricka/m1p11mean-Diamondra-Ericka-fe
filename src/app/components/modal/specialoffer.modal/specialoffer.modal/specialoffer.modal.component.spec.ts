import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Specialoffer.ModalComponent } from './specialoffer.modal.component';

describe('Specialoffer.ModalComponent', () => {
  let component: Specialoffer.ModalComponent;
  let fixture: ComponentFixture<Specialoffer.ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Specialoffer.ModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Specialoffer.ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
