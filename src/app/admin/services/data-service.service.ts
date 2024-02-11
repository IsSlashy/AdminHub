import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { JOB } from 'src/graphql/job';
import { GENERATE_SIGNATURE, INFO_SAILOR, OFFER_CREATE } from 'src/graphql/offer';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(
    private apollo: Apollo,
  ) { }

  getJobById(jobId: string | null) {
    return this.apollo
      .query({
        query: JOB,
        variables: {
          jobId,
        },
      })
  }

  getSailorInfoById(id: string | null) {
    return this.apollo
      .query({
        query: INFO_SAILOR,
        variables: {
          sailorId: id,
        },
      })
  }

  generateSignature(firstname: string | null, lastname: string | null) {
    return this.apollo
      .mutate({
        mutation: GENERATE_SIGNATURE,
        variables: {
          generateSignature: {
            firstname,
            lastname,
          },
        },
      })
  }

  createOffer(offerForm: any, generateSignature: any) {
    return this.apollo
      .mutate({
        mutation: OFFER_CREATE,
        variables: {
          offerInput: {
            pSailorId: offerForm.value.pSailorId,
            pJobId: offerForm.value.pJobId,
            price: offerForm.value.price * 100,
            chessRemuneration: offerForm.value.chessRemuneration,
            contractType: offerForm.value.contractType,
            onboardFee: offerForm.value.onboardFee,
            travelFee: offerForm.value.travelFee,
            travelFeeExpenses: offerForm.value.travelFeeExpenses,
            sailorSignatureUrl: generateSignature.url,
            sailorSignatureLocation: offerForm.value.location,
          },
        },
      })
  }

}
