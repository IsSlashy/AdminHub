import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {
  GENERATE_SIGNATURE,
  INFO_SAILOR,
  JOB,
  OFFER_CREATE,
} from 'src/graphql/offer';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css'],
})
export class NewOfferComponent {
  @ViewChild(ModalConfirmedComponent) modalConfirmed!: ModalConfirmedComponent;

  offerForm: FormGroup = this.formBuilder.group({
    pSailorId: [null, []],
    sailorfirstname: [null, []],
    sailorlastname: [null, []],
    location: ['Paris', []],
    pJobId: [null, []],
    price: [null, []],
    chessRemuneration: [null, []],
    contractType: [null, []],
    onboardFee: [null, []],
    travelFee: [null, []],
    travelFeeExpenses: [null, []],
  });
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.offerForm.patchValue({
        pSailorId: params.get('sailorId'),
        pJobId: params.get('jobId'),
      });
      this.loadSkipper(null);
      this.apollo
        .query({
          query: JOB,
          variables: {
            jobId: params.get('jobId'),
          },
        })
        .subscribe(({ data }: any) => {
          console.log(data);
          this.offerForm.patchValue({
            price: data.job.realPrice,
            chessRemuneration: data.job?.chessRemuneration,
          });
        });
    });

    this.offerForm.get('pSailorId')?.valueChanges.subscribe((val) => {
      this.loadSkipper(val);
    });
  }

  loadSkipper(val: string | null) {
    const id = val ? val : this.offerForm.value.pSailorId;
    if (id === null) return;
    this.apollo
      .query({
        query: INFO_SAILOR,
        variables: {
          sailorId: id,
        },
      })
      .subscribe(({ data }: any) => {
        console.log(data);
        this.offerForm.patchValue({
          sailorfirstname: data.user.firstname,
          sailorlastname: data.user.userDetailById.lastname,
        });
      });
  }

  createOffer() {
    this.loading = true;
    this.apollo
      .mutate({
        mutation: GENERATE_SIGNATURE,
        variables: {
          generateSignature: {
            firstname: this.offerForm.value.sailorfirstname,
            lastname: this.offerForm.value.sailorlastname,
          },
        },
      })
      .subscribe(
        ({ data }: any) => {
          this.apollo
            .mutate({
              mutation: OFFER_CREATE,
              variables: {
                offerInput: {
                  pSailorId: this.offerForm.value.pSailorId,
                  pJobId: this.offerForm.value.pJobId,
                  price: this.offerForm.value.price * 100,
                  chessRemuneration: this.offerForm.value.chessRemuneration,
                  contractType: this.offerForm.value.contractType,
                  onboardFee: this.offerForm.value.onboardFee,
                  travelFee: this.offerForm.value.travelFee,
                  travelFeeExpenses: this.offerForm.value.travelFeeExpenses,
                  sailorSignatureUrl: data.generateSignature.url,
                  sailorSignatureLocation: this.offerForm.value.location,
                },
              },
            })
            .subscribe(
              ({ data }: any) => {
                this.router.navigateByUrl(
                  'admin/offer/' + data.newOfferAdmin.offer.id
                );
              },
              (err) => {
                this.modalConfirmed.modalRejected();
                this.loading = false;
              }
            );
        },
        (err) => {
          this.modalConfirmed.modalRejected();
          this.loading = false;
        }
      );
  }
}
