import gql from 'graphql-tag';

export const USER = gql`
  query sailor_personal($userId: UUID!) {
    user(id: $userId) {
      id
      firstname
      userPreference{
        positions{
          position
        }
      }
      userDetailById {
        lastname
        phoneNumber
        email
      }
    }
  }
`;
export const SAILOR_PERSONNAL = gql`
  query sailor_personal($userId: UUID!) {
  nationalities(orderBy: NAME_ASC) {
    nodes {
      name
      id
    }
  }
  languages(orderBy: NAME_ASC) {
    nodes {
      name
      id
    }
  }
  countries {
    nodes {
      name
      id
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
    existsCancelRequest
    firstname
    civility
    birthday
    userStatus
    favoriteCurrency
    resizedImages
    nationality1Id
    nativeLanguageId
    userStatus
    commercialId
    userDetailById {
      id
      email
      lastname
      phoneNumber
      sailorNumber
      birthCountry
      birthPlace
      birthName
      rib
      socialSecurityNumber
      taxDomicil
      personnalAddress {
        id
        formattedAddress
      }
    }
  }
  users {
    nodes {
      avatarUrl
    }
  }
}

`;

export const SAILOR_DOCS = gql`
  query sailor_docs($userId: UUID!) {
    user(id: $userId) {
      id
      userDetailById {
        sailorId
      }
      structures{
        nodes{
          id
          name
        }
      }
      resumes(orderBy: CREATED_AT_DESC) {
        totalCount
        nodes {
          id
          url
          status
        }
      }
      documents {
        nodes {
          id
          serial
          version
          nationality {
            id
            name
            shortName
          }
          expirationDate
          documentUrl
          status
          missingTrainings {
            radio
            medical
            security
            certificat
            other
            commercial
            mention
          }
          documentType {
            id
            expiration
            country {
              id
              name
              shortName
            }
            name
            type
          }
        }
      }
    }
    documentTypes(orderBy: NAME_ASC) {
      nodes {
        id
        name
        expiration
        country {
          id
          name
          shortName
        }
      }
    }
  }
`;

export const GENERATE_URL = gql`
  mutation generate_url($keyInput: GeneratePresignedPostInput!) {
    generatePresignedPost(input: $keyInput) {
      url
      fields
    }
  }
`;

export const ADD_DOCUMENT = gql`
  mutation add_document($documentInput: AddDocumentInput!) {
    addDocument(input: $documentInput) {
      document {
        id
        serial
        version
        expirationDate
        documentUrl
        status
        sailorId
        documentType {
          id
          name
          type
        }
      }
    }
  }
`;
export const VALIDE_DOCUMENT = gql`
mutation ValideDoc($validedocument:  ValidateDocumentInput!) {
  validateDocument(input: $validedocument) {
    clientMutationId
    document {
      id
      status
    }
  }
}
`
export const UPLOAD_RESUME = gql`
  mutation upload_resume($inputresume: CreateResumeInput!) {
    createResume(input: $inputresume) {
      resume {
        id
        url
        status
      }
    }
  }
`;

export const DELETE_DOCUMENT = gql`
  mutation delete_document($documentId: ArchiveDocumentInput!) {
    archiveDocument(input: $documentId) {
      clientMutationId
      document {
        id
      }
    }
  }
`;

export const UPDATE_SAILOR = gql`
  mutation update_sailor($sailorPayload: UpdateUserInput!) {
    updateUser(input: $sailorPayload) {
      clientMutationId
    }
  }
`;

export const UPDATE_DETAIL_SAILOR = gql`
  mutation update_detail_sailor($sailorPayload: UpdateUserDetailInput!) {
    updateUserDetail(input: $sailorPayload) {
      clientMutationId
    }
  }
`;

export const SAILOR_PROFIL = gql`
  query sailor_profil($userId: UUID!) {
    languages(orderBy: NAME_ASC) {
      nodes {
        id
        name
      }
    }
    visaTypes {
      nodes {
        id
        name
      }
    }
    user(id: $userId) {
      id
      firstname
      resizedImages
      profileDescription
      localisation
      sailorSpokenLanguages {
        nodes {
          language {
            id
            name
          }
        }
      }
      placeByLocalisation {
        id
        name
        parentPlace {
          id
          name
          shortName
        }
      }
      nauticalExperience
      covidVaccinated
      tatoo
      smoker
      userVisas {
        nodes {
          id
          visa {
            id
            name
          }
        }
      }
      userPreference {
        id
        minBoatLength
        maxBoatLength
        maxPassenger
        userPreferedContractType {
          id
          contractType
        }
        userPreferedPositions {
          nodes {
            id
            position
          }
        }
        userPreferedAdTypes {
          nodes {
            id
            adType
          }
        }
        userPreferedBoatTypes {
          nodes {
            id
            boatType
          }
        }
      }
    }
  }
`;

export const UPSERT_PREF = gql`
  mutation upsertPref($upsertInput: UpsertPreferencesInput!) {
    upsertPreferences(input: $upsertInput) {
      clientMutationId
    }
  }
`;

export const UPSERT_VISAS = gql`
  mutation visas($visaInput: UpsertVisaInput!) {
    upsertVisa(input: $visaInput) {
      boolean
    }
  }
`;

export const UPDATE_LANGAGE = gql`
  mutation Mutation($langageInput: UpsertSailorSpokenLanguagesInput!) {
    upsertSailorSpokenLanguages(input: $langageInput) {
      clientMutationId
    }
  }
`;

export const OPPORTUNITIES = gql`
  query Opportunities($userId: UUID!) {
    user(id: $userId) {
      id
      userStatus
      jobsAsSailorAssigned {
        totalCount
      }
      jobsAsSailorConfirmed {
        totalCount
      }
      sailorJobsCandidated {
        totalCount
      }
      jobsFavorites {
        totalCount
      }
      jobsForUser {
        totalCount
        nodes {
          id
          initialPrice
          remuneration
          jobStatus
          conversationExistSailor
          position
          startDate
          endDate
          price
          monthlyRemuneration
          conversations(
      condition: { sailorId:$userId}
    ) {
      nodes {
        id
        lastOffer {
          status
          id
        }
      }
    }
          offerPending {
            id
          }
          ad {
            id
            adType
            boat {
              id
              flag {
                id
                shortName
              }
              model {
                id
                name
                boatType
              }
              boatPictures(first: 1) {
                nodes {
                  id
                  url
                }
              }
            }
            harborByEndHarbor {
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
          }
        }
      }
    }
  }
`;
export const CANCEL_OFFER = gql`
mutation canceloffer($cancelofferinput: CancelOfferInput!) {
  cancelOffer(input: $cancelofferinput) {
    offer {
      status
    }
  }
}
`;

export const CANDIDATE_JOB = gql`
  query application($userId: UUID!) {
    user(id: $userId) {
      id
      userStatus
      jobsForUser {
        totalCount
      }
      jobsAsSailorAssigned {
        totalCount
      }
      jobsFavorites {
        totalCount
      }
      sailorJobsCandidated {
        totalCount
        nodes {
          id
          initialPrice
          remuneration
          jobStatus
          price
          conversationExistSailor
          position
          startDate
          endDate
          monthlyRemuneration
          offerPending {
            id
          }
          ad {
            id
            adType
            boat {
              id
              flag {
                id
                shortName
              }
              model {
                id
                boatType
                hullType
                name
              }
              boatPictures(first: 1) {
                nodes {
                  id
                  url
                }
              }
            }
            harborByEndHarbor {
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
          }
        }
      }
    }
  }
`;

export const GET_SKIPPER_CONFIRMED_JOBS = gql`
  query confirmedJobs($userId: UUID!) {
    user(id: $userId) {
      id
      userStatus
      jobsForUser {
        totalCount
      }
      jobsAsSailorAssigned {
        totalCount
      }
      jobsFavorites {
        totalCount
      }
      jobsAsSailorConfirmed {
        totalCount
        nodes {
          id
          initialPrice
          remuneration
          jobStatus
          price
          conversationExistSailor
          position
          startDate
          endDate
          monthlyRemuneration
          finalOffer {
            id
            sailorContract
          }
          offerPending {
            id
          }
          ad {
            id
            adType
            boat {
              id
              flag {
                shortName
              }
              model {
                id
                name
                boatType
              }
              boatPictures(first: 1) {
                nodes {
                  id
                  url
                }
              }
            }
            harborByEndHarbor {
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
          }
        }
      }
    }
  }
`;

export const GET_FAVORITES_JOBS = gql`
  query favoritesJob($userId: UUID!) {
    user(id: $userId) {
      id
      userStatus
      jobsForUser {
        totalCount
      }
      jobsAsSailorAssigned {
        totalCount
      }
      jobsFavorites {
        totalCount
        nodes {
          id
          initialPrice
          remuneration
          jobStatus
          price
          conversationExistSailor
          position
          startDate
          endDate
          monthlyRemuneration
          offerPending {
            id
          }
          ad {
            id
            adType
            boat {
              id
              flag {
                shortName
              }
              model {
                id
                boatType
              }
              boatPictures(first: 1) {
                nodes {
                  id
                  url
                }
              }
            }
            harborByEndHarbor {
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
          }
        }
      }
    }
  }
`;

export const GET_SKIPPER_ASSIGNED_JOBS = gql`
  query assignedJob($userId: UUID!) {
    user(id: $userId) {
      id
      userStatus
      jobsForUser {
        totalCount
      }
      jobsAsSailorConfirmed {
        totalCount
      }
      jobsAsSailorAssigned {
        totalCount
        nodes {
          id
          initialPrice
          remuneration
          jobStatus
          price
          conversationExistSailor
          position
          startDate
          endDate
          monthlyRemuneration
          finalOffer {
            id
            sailorContract
          }
          offerPending {
            id
          }
          ad {
            id
            adType
            boat {
              id
              flag {
                shortName
              }
              model {
                id
                name
                boatType
              }
              boatPictures(first: 1) {
                nodes {
                  id
                  url
                }
              }
            }
            harborByEndHarbor {
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
          }
        }
      }
    }
  }
`;

export const SAILOR_FINANCE = gql`
  query finance($userId: UUID!) {
    places(condition: { type: "country" }, orderBy: NAME_ASC) {
      nodes {
        id
        name
        shortName
      }
    }
    user(id: $userId) {
      id
      stripeCreated
      firstname
      userDetailById {
        id
        lastname
        rib
        externalAccounts
        customerAccountId
        stripeAccountId
        taxDomicil
      }
    }
  }
`;

export const STRIPE_FACTURATION = gql`
  mutation CreateBoat($accountlinkinput: CreateAccountlinkInput!) {
    createAccountLink(input: $accountlinkinput) {
      url
    }
  }
`;

export const IBAN_EDIT = gql`
  mutation iban($updateibaninput: UpdateIbanInput!) {
    updateIban(input: $updateibaninput) {
      success
    }
  }
`;
