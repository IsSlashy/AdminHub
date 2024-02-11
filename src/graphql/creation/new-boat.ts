import gql from 'graphql-tag';
export const CREATE_BOAT = gql`
  mutation CreateBoat($boatinput: CreateCompleteBoatInput!) {
    createCompleteBoat(input: $boatinput) {
      boat {
        id
        name
        registrationNumber
      }
    }
  }
`;
export const GENERATE_URL = gql`
  mutation GenerateUrl($keyInput: GeneratePresignedPostInput!) {
    generatePresignedPost(input: $keyInput) {
      url
      fields
    }
  }
`;

export const CREATE_BOAT_PICTURE = gql`
  mutation CreateBoatPicture($boatPictureInput: CreateBoatPictureInput!) {
    createBoatPicture(input: $boatPictureInput) {
      boatPicture {
        id
        url
      }
    }
  }
`;
export const DATA_BOAT = gql`
  query DataBoat {
    equipmentsTypes {
      nodes {
        name
        id
      }
    }
    countries {
      nodes {
        name
        id
      }
    }
  }
`;
