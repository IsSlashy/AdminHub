import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { USER_BOATS } from 'src/graphql/client';

@Component({
  selector: 'app-boats',
  templateUrl: './boats.component.html',
  styleUrls: ['./boats.component.css']
})
export class BoatsComponent {

  boats: any = new Array<any>();
  userId: string = '';
  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.route.parent?.paramMap.subscribe(param => {
      this.apollo.query({
        query: USER_BOATS,
        variables: {
          userId: param.get('id')
        }
      }).subscribe(({data}: any) => {
        this.userId = data.user.id;
        this.boats = data.user.boatsByOwnerId?.nodes
      })
    })
  }
}
