import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ChessComponent } from './chess.component';
import { Observable, of } from 'rxjs';
import { Apollo } from 'apollo-angular';

// Create a mock Apollo service
class MockApollo {
  // Mock the query method
  query(): Observable<any> {
    // Return an observable that resolves to mock data
    return of({
      data: {
        // Mock payload structure depending on what your component expects
      }
    });
  }
}
describe('ChessComponent', () => {
  let component: ChessComponent;
  let fixture: ComponentFixture<ChessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChessComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' }) // Simulate route parameters here
          }
        },
        {
          provide: Apollo,
          useClass: MockApollo // Use the mock Apollo service
        }
      ]
    });
    fixture = TestBed.createComponent(ChessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
