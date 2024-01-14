import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarborComponent } from './harbor.component';

describe('HarborComponent', () => {
  let component: HarborComponent;
  let fixture: ComponentFixture<HarborComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HarborComponent]
    });
    fixture = TestBed.createComponent(HarborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
