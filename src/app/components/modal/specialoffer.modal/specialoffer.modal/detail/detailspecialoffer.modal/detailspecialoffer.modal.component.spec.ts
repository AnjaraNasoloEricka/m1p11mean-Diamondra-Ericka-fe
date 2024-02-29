import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailspecialofferModalComponent } from './detailspecialoffer.modal.component';

describe('Detailspecialoffer.ModalComponent', () => {
  let component: DetailspecialofferModalComponent;
  let fixture: ComponentFixture<DetailspecialofferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailspecialofferModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailspecialofferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
