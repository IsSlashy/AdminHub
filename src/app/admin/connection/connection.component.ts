import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { AUTHENTICATE } from 'src/graphql/connexion';
import { catchError, tap } from 'rxjs/operators';
import { firstValueFrom, of } from 'rxjs';
interface AuthResponse {
  authenticate: {
    accessToken: string;
    preferredConnection: any; // Change this type to whatever is appropriate
    isAdmin: boolean;
  };
}

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css'],
})
export class ConnectionComponent {
  email!: string;
  password!: string;

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {}

  async connect() {
    try {
      const result = await firstValueFrom(
        this.apollo
          .mutate<AuthResponse>({
            mutation: AUTHENTICATE,
            variables: {
              email: this.email,
              password: this.password,
            },
          })
          .pipe(
            tap(({ data }) => {
              console.log('got data ', data);
              if (data && data.authenticate && data.authenticate.accessToken) {
                // Store the token in local storage
                localStorage.setItem(
                  'access-token',
                  data.authenticate.accessToken
                );
                // Navigate to /dashboard if login is successful
                this.router.navigate(['/admin']);
                document.body.classList.add('logged-in');
              }
            }),
            catchError((error) => {
              console.log('there was an error sending the query', error);
              return of(error); // return a new Observable
            })
          )
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}
