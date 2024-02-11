import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssigneOfferComponent } from './modal-assigne-offer.component';

describe('ModalAssigneOfferComponent', () => {
  let component: ModalAssigneOfferComponent;
  let fixture: ComponentFixture<ModalAssigneOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAssigneOfferComponent],
    });
    fixture = TestBed.createComponent(ModalAssigneOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
