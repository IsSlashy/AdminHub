import gql from 'graphql-tag';

export const BOATS_USER = gql`
  query MyQuery($userId: UUID!) {
    user(id: $userId) {
      id
      firstname
      userDetailById {
        id
        lastname
      }
      boatsByOwnerId(condition: { status: ACTIVE }, orderBy: NAME_ASC) {
        nodes {
          id
          name
          flag {
            id
            name
          }
          equipmentsList {
            name
          }
          model {
            hullLength
            boatType
          }
        }
      }
    }
    countries {
      nodes {
        name
        id
      }
    }
    languages(orderBy: NAME_ASC) {
      nodes {
        id
        name
      }
    }
  }
`;
export const CREATE_COMPLETE_JOB = gql`
  mutation createCompleteJob($jobInput: CreateCompleteJobAdminInput!) {
    createCompleteJobAdmin(input: $jobInput) {
      job {
        id
      }
    }
  }
`;

export const ESTIMATED_PRICE = gql`
  query EstimatedPrice(
    $hullLength: Float
    $boatType: BoatTypeEnum
    $autoPilote: Boolean
    $adType: AdTypeEnum
    $endHarborLattitude: Float
    $endHarborLongitude: Float
    $startHarborLattitude: Float
    $startHarborLongitude: Float
    $positionType: PositionEnum
    $estimatedTime: Int
    $distance: Float
    $duration: Int
  ) {
    estimatedPrice(
      duration: $duration
      adType: $adType
      hullLength: $hullLength
      boatType: $boatType
      asAutoPilot: $autoPilote
      endHarborLattitude: $endHarborLattitude
      endHarborLongitude: $endHarborLongitude
      startHarborLattitude: $startHarborLattitude
      startHarborLongitude: $startHarborLongitude
      positionType: $positionType
      estimatedTime: $estimatedTime
      distance: $distance
    )
  }
`;

export const CHESS_PRICE = gql`
  query apiCalculeRemuChess(
    $positionType: PositionEnum
    $price: Float
    $adType: AdTypeEnum
    $startHarbor: UUID
    $endHarbor: UUID
    $coastDistance: Int
    $duration: Int
    $estimatedDays: Int
  ) {
    apiCalculeRemuChess(
      positionType: $positionType
      price: $price
      adType: $adType
      startHarbor: $startHarbor
      endHarbor: $endHarbor
      coastDistance: $coastDistance
      duration: $duration
      estimatedDays: $estimatedDays
    )
  }
`;

export const GET_HARBOR = gql`
  query Harbor($harborInput: UUID!) {
    harbor(id: $harborInput) {
      id
      nameFr
      lng
      lat
      place {
        id
        parentPlaceId
        parentPlace {
          id
          name
        }
      }
    }
  }
`;

export const CREATE_AD = gql`
  mutation MyMutation($adInput: CreateCompleteAdInput!) {
    createCompleteAd(input: $adInput) {
      ad {
        id
      }
    }
  }
`;

export const CREATE_JOB = gql`
  mutation ($jobInput: CreateCompleteJobAdminInput!) {
    createCompleteJobAdmin(input: $jobInput) {
      job {
        id
      }
    }
  }
`;

export const GET_AD = gql`
  query getAd($adInput: UUID!) {
    ad(id: $adInput) {
      id
      adType
      startDate
      endDate
      distance
      estimatedDays
      coastDistance
      boat {
        id
        name
        boatEquipments {
          nodes {
            equipment {
              name
            }
          }
        }
        flag {
          id
          name
        }
        boatPictures {
          nodes {
            url
          }
        }
        model {
          boatType
          hullLength
        }
      }
      harborByStartHarbor {
        id
        nameFr
        lat
        lng
        place {
          parentPlace {
            shortName
          }
          id
          parentPlaceId
          shortName
        }
      }
      harborByEndHarbor {
        id
        nameFr
        lat
        lng
        place {
          parentPlace {
            shortName
          }
          id
          parentPlaceId
          shortName
        }
      }
    }
  }
`;
