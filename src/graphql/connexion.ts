import gql from "graphql-tag";

export const AUTHENTICATE = gql`
  mutation getAuthenticated($email: String!, $password: String!) {
    authenticate(input: {email: $email, password: $password}) {
      accessToken
      preferredConnection
      isAdmin
    }
  }
`
