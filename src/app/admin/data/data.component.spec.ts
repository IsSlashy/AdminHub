import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataComponent } from './data.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DataComponent', () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataComponent],
      imports: [RouterTestingModule],
    });
    fixture = TestBed.createComponent(DataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
