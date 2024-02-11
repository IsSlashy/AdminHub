import gql from 'graphql-tag';

export const CREATE_HARBOR = gql`
  mutation CREATE_HARBOR($createharbor: CreateCompleteHarborInput!) {
    createCompleteHarbor(input: $createharbor) {
      harbor {
        id
        lat
        lng
        nameEn
        nameFr
        place {
          id
          name
          parentPlace {
            id
            shortName
            name
          }
        }
      }
    }
  }
`;
export const GET_HARBOR = gql`
  query getHarbor($harborsId: UUID!) {
    harbor(id: $harborsId) {
      id
      lat
      lng
      nameEn
      nameFr
      place {
        id
        name
        parentPlace {
          id
          shortName
          name
        }
      }
    }
  }
`;
export const UPDATE_HARBOR = gql`
  mutation UPDATE_HARBOR($updateharbor: UpdateHarborInput!) {
    updateHarbor(input: $updateharbor) {
      harbor {
        nameFr
        nameEn
        lat
        lng
      }
    }
  }
`;
