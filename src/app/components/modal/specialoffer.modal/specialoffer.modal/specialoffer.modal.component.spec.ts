import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialofferModalComponent } from './specialoffer.modal.component';

describe('SpecialofferModalComponent', () => {
  let component: SpecialofferModalComponent;
  let fixture: ComponentFixture<SpecialofferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialofferModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialofferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
