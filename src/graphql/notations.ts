import gql from 'graphql-tag';

export const ALL_NOTATIONS = gql`
  query allNotations($jobId: UUID, $userId: UUID) {
    notations(condition: { jobId: $jobId, userId: $userId }) {
      nodes {
        id
        comment
        averageNote
        createdAt
        user {
          firstname
          userDetailById {
            lastname
          }
        }
        job {
          id
          startDate
          endDate
          billing {
            id
            firstname
            lastname
          }
          ad {
            id
            adType
            ownerIdClient
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
  }
`;

export const NOTATION_Query = gql`
  query NOTATION_Query($notationid: UUID!) {
    notation(id: $notationid) {
      id
      noteSkill
      noteRespect
      noteCommunication
      comment
    }
  }
`;

export const NOTATION_Mutation = gql`
  mutation NOTATION_Mutation($notationinput: UpdateNotationInput!) {
    updateNotation(input: $notationinput) {
      notation {
        noteSkill
        noteRespect
        noteCommunication
        comment
      }
    }
  }
`;
