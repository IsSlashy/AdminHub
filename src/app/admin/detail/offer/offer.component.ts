import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import {
  OFFER,
  OFFER_UPDATE,
  RE_PUBLISH_JOB,
  SEND_EMAIL_OFFER,
} from 'src/graphql/offer';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
})
export class OfferComponent {
  @ViewChild(ModalConfirmedComponent) modalConfirmed!: ModalConfirmedComponent;

  offerForm: FormGroup = this.formBuilder.group({
    price: [null, []],
    chessRemuneration: [null, []],
    status: [null, []],
    contractType: [null, []],
    onboardFee: [null, []],
    travelFee: [null, []],
    travelFeeExpenses: [null, []],
    idRecordChess: [null, []],
    contractAcceptationDateSailor: [null, []],
    contractAcceptationDateClient: [null, []],
    paymentIntentId: [null, []],
    transferId: [null, []],
    blockedDate: [null, []],
    lateUpdate: [null, []],
    token: [null, []],
  });

  offerId: string | null = '';
  offer: any;
  location: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      this.offerId = param.get('id');
      this.apollo
        .watchQuery({
          query: OFFER,
          variables: {
            offerId: this.offerId,
          },
        })
        .valueChanges.subscribe(({ data }: any) => {
          this.offerForm.patchValue({
            price: data.offer.price / 100,
            status: data.offer.status,
            contractType: data.offer.contractType,
            onboardFee: data.offer.onboardFee,
            travelFee: data.offer.travelFee,
            contractAcceptationDateSailor:
              data.offer.contractAcceptationDateSailor,
            contractAcceptationDateClient:
              data.offer.contractAcceptationDateClient,
            paymentIntentId: data.offer.paymentIntentId,
            chessRemuneration: data.offer.chessRemuneration,
            travelFeeExpenses: data.offer.travelFeeExpenses,
            transferId: data.offer.transferId,
            idRecordChess: data.offer.idRecordChess,
            blockedDate: data.offer.blockedDate,
            lateUpdate: data.offer.lateUpdate,
            token: data.offer.token,
          });
          this.offer = data.offer;
        });
    });
  }

  copyUrlContract() {
    const contentToCopy = 'https://captnboat.com/fr/contrat-client?id='+ this.offer.id + '&token=' + this.offer.token;
    console.log(contentToCopy);
    navigator.clipboard.writeText(contentToCopy);
  }

  sendEmailPayOffer() {
    this.apollo
      .mutate({
        mutation: SEND_EMAIL_OFFER,
        variables: {
          payOfferinput: {
            offerId: this.offerId,
          },
        },
      })
      .subscribe(
        ({ data }: any) => {
          this.modalConfirmed.openModal();
        },
        (err: any) => {
          console.log(err);
          this.modalConfirmed.modalRejected();
        }
      );
  }

  openWindow(string: string) {
    window.open(string + this.offer.id);
  }
  // annuler et republier le job
  rePublish() {
    this.apollo
      .mutate({
        mutation: RE_PUBLISH_JOB,
        variables: {
          pJobId: this.offer.job.id,
        },
        refetchQueries: [
          {
            query: OFFER,
            variables: {
              jobId: this.offerId,
            },
          },
        ],
      })
      .subscribe(
        ({ data }: any) => {
          this.modalConfirmed.openModal();
        },
        (err: any) => {
          console.log(err);
          this.modalConfirmed.modalRejected();
        }
      );
  }
  goBack() {
    this.location.back();
  }
  updateOffer() {
    this.apollo
      .mutate({
        mutation: OFFER_UPDATE,
        refetchQueries: [
          { query: OFFER, variables: { offerId: this.offerId } },
        ],
        variables: {
          offerInput: {
            id: this.offerId,
            patch: {
              price: this.offerForm.value.price * 100,
              status: this.offerForm.value.status,
              contractType: this.offerForm.value.contractType,
              onboardFee: this.offerForm.value.onboardFee,
              travelFee: this.offerForm.value.travelFee,
              contractAcceptationDateSailor:
                this.offerForm.value.contractAcceptationDateSailor,
              contractAcceptationDateClient:
                this.offerForm.value.contractAcceptationDateClient,
              paymentIntentId: this.offerForm.value.paymentIntentId,
              chessRemuneration: this.offerForm.value.chessRemuneration,
              travelFeeExpenses: this.offerForm.value.travelFeeExpenses,
              transferId: this.offerForm.value.transferId,
              idRecordChess: this.offerForm.value.idRecordChess,
              blockedDate: this.offerForm.value.blockedDate,
              lateUpdate: this.offerForm.value.lateUpdate,
            },
          },
        },
      })
      .subscribe(
        ({ data }: any) => {
          this.modalConfirmed.openModal();
        },
        (err: any) => {
          console.log(err);
          this.modalConfirmed.modalRejected();
        }
      );
  }
}
