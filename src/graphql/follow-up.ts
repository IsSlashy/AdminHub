import gql from 'graphql-tag';

export const SEND_MAIL_OPPORTUNITY = gql`
  query sendMail($pJobId: UUID!) {
    sendOppotunityMail(pJobId: $pJobId)
  }
`;
export const UPDATE_JOB = gql`
  mutation updateJob($jobInput: UpdateJobInput!) {
    updateJob(input: $jobInput) {
      job {
        id
      }
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
export const CREATE_BILLING = gql`
  mutation CreateBillingInput($CreateBillingInput: CreateBillingInput!) {
    createBilling(input: $CreateBillingInput) {
      clientMutationId
    }
  }
`;
export const CANCEL_JOB = gql`
  mutation cancelJob($jobInput: CancelJobInput!) {
    cancelJob(input: $jobInput) {
      clientMutationId
    }
  }
`;
export const GET_JOBS = gql`
  query GetJobs($ended: Boolean!, $commercial: UUID, $status: [JobStatusEnum]) {
    commercials {
      nodes {
        id
        firstname
        userDetailById {
          id
          lastname
        }
      }
    }
    adminJobs(ended: $ended, pCommercialId: $commercial, pJobStatus: $status) {
      nodes {
        id
        jobStatus
        startDate
        endDate
        commissionRate
        createdAt
        contractType
        position
        commercial1 {
          id
        }
        notations {
          nodes {
            averageNote
          }
          totalCount
        }
        conversations {
          totalCount
        }
        billing {
          id
          jobId
          firstname
          lastname
          clientStatus
          phoneNumber
          email
        }
        conversations {
          totalCount
        }
        initialPrice
        finalOffer {
          id
          sailor {
            id
            firstname
            userDetailById {
              id
              lastname
            }
          }
          status
          fee
          contractType
        }
        ad {
          id
          adType
          ownerIdClient
          harborByStartHarbor {
            id
            nameFr
          }
          harborByEndHarbor {
            id
            nameFr
          }
          boat {
            id
            model {
              id
              boatType
              name
            }
            ownerId
            owner {
              firstname
              id
              userDetailById {
                id
                lastname
                phoneNumber
                email
              }
            }
          }
        }
      }
    }
  }
`;
export const VALIDATE_JOB = gql`
  mutation validate($jobId: UUID!) {
    validateJob(input: { pJobId: $jobId }) {
      job {
        id
      }
    }
  }
`;
export const UPDATE_OFFER = gql`
  mutation updateOffer($inputOffer: UpdateOfferInput!) {
    updateOffer(input: $inputOffer) {
      offer {
        id
        status
      }
    }
  }
`;
