import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router'; // Import Router
import { MatDialog } from '@angular/material/dialog';
import { CalculesComponent } from '../components/calcules/calcules.component';
import {
  CURRENT_ADMIN,
  GET_DOCUMENT_NUMBER,
  GET_RESUMES_NUMBER,
} from 'src/graphql/dashboard';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  jobId: String | null = '';
  clientId: String | null = '';
  marinId: String | null = '';

  user: any;
  waitingDocsNumber: number = 0;

  constructor(
    private apollo: Apollo,
    private router: Router, // Inject the Router here
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.apollo
      .query({
        query: CURRENT_ADMIN,
      })
      .subscribe(({ data }: any) => {
        this.user = data.currentUser;
      });

    this.apollo
      .query({
        query: GET_DOCUMENT_NUMBER,
      })
      .subscribe(({ data }: any) => {
        const docNumber = data.documents.totalCount;
        this.apollo
          .query({
            query: GET_RESUMES_NUMBER,
          })
          .subscribe(({ data }: any) => {
            this.waitingDocsNumber = data.resumes.totalCount + docNumber;
          });
      });
  }

  logout(): void {
    localStorage.removeItem('access-token');
    document.body.classList.remove('logged-in');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  openCalculModal() {
    const dialogRef = this.dialog.open(CalculesComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  resetForm() {
    this.jobId = '';
    this.clientId = '';
    this.marinId = '';
  }
}
