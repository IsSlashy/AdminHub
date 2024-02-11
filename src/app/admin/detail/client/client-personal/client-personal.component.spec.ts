import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPersonalComponent } from './client-personal.component';

describe('ClientPersonalComponent', () => {
  let component: ClientPersonalComponent;
  let fixture: ComponentFixture<ClientPersonalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientPersonalComponent],
    });
    fixture = TestBed.createComponent(ClientPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
