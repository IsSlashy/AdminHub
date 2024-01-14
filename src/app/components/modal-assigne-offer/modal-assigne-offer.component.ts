import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Apollo } from 'apollo-angular';
import { JOBS_OFFERS, VALIDE_PAYMENT } from 'src/graphql/modal';

@Component({
  selector: 'app-modal-assigne-offer',
  templateUrl: './modal-assigne-offer.component.html',
  styleUrls: ['./modal-assigne-offer.component.css'],
})
export class ModalAssigneOfferComponent {
  offers: Array<any> = new Array();
  offer: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalAssigneOfferComponent>,
    private apollo: Apollo
  ) {
    const jobId = data.jobId;

    this.apollo
    .query({
      query: JOBS_OFFERS,
      variables: {
        jobId: jobId,
      },
    })
    .subscribe(({ data }: any) => {
      console.log(data);
      this.offers = data.job.offers.nodes;
    });
  }

  assigne() {
    if (!this.offer) {
        console.error('Aucune offre n\'a été sélectionnée!');
        return;
    }

    this.apollo
      .mutate({
        mutation: VALIDE_PAYMENT,
        variables: {
          offerId: this.offer.id,

        },
      })
      .subscribe(({ data, loading }: any) => {
        this.onNoClick();
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectOffer(event: any) {
    this.offer = event.value;
  }
}
