import gql from 'graphql-tag';

export const ADMIN_CONVERSATIONS = gql`
  query conversationsAdmin(
    $pJobId: UUID
    $pUserId: UUID
    $pJobStatus: [JobStatusEnum]
    $pCommercial: UUID
    $first: Int
    $offset: Int
  ) {
    commercials {
      nodes {
        id
        firstname
      }
    }
    conversationsAdmin(
      pJobId: $pJobId
      pUserId: $pUserId
      pJobStatus: $pJobStatus
      pCommercial: $pCommercial
      first: $first
      offset: $offset
    ) {
      nodes {
        id
        sailor {
          id
          firstname
          avatarUrl
          userDetailById {
            lastname
          }
        }
        job {
          id
          ad {
            id
            boat {
              id
              owner {
                id
                avatarUrl
                firstname
              }
            }
          }
        }
        lastMessage {
          id
          isSender
          content
          createdAt
          userId
          type
          user {
            preferredConnection
          }
        }
      }
    }
  }
`;

export const ADMIN_CONVERSATION = gql`
  query MyQuery($conversationInput: UUID!) {
    conversation(id: $conversationInput) {
      id
      archive
      messagesList(orderBy: CREATED_AT_ASC) {
        __typename
        id
        isSender
        content
        type
        createdAt
        status
        conversationId
        user {
          __typename
          id
          avatarUrl
          firstname
          createdAt
        }
        offer {
          id
          realPrice
          status
          travelFeeExpenses
          contractType
        }
      }
      sailor {
        id
        firstname
        nauticalExperience
        avatarUrl
        resumes{
            nodes{
              id
              url
            }
          }
        sailorSpokenLanguages {
          nodes {
            userId
            language {
              id
              isoCode
            }
          }
        }
        userDetailById {
          lastname
          email
          phoneNumber
        }
      }
      job {
        id
        initialPrice
        realPrice
        price
        commissionRate
        remuneration
        startDate
        endDate
        jobStatus
        billing {
          id
          firstname
          lastname
          email
          phoneNumber
        }
        ad {
          id
          spokenLanguagesByAdsId {
            nodes {
              adsId
              language {
                id
                isoCode
              }
            }
          }
          harborByStartHarbor {
            id
            nameFr
          }
          harborByEndHarbor {
            id
            nameFr
          }
          adType
          boat {
            id
            model {
              id
              boatType
            }
            boatPictures {
              nodes {
                url
              }
            }
            owner {
              id
              avatarUrl
              firstname
              userDetailById {
                lastname
                phoneNumber
                email
              }
            }
          }
        }
      }
    }
  }
`;

export const SUBSCRIPTION_MESSAGE = gql`
  subscription MySubscription {
    messageSent {
      message {
        __typename
        id
        isSender
        content
        type
        createdAt
        status
        conversationId
        user {
          __typename
          id
          avatarUrl
          firstname
          createdAt
        }
        offer {
          id
          realPrice
          status
          travelFeeExpenses
        }
      }
      event
    }
  }
`;

export const ADMIN_MAIL_OFFER = gql`
  query adminMailOffer($pConvId: UUID!, $pOfferId: UUID!) {
    adminSendMailOffer(pConvId: $pConvId, pOfferId: $pOfferId)
  }
`;

export const SEND_MESSAGE_ADMIN = gql`
  mutation MyMutation($newmessage: SendMessageAdminInput!) {
    sendMessageAdmin(input: $newmessage) {
      message {
        __typename
        id
        isSender
        content
        type
        createdAt
        status
        conversationId
        user {
          __typename
          id
          avatarUrl
          firstname
          createdAt
        }
        offer {
          id
          realPrice
          status
          travelFeeExpenses
        }
      }
    }
  }
`;

export const ARCHIVE = gql`
  mutation archiveConversation($convId: ArchiveConversationInput!) {
    archiveConversation(input: $convId) {
      conversation {
        id
      }
    }
  }
`;

export const ARCHIVE_MESSAGE = gql`
  mutation archiveMsg($deleteInput: ArchiveMessageInput!) {
    archiveMessage(input: $deleteInput) {
      clientMutationId
      message {
        __typename
        id
        isSender
        content
        type
        createdAt
        status
        conversationId
        user {
          __typename
          id
          avatarUrl
          firstname
        }
      }
    }
  }
`;

export const CANCEL_APPLICATION = gql`
  mutation cancelOffer($cancelOfferInput: CancelOfferInput!) {
    cancelOffer(input: $cancelOfferInput) {
      offer {
        id
      }
    }
  }
`;
