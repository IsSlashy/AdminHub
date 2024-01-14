import gql from "graphql-tag";

export const GET_VALID_DOCUMENTS = gql`
query GetValidDocuments {
    Expired: documents(condition: {status: EXPIRED}) {
    nodes {
      id
      expirationDate
      user {
        id
        firstname
      }
    }
  }
  Valid: documents(condition: {status: VALID}) {
    nodes {
      id
      expirationDate
      user {
        id
        firstname

      }
    }
  }
}
`;
