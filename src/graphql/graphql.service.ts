import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo) { }

  searchDatabase(query: string) {
return this.apollo.query({
  query: gql`
    query Search($query: String!) {
      search(query: $query) {
        name
        description
        // other fields...
      }
    }
  `,
  variables: {
    query: query
  }
}).pipe(map(result => result.data));
  }
}
