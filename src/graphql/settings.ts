import gql from 'graphql-tag';

export const GET_USER_SETTINGS = gql`
  query GetUserSettings($userId: UUID!) {
    user(id: $userId) {
      id
      setting {
        id
        emailNewMessage
        emailNewMission
        dailyNewMission
        weeklyNewMission
        emailJobAccepted
        emailOfferRefused
        emailNotation
        emailNewOffer
        emailDocumentRefused
        emailJobConfirmed
        emailDocumentExpired
      }
    }
  }`

export const UPDATE_USER_NOTIFICATIONS = gql`
mutation updateNotification($settinginput: UpdateSettingInput!) {
  updateSetting(input: $settinginput) {
    clientMutationId
  }
}
`;
