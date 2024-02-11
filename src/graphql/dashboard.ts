import gql from 'graphql-tag';
import { CANCEL_APPLICATION } from './chat';

export const CURRENT_ADMIN = gql`
  query currentAdmin {
    currentUser {
      id
      firstname
      userDetailById {
        id
        lastname
      }
    }
  }
`;

export const COMMERCIAL_JOBS = gql`
  query commercial_jobs($jobStatus: [JobStatusEnum]) {
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
    currentUser {
      commercialJobs(status: $jobStatus) {
        nodes {
          id
          startDate
          endDate
          jobStatus
          position
          createdAt
          commercial1 {
            id
            firstname
            userDetailById {
              id
              lastname
            }
          }
          billing {
            id
            firstname
            lastname
          }
          ad {
            id
            boat {
              id
              owner {
                id
                firstname
                userDetailById {
                  id
                  lastname
                }
              }
              model {
                id
                name
              }
            }
            harborByStartHarbor {
              id
              nameFr
            }
            harborByEndHarbor {
              id
              nameFr
            }
          }
        }
      }
    }
  }
`;

export const QUERY_DEVIS = gql`
  query devis {
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
    currentUser {
      commercialDevis {
        totalCount
        nodes {
          id
          adType
          clientRegistered
          startDate
          endDate
          position
          firstName
          lastName
          email
          phoneNumber
          clientType
          language
          model
          hulllength
          distance
          duration
          price
          commercialSupport1
          commercial {
            id
            firstname
            userDetailById {
              id
              lastname
            }
          }
          status
          createdAt
          startHarbor {
            id
            nameFr
          }
          endHarbor {
            id
            nameFr
          }
        }
      }
    }
  }
`;
export const CANCEL_OFFER_MUTATION = gql`
  mutation cancelOffer($jobId: String!) {
    cancelOffer(jobId: $jobId) {
      id
      status
    }
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
export const UPDATE_DEVI = gql`
  mutation updateJob($deviInput: UpdateDeviInput!) {
    updateDevi(input: $deviInput) {
      devi {
        id
      }
    }
  }
`;

// GET DOCS NUMBER
export const GET_DOCUMENT_NUMBER = gql`
  query getDocNumber {
    documents(condition: { status: WAITING }) {
      totalCount
    }
  }
`;
export const GET_RESUMES_NUMBER = gql`
  query CVQuery {
    resumes(orderBy: CREATED_AT_DESC, condition: { status: WAITING }) {
      totalCount
    }
  }
`;
