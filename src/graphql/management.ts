import gql from 'graphql-tag';
export const MANAGEMENT_QUERY = gql`
query management($userCondition: UserCondition) {
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
  users(condition: $userCondition, orderBy: CREATED_AT_DESC) {
    nodes {
      id
      firstname
      preferredConnection
      createdAt
      commercialId
      clientType
      userDetailById {
        lastname
        phoneNumber
        email
        captnBoatApproved
        captnBoatBlacklisted
      }
    }
  }
}
`;

export const DELETE_SAILOR = gql`
  mutation deleteSailor($sailorid:DeleteSailorInput!){
  deleteSailor(input:$sailorid){
    clientMutationId
  }
}`;
export const DELETE_CLIENT = gql`
mutation deleteClient($clientid:DeleteClientInput!){
  deleteClient(input:$clientid){
    clientMutationId
  }
}`;

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($emailInput: ForgotPasswordInput!) {
    forgotPassword(input: $emailInput) {
      uuid
    }
  }
`;

export const CONFIRM_EMAIL = gql`
  mutation confirmEmail($userPayload: ConfirmationEmailInput!) {
    confirmationEmail(input: $userPayload) {
      boolean
    }
  }
`;

export const UPDATE_USER_DETAILS = gql`
  mutation updateUserDetails($userPayload: UpdateUserDetailInput!) {
    updateUserDetail(input: $userPayload) {
      userDetail {
        id
      }
    }
  }
`;

export const UPDATE_USERS = gql`
  mutation updateUserDetails($userPayload: UpdateUserInput!) {
    updateUser(input: $userPayload) {
      user {
        id
      }
    }
  }
`;
