import gql from 'graphql-tag';

export const JOBS_OFFERS = gql`
query jobsOffer($jobId: UUID!) {
  job(id: $jobId) {
    id
    offers(orderBy: SAILOR_ID_ASC) {
      nodes {
        id
        realPrice
        remuneration
        travelFeeExpenses
        status
        sailor {
          id
          firstname
          userDetailById {
            id
            lastname
          }
        }
      }
    }
    jobStatus
  }
}
`;

export const VALIDE_PAYMENT = gql`
  mutation validatePayment($offerId: UUID!) {
    confirmationPayment(input: { offerid: $offerId }) {
      clientMutationId
      boolean
    }
  }
`;
