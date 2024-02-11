import gql from 'graphql-tag';

export const STRUCTURE = gql`
  query structure($structure: UUID!) {
    job(id: $structure) {
      structures {
        nodes {
          name
        }
      }
    }
  }
`;
