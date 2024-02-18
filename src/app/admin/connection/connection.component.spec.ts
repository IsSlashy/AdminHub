import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ConnectionComponent } from './connection.component';

describe('ConnectionComponent', () => {
  let component: ConnectionComponent;
  let fixture: ComponentFixture<ConnectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [Apollo],
    });
    fixture = TestBed.createComponent(ConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
