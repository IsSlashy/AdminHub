import gql from 'graphql-tag';
export const QUERY_VARIABLE = gql`
  query variable {
    variables {
      nodes {
        accident
        brutJour
        categorie12An
        categorie12Jour
        categorie12Base
        categorie12L
        categorie3An
        categorie3Base
        categorie3Jour
        categorie3L
        categorie6An
        categorie6Base
        categorie6Jour
        categorie6L
        categorie8An
        categorie8Base
        categorie8Jour
        categorie8L
        colDGH
        colEnim
        createdAt
        death
        disease
        meal
        id
        rapatriation
      }
    }
  }
`;
export const update_Variable = gql`
  mutation variables($variableInput: UpdateVariableInput!) {
    updateVariable(input: $variableInput) {
      variable {
        id
      }
    }
  }
`;
