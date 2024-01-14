import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { USER } from 'src/graphql/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

  user:any
  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ){}

  ngOnInit(){
    this.route.paramMap.subscribe(param => {
      this.apollo.query({
        query: USER,
        variables: {
          userId: param.get('id')
        }
      }).subscribe(({data}: any) => {
        this.user = data.user
      })
    })
  }

}
