import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { DevisComponent } from './devis.component';
import { of } from 'rxjs';

// Mock Apollo service class
class MockApollo {
  query() {
    // Mock implementation of query method
  }
}

describe('DevisComponent', () => {
  let component: DevisComponent;
  let fixture: ComponentFixture<DevisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevisComponent],
      providers: [
        { provide: Apollo, useClass: MockApollo } // Provide a mock for Apollo service
      ]
    });
    fixture = TestBed.createComponent(DevisComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
