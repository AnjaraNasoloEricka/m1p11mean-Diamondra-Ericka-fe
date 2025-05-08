import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialofferComponent } from './specialoffer.component';

describe('SpecialofferComponent', () => {
  let component: SpecialofferComponent;
  let fixture: ComponentFixture<SpecialofferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialofferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
