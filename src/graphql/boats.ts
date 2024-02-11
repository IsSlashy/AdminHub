import gql from 'graphql-tag';

export const CREATE_BOATMODEL = gql`
  mutation CREATE_BOATMODEL(
    $createcompletemodelsinput: CreateCompleteModelsInput!
  ) {
    createCompleteModels(input: $createcompletemodelsinput) {
      model {
        id
        name
        enginePower
        boatType
        hullLength
        headroom
        draft
        grossTonnage
      }
    }
  }
`;

export const UPDATE_BOATMODEL = gql`
  mutation UPDATE_BOATMODEL($updatemodelinput: UpdateModelInput!) {
    updateModel(input: $updatemodelinput) {
      model {
        name
        enginePower
        boatType
        hullLength
        headroom
        draft
        grossTonnage
      }
    }
  }
`;

export const GET_BOATMODEL = gql`
  query GET_BOATMODEL($id: UUID!) {
    model(id: $id) {
      id
      name
      enginePower
      boatType
      hullLength
      headroom
      draft
      grossTonnage
    }
  }
`;
