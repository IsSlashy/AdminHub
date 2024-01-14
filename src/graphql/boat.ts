import gql from 'graphql-tag';

export const BOAT = gql`
  query boat($boatId: UUID!) {
    countries {
      nodes {
        name
        id
      }
    }
    boat(id: $boatId) {
      id
      name
      registrationNumber
      flagId
      model {
        id
        name
      }
      homeHarbor {
        id
        nameFr
      }
      aisUrl
      commercialUsage
      mmsiNumber
      boatPictures{
      nodes{
        id
        resizedImages
      }
    }
    }
  }
`;
export const GENERATE_URL = gql`
  mutation generate_url($keyInput: GeneratePresignedPostInput!) {
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
export const DELETE_BOAT_PICTURE = gql`
  mutation deleteBOatPicture($boatPicture:DeleteBoatPictureInput!){
    deleteBoatPicture(input:$boatPicture){
      clientMutationId
    }
  }
`
export const UPDATE_BOAT = gql`
mutation update_boat($boatPatch:  UpdateBoatInput!) {
  updateBoat(input: $boatPatch){
  	boat{
    	id
    }
  }
}
`;
