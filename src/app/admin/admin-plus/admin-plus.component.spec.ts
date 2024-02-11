import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlusComponent } from './admin-plus.component';

describe('AdminPlusComponent', () => {
  let component: AdminPlusComponent;
  let fixture: ComponentFixture<AdminPlusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPlusComponent],
    });
    fixture = TestBed.createComponent(AdminPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
