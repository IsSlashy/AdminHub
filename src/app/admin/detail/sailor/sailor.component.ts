import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { USER } from 'src/graphql/sailor';

@Component({
  selector: 'app-sailor',
  templateUrl: './sailor.component.html',
  styleUrls: ['./sailor.component.css']
})
export class SailorComponent {
  user:any
  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ){}

  ngOnInit(){
    this.route.paramMap.subscribe(param => {
      this.apollo.query({
        query: USER,
        variables:{
          userId: param.get('id')
        }
      }).subscribe(({data}: any) => {
        this.user = data.user
      })
    })
  }


  copyInformation(){
    const contentToCopy = `${this.user.firstname} ${this.user.userDetailById.lastname}\n\n${this.user.userDetailById.email}\n\n ${this.user.userDetailById.phoneNumber}`;
    navigator.clipboard.writeText(contentToCopy)
      console.log(contentToCopy);
  }
}
