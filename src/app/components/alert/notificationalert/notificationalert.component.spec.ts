import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationalertComponent } from './notificationalert.component';

describe('NotificationalertComponent', () => {
  let component: NotificationalertComponent;
  let fixture: ComponentFixture<NotificationalertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationalertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
