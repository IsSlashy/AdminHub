import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Title } from '@angular/platform-browser'; // Importez Title
import { Apollo } from 'apollo-angular';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        Title, // Ajoutez Title aux providers
        Apollo,
        { provide: ActivatedRoute, useValue: { params: of({}) } },
        { provide: Apollo, useValue: { query: () => of({}) } },
        { provide: MatDialog, useValue: {} },
        { provide: Router, useValue: { navigate: () => {} } },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as document title 'Admin app is running!'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Déclenche la détection de changement pour initialiser le composant
    const titleService = TestBed.inject(Title); // Injectez le service Title pour accéder au titre actuel
    expect(titleService.getTitle()).toEqual('Admin app is running!'); // Vérifiez que le titre du document a été défini correctement
  });
});
