import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { QUERY_DEVIS, UPDATE_DEVI } from 'src/graphql/dashboard';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent {

  devis: any = new Array<any>();
  commercials: Array<any> = new Array<any>();
  constructor(
    private apollo: Apollo
  ){}

  ngOnInit() {
    this.apollo.query({
      query: QUERY_DEVIS
    }).subscribe(({data}: any) => {
      this.devis = data.currentUser.commercialDevis.nodes;
      this.commercials = data.commercials.nodes;
    });
  }

  updateDevise(e: any, deviId: any) {
    this.apollo.mutate({
      mutation: UPDATE_DEVI,
      variables:{
        deviInput:{
          id: deviId,
          patch: {
            commercialId: e
          }
        }
      }
    }).subscribe(({data}: any) => {
      console.log('la data', data)
    })
  }

}
