import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import {
  VIEW_FAVOURTIES,
  ADD_FAVOURITES,
  DELETE_FAVOURITE,
} from 'src/graphql/favoris';

interface MarinFavori {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  userStatus: string;
}

@Component({
  selector: 'app-favoris',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavorisComponent implements OnInit {
  favoris: MarinFavori[] = [];
  userId: string = '';
  newFavouriteId: string = '';
  private queryRef: QueryRef<any> | undefined;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.parent?.paramMap.subscribe((param) => {
      this.userId = param.get('id')!;
      this.initializeFavouritesWatcher(this.userId);
    });
  }

  initializeFavouritesWatcher(userId: string) {
    this.queryRef = this.apollo.watchQuery<any>({
      query: VIEW_FAVOURTIES,
      variables: { favoriteUser: userId },
    });

    this.queryRef.valueChanges.subscribe(({ data }) => {
      this.favoris = data.user.favourites.nodes.map((node: any) => ({
        id: node.id,
        firstname: node.favouriteUser.firstname,
        lastname: node.favouriteUser.userDetailById.lastname,
        email: node.favouriteUser.userDetailById.email,
        phoneNumber: node.favouriteUser.userDetailById.phoneNumber,
        userStatus: node.favouriteUser.userStatus,
      }));
    });
  }

  addFavourite(favouriteUserId: string): void {
    if (!favouriteUserId) {
      console.error("L'ID du favori est manquant.");
      return;
    }

    const favoriteInput = {
      pFavouriteUserId: favouriteUserId,
      pUserId: this.userId,
    };

    this.apollo
      .mutate({
        mutation: ADD_FAVOURITES,
        variables: { favoritesinput: favoriteInput },
        refetchQueries: [
          { query: VIEW_FAVOURTIES, variables: { favoriteUser: this.userId } },
        ],
      })
      .subscribe({
        next: (response) => {
          console.log('Favori ajouté', response);
          this.newFavouriteId = ''; // Réinitialiser l'ID du nouveau favori
        },
        error: (error) =>
          console.error("Erreur lors de l'ajout du favori", error),
      });
  }

  deleteFavourite(favouriteId: string): void {
    this.apollo
      .mutate({
        mutation: DELETE_FAVOURITE,
        variables: { favoriteId: favouriteId },
        refetchQueries: [
          { query: VIEW_FAVOURTIES, variables: { favoriteUser: this.userId } },
        ],
      })
      .subscribe({
        next: (response) => {
          console.log('Favori supprimé', response);
        },
        error: (error) =>
          console.error('Erreur lors de la suppression du favori', error),
      });
  }
}
