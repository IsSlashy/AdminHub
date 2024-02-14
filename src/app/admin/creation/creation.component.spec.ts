import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationComponent } from './creation.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreationComponent', () => {
  let component: CreationComponent;
  let fixture: ComponentFixture<CreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreationComponent],
      imports: [RouterTestingModule],
    });
    fixture = TestBed.createComponent(CreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
