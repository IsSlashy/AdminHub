import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing'; // import RouterTestingModule // import SidebarComponent
import { Apollo } from 'apollo-angular';
import { AdminComponent } from 'src/app/admin/admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AdminComponent, // declare SidebarComponent
      ],
      imports: [
        RouterTestingModule, // import RouterTestingModule
        MatDialogModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [Apollo],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
