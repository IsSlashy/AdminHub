import gql from 'graphql-tag';

export const ADD_FAVOURITES = gql`
  mutation upsertFavorite($favoritesinput: UpsertFavouritesInput!) {
    upsertFavourites(input: $favoritesinput) {
      favourite {
        id
      }
    }
  }
`;
export const DELETE_FAVOURITE = gql`
  mutation deleteFavorite($favoriteId: UUID!) {
    deleteFavourite(input: { id: $favoriteId }) {
      favourite {
        id
      }
    }
  }
`;

export const VIEW_FAVOURTIES = gql`
  query favouriteUser($favoriteUser: UUID!) {
    user(id: $favoriteUser) {
      favourites {
        nodes {
          id
          favouriteUser {
            firstname
            userDetailById {
              birthCountry
              email
              lastname
              phoneNumber
            }
            userStatus
          }
        }
      }
    }
  }
`;
