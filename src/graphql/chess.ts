import gql from 'graphql-tag';

export const OFFER_CHESS = gql`
  query offer_chess($done: Boolean) {
    chessOffers(pDone: $done) {
      nodes {
        id
        chessRemuneration
        idRecordChess
        job {
          id
          startDate
          endDate
          ad {
            id
            harborByEndHarbor {
              id
              nameFr
            }
            harborByStartHarbor {
              id
              nameFr
            }
          }
          billing {
            id
            firstname
            lastname
          }
        }
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
  }
`;

export const DETAIL_CHESS = gql`
  query api_chess($offerId: UUID!) {
    nationalities(orderBy: NAME_ASC) {
      nodes {
        name
        id
      }
    }
    places(condition: { type: "country" }, orderBy: NAME_ASC) {
      nodes {
        id
        name
      }
    }
    offer(id: $offerId) {
      id
      chessRemuneration
      clientContract
      sailor {
        id
        firstname
        birthday
        civility
        nationality1 {
          id
          name
        }
        userDetailById {
          id
          phoneNumber
          email
          sailorNumber
          rib
          placeByTaxDomicil {
            id
            name
          }
          personnalAddress {
            id
            formattedAddress
            zipcode
            city {
              id
              name
            }
          }
          lastname
          birthPlace
          birthCountry
          socialSecurityNumber
        }
      }
      job {
        id
        position
        categorie
        startDate
        endDate
        billing {
          id
          boatName
          registrationNumber
          mainDocumentUrl
          clientType
          firstname
          lastname
          siret
          phoneNumber
          email
          model {
            id
            name
          }
          address {
            id
            formattedAddress
          }
          flag {
            id
            name
          }
        }
        ad {
          id
          harborByEndHarbor {
            id
            nameFr
          }
          harborByStartHarbor {
            id
            nameFr
          }
        }
      }
    }
  }
`;

export const UPDATE_SAILOR = gql`
  mutation update_sailor($sailorPayload: UpdateUserInput!) {
    updateUser(input: $sailorPayload) {
      clientMutationId
    }
  }
`;

export const UPDATE_DETAIL_SAILOR = gql`
  mutation update_detail_sailor($sailorPayload: UpdateUserDetailInput!) {
    updateUserDetail(input: $sailorPayload) {
      clientMutationId
    }
  }
`;

export const UPDATE_BILLING = gql`
  mutation upsert_billing($billingPayload: UpsertBillingAdminInput!) {
    upsertBillingAdmin(input: $billingPayload) {
      billing {
        id
      }
    }
  }
`;

export const RECORD_CHESS = gql`
  mutation recordChess($jobId: UUID!) {
    recordChess(input: {jobId: $jobId}) {
      clientMutationId
    }
  }
`;
