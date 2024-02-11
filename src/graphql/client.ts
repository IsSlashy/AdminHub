import gql from 'graphql-tag';

export const USER = gql`
  query sailor_personal($userId: UUID!) {
    user(id: $userId) {
      id
      firstname
      userDetailById {
        lastname
        phoneNumber
      }
    }
  }
`;

export const USER_BOATS = gql`
  query user_boats($userId: UUID!) {
    user(id: $userId) {
      id
      boatsByOwnerId {
        nodes {
          id
          name
          boatPictures {
            nodes {
              id
              url
            }
          }
          model {
            id
            name
            boatType
          }
        }
      }
    }
  }
`;

export const PUBLISHED = gql`
  query userJobs($userId: UUID!) {
    user(id: $userId) {
      adsAsClientPaid {
        totalCount
      }
      adsAsClientConfirmed {
        totalCount
      }
      adsAsClientArchived {
        totalCount
      }
      adsAsClient {
        totalCount
        nodes {
          id
          startDate
          endDate
          adType
          status
          harborByStartHarbor {
            id
            nameFr
            place {
              id
              shortName
              parentPlace {
                id
                shortName
              }
            }
          }
          harborByEndHarbor {
            id
            nameFr
            place {
              id
              parentPlace {
                id
                shortName
              }
              shortName
            }
          }
          boat {
            id
            name
            boatPictures {
              nodes {
                id
                url
                resizedImages
              }
            }
            model {
              boatType
            }
          }
          jobs {
            totalCount
            nodes {
              jobStatus
              id
              realPrice
              position
              finalOffer {
                id
                sailor {
                  id
                  resizedImages
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const PAID = gql`
  query userJobs($userId: UUID!) {
    user(id: $userId) {
      adsAsClient {
        totalCount
      }
      adsAsClientConfirmed {
        totalCount
      }
      adsAsClientArchived {
        totalCount
      }
      adsAsClientPaid {
        totalCount
        nodes {
          id
          startDate
          endDate
          adType
          status
          harborByStartHarbor {
            id
            nameFr
            place {
              id
              shortName
              parentPlace {
                id
                shortName
              }
            }
          }
          harborByEndHarbor {
            id
            nameFr
            place {
              id
              parentPlace {
                id
                shortName
              }
              shortName
            }
          }
          boat {
            id
            name
            boatPictures {
              nodes {
                id
                url
                resizedImages
              }
            }
            model {
              boatType
            }
          }
          jobs {
            totalCount
            nodes {
              jobStatus
              id
              realPrice
              position
              finalOffer {
                id
                sailor {
                  id
                  resizedImages
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const CONFIRMED = gql`
  query userJobs($userId: UUID!) {
    user(id: $userId) {
      adsAsClientPaid {
        totalCount
      }
      adsAsClient {
        totalCount
      }
      adsAsClientArchived {
        totalCount
      }
      adsAsClientConfirmed {
        totalCount
        nodes {
          id
          startDate
          endDate
          adType
          status
          harborByStartHarbor {
            id
            nameFr
            place {
              id
              shortName
              parentPlace {
                id
                shortName
              }
            }
          }
          harborByEndHarbor {
            id
            nameFr
            place {
              id
              parentPlace {
                id
                shortName
              }
              shortName
            }
          }
          boat {
            id
            name
            boatPictures {
              nodes {
                id
                url
                resizedImages
              }
            }
            model {
              boatType
            }
          }
          jobs {
            totalCount
            nodes {
              jobStatus
              id
              realPrice
              position
              finalOffer {
                id
                sailor {
                  id
                  resizedImages
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const CANCELED = gql`
  query userJobs($userId: UUID!) {
    user(id: $userId) {
      adsAsClientPaid {
        totalCount
      }
      adsAsClientConfirmed {
        totalCount
      }
      adsAsClient {
        totalCount
      }
      adsAsClientArchived {
        totalCount
        nodes {
          id
          startDate
          endDate
          adType
          status
          harborByStartHarbor {
            id
            nameFr
            place {
              id
              shortName
              parentPlace {
                id
                shortName
              }
            }
          }
          harborByEndHarbor {
            id
            nameFr
            place {
              id
              parentPlace {
                id
                shortName
              }
              shortName
            }
          }
          boat {
            id
            name
            boatPictures {
              nodes {
                id
                url
                resizedImages
              }
            }
            model {
              boatType
            }
          }
          jobs {
            totalCount
            nodes {
              jobStatus
              id
              realPrice
              position
              finalOffer {
                id
                sailor {
                  id
                  resizedImages
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const GENERATE_URL = gql`
  mutation generateUrl($keyInput: GeneratePresignedPostInput!) {
    generatePresignedPost(input: $keyInput) {
      url
      fields
    }
  }
`;
export const USER_CLIENT = gql`
  query client($userId: UUID!) {
    nationalities(orderBy: NAME_ASC) {
      nodes {
        id
        name
      }
    }
    languages(orderBy: NAME_ASC) {
      nodes {
        id
        name
      }
    }
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
    user(id: $userId) {
      id
      firstname
      birthday
      civility
      nationality1Id
      nativeLanguageId
      avatarUrl
      favoriteCurrency
      userStatus
      pipeDriveId
      commissionRate
      commercialId
      userDetailById {
        id
        lastname
        phoneNumber
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation update_user_client($userPayload: UpdateUserInput!) {
    updateUser(input: $userPayload) {
      user {
        id
      }
    }
  }
`;
export const UPDATE_USER_DETAIL = gql`
  mutation update_user_detail_client(
    $userDetailPayload: UpdateUserDetailInput!
  ) {
    updateUserDetail(input: $userDetailPayload) {
      userDetail {
        id
      }
    }
  }
`;
export const CLIENT_PAIMENTS = gql`
  query clientPaiments($userId: UUID!) {
    user(id: $userId) {
      jobsAsClientPaid {
        nodes {
          id
          realPrice
          position
          startDate
          endDate
          finalOffer {
            id
            contractAcceptationDateClient
          }
          ad {
            id
            adType
          }
        }
      }
    }
  }
`;
export const USER_AVATAR_UPLOAD = gql`
  mutation user_pfp_upload($pfpupload: UpdateUserInput!) {
    updateUser(input: $pfpupload) {
      user {
        id
        avatarUrl
      }
    }
  }
`;
