import gql from 'graphql-tag';

export const OFFER = gql`
  query detailOffer($offerId: UUID!) {
    offer(id: $offerId) {
      id
      price
      status
      contractType
      onboardFee
      travelFee
      contractAcceptationDateSailor
      contractAcceptationDateClient
      paymentIntentId
      chessRemuneration
      travelFeeExpenses
      transferId
      idRecordChess
      blockedDate
      lateUpdate
      token
      job {
        id
      }
    }
  }
`;
export const OFFER_UPDATE = gql`
  mutation offerUpdate($offerInput: UpdateOfferInput!) {
    updateOffer(input: $offerInput) {
      offer {
        id
      }
    }
  }
`;
export const OFFER_CREATE = gql`
  mutation offerUpdate($offerInput: NewOfferAdminInput!) {
    newOfferAdmin(input: $offerInput) {
      offer {
        id
      }
    }
  }
`;
export const GENERATE_SIGNATURE = gql`
  mutation signature($generateSignature: GenerateSignatureInput!) {
    generateSignature(input: $generateSignature) {
      url
    }
  }
`;
export const INFO_SAILOR = gql`
  query sailor_info($sailorId: UUID!) {
    user(id: $sailorId) {
      id
      firstname
      userDetailById {
        id
        lastname
      }
    }
  }
`;
export const RE_PUBLISH_JOB = gql`
  query rePublishJob($jobId: UUID!) {
    rePublishJob(input: { pJobId: $jobId }) {
      id
    }
  }
`;

export const SEND_EMAIL_OFFER = gql`
  mutation sendEmailPayOffer($payOfferinput: SendEmailPayOfferInput!) {
    sendEmailPayOffer(input: $payOfferinput) {
      boolean
    }
  }
`;

export const JOB = gql`
  query job($jobId: UUID!) {
    job(id: $jobId) {
      chessRemuneration
      initialPrice
      realPrice
    }
  }
`;
