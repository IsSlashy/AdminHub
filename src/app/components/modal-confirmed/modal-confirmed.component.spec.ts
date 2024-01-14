import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmedComponent } from './modal-confirmed.component';

describe('ModalConfirmedComponent', () => {
  let component: ModalConfirmedComponent;
  let fixture: ComponentFixture<ModalConfirmedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfirmedComponent]
    });
    fixture = TestBed.createComponent(ModalConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
