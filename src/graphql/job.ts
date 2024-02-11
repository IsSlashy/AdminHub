import gql from 'graphql-tag';

export const PREVIEW_JOB = gql`
  query previewJob($jobId: UUID!) {
    job(id: $jobId) {
      id
      jobStatus
      startDate
      pipeDriveId
      ad {
        id
        harborByStartHarbor {
          id
          nameFr
        }
        boat {
          id
          ownerId
        }
      }
      finalOffer {
        id
        fee
        sailor {
          id
          firstname
          userDetailById {
            id
            lastname
          }
        }
      }
    }
  }
`;

export const RE_PUBLISH_JOB = gql`
  mutation rePublishJob($pJobInput: RePublishJobInput!) {
    rePublishJob(input: $pJobInput) {
      job {
        id
      }
    }
  }
`;

export const ADMIN_MAIL_OPPORTUNITY = gql`
  query adminMailOppotunity($pJobId: UUID!) {
    sendOppotunityMail(pJobId: $pJobId)
  }
`;

export const CANCEL_JOB = gql`
  mutation cancelJob($pJobId: AdminCancelJobInput!) {
    adminCancelJob(input: $pJobId) {
      job {
        id
      }
    }
  }
`;

export const VALIDATE_JOB = gql`
  mutation validate($jobId: UUID!) {
    validateJob(input: { pJobId: $jobId }) {
      job {
        id
      }
    }
  }
`;

export const BILLING = gql`
  query billing($jobId: UUID!) {
    countries {
      nodes {
        name
        id
      }
    }
    job(id: $jobId) {
      id
      jobStatus
      finalOffer {
        id
        clientContract
      }
      ad {
        ownerIdClient
      }
      billing {
        id
        address {
          id
          formattedAddress
        }
        adType
        boatName
        clientType
        startHarbor {
          id
          nameFr
        }
        endHarbor {
          id
          nameFr
        }
        startDate
        endDate
        siret
        sailorStatus
        sailorSiret
        sailorPhoneNumber
        sailorLastname
        sailorFirstname
        sailorEmail
        sailorCorporateName
        sailorBirthday
        registrationNumber
        price
        position
        phoneNumber
        model {
          id
          name
        }
        lastname
        language
        flagId
        firstname
        email
        corporateName
        clientType
      }
    }
  }
`;

export const UPSERT_BILLING = gql`
  mutation upsert_billing($billingPayload: UpsertBillingAdminInput!) {
    upsertBillingAdmin(input: $billingPayload) {
      billing {
        id
      }
    }
  }
`;

export const GENERATE_CONTRACT = gql`
  query generate_contrat_pdf($offerId: UUID!) {
    generatePdf(pOfferId: $offerId)
  }
`;

export const CORRESPONDANT = gql`
  query correspondant($jobId: UUID!) {
    usersForJob(jobId: $jobId) {
      nodes {
        id
        firstname
        avatarUrl
        sailorSpokenLanguages {
          nodes {
            language {
              name
            }
          }
        }
        userDetailById {
          id
          lastname
          email
          phoneNumber
          personnalAddress {
            zipcode
          }
          reserved
        }
      }
    }
  }
`;

export const OPEN_CONV = gql`
  mutation conv($openConv: OpenConversationAdminInput!) {
    openConversationAdmin(input: $openConv) {
      conversation {
        id
      }
    }
  }
`;

export const JOB = gql`
  query job($jobId: UUID!) {
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
    job(id: $jobId) {
      chessRemuneration
      civilityPref
      jobStatus
      commercial1Id
      commissionRate
      contractType
      description
      endDate
      initialPrice
      lessor
      monthlyCommission
      monthlyRemuneration
      onboardFee
      position
      sleepOnBoardLastNight
      sleepOnBoardNightBefore
      sleeping
      startDate
      travelFee
      isCaptain
      reserved
      remuneration
      fee
      premiumService
      structures {
        nodes {
          name
        }
      }
      ad {
        id
        adType
        boatId
        coastDistance
        commercialActivity
        description
        distance
        spokenLanguagesByAdsId {
          nodes {
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
        estimatedDays
        ownerIdClient
        passengerNumber
        boat {
          owner {
            boatsByOwnerId {
              nodes {
                id
                name
                model {
                  boatType
                  name
                  hullLength
                  grossTonnage
                }
              }
            }
          }
          model {
            boatType
            name
            hullLength
            grossTonnage
          }
        }
      }
    }
  }
`;

export const UPDATE_JOB = gql`
  mutation jobUpdate($jobInput: UpdateJobInput!) {
    updateJob(input: $jobInput) {
      job {
        initialPrice
        startDate
        endDate
        position
        travelFee
        onboardFee
        commissionRate
        chessRemuneration
        contractType
        description
        jobStatus
        sleeping
      }
    }
  }
`;

export const UPDATE_AD = gql`
  mutation adUpdate($adInput: UpdateAdInput!) {
    updateAd(input: $adInput) {
      ad {
        id
      }
    }
  }
`;

export const UPDATE_SPOKENN_LANGUAGE = gql`
  mutation updateSokenLanguage(
    $updateLanguagesInput: UpdateSpokenLanguagesInput!
  ) {
    updateSpokenLanguages(input: $updateLanguagesInput) {
      ad {
        id
      }
    }
  }
`;

export const JOB_OFFERS = gql`
  query jobOffers($jobId: UUID!) {
    job(id: $jobId) {
      id
      offers {
        nodes {
          id
          realPrice
          contractType
          travelFeeExpenses
          status
          token
          sailor {
            id
            firstname
            avatarUrl
            userDetailById {
              lastname
            }
          }
        }
      }
    }
  }
`;
