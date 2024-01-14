import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CLIENT_PAIMENTS } from 'src/graphql/client';

@Component({
  selector: 'app-paiments',
  templateUrl: './paiments.component.html',
  styleUrls: ['./paiments.component.css']
})
export class PaimentsComponent {

  jobs: any;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ){}

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(param => {
      this.apollo.query({
        query: CLIENT_PAIMENTS,
        variables:{
          userId: param.get('id')
        }
      }).subscribe(({data}: any) => {
        this.jobs = data.user.jobsAsClientPaid.nodes
        console.log('les paiments', this.jobs);

      })
    })
  }

}
