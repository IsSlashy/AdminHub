import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Apollo } from 'apollo-angular';
import { SailorComponent } from './sailor.component';
import { of } from 'rxjs';

// Mock Apollo service class
class MockApollo {
  query() {
    return of({
      data: {
        // Mock data structure that matches what your component expects
      }
    });
  }
}

// Example: Mock another service if your component depends on it
class MockAnotherService {
  someMethod() {
    return of({ key: 'value' }); // Adjust according to what the service method returns
  }
}

describe('SailorComponent', () => {
  let component: SailorComponent;
  let fixture: ComponentFixture<SailorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SailorComponent],
      imports: [
        RouterTestingModule // Enables testing of components that use <router-outlet> and routing
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // Mock route parameters
            // Add other route data mocks if needed
          },
        },
        { provide: Apollo, useClass: MockApollo }, // Mock Apollo service
        // { provide: AnotherService, useClass: MockAnotherService }, // Uncomment if you have another service to mock
      ],
    }).compileComponents(); // Compile the component to make it ready for testing

    fixture = TestBed.createComponent(SailorComponent); // Create a fixture for SailorComponent
    component = fixture.componentInstance; // Get the instance of SailorComponent
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verify that the component is properly instantiated
  });
});
