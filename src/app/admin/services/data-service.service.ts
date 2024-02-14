import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  GET_DEGREES,
  GET_DOCUMENTS,
  GET_TRAININGS,
  UPDATE_DETAILS,
  UPDATE_DOCUMENT,
} from 'src/graphql/approval';
import {
  CREATE_BOATMODEL,
  GET_BOATMODEL,
  UPDATE_BOATMODEL,
} from 'src/graphql/boats';
import { CLIENT_PAIMENTS } from 'src/graphql/client';
import {
  BOATS_USER,
  CHESS_PRICE,
  CREATE_AD,
  CREATE_JOB,
  ESTIMATED_PRICE,
  GET_HARBOR,
} from 'src/graphql/creation';
import {
  ADD_FAVOURITES,
  DELETE_FAVOURITE,
  VIEW_FAVOURTIES,
} from 'src/graphql/favoris';
import { JOB } from 'src/graphql/job';
import {
  GENERATE_SIGNATURE,
  INFO_SAILOR,
  OFFER_CREATE,
} from 'src/graphql/offer';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  constructor(private apollo: Apollo) {}

  getJobById(jobId: string | null) {
    return this.apollo.query({
      query: JOB,
      variables: {
        jobId,
      },
    });
  }

  getSailorInfoById(id: string | null) {
    return this.apollo.query({
      query: INFO_SAILOR,
      variables: {
        sailorId: id,
      },
    });
  }

  generateSignature(firstname: string | null, lastname: string | null) {
    return this.apollo.mutate({
      mutation: GENERATE_SIGNATURE,
      variables: {
        generateSignature: {
          firstname,
          lastname,
        },
      },
    });
  }

  createOffer(offerForm: any, generateSignature: any) {
    return this.apollo.mutate({
      mutation: OFFER_CREATE,
      variables: {
        offerInput: {
          pSailorId: offerForm.value.pSailorId,
          pJobId: offerForm.value.pJobId,
          price: offerForm.value.price * 100,
          chessRemuneration: offerForm.value.chessRemuneration,
          contractType: offerForm.value.contractType,
          onboardFee: offerForm.value.onboardFee,
          travelFee: offerForm.value.travelFee,
          travelFeeExpenses: offerForm.value.travelFeeExpenses,
          sailorSignatureUrl: generateSignature.url,
          sailorSignatureLocation: offerForm.value.location,
        },
      },
    });
  }

  getBoatById(id: number) {
    return this.apollo.query({
      query: GET_BOATMODEL,
      variables: {
        id: id,
      },
    });
  }

  updateBoat(boatForm: any) {
    return this.apollo.mutate({
      mutation: UPDATE_BOATMODEL,
      variables: {
        updatemodelinput: {
          id: boatForm.value.id,
          patch: {
            name: boatForm.value.name,
            enginePower: parseInt(boatForm.value.enginePower, 10),
            boatType: boatForm.value.boatType,
            hullLength: boatForm.value.hullLength,
            headroom: boatForm.value.headroom,
            draft: boatForm.value.draft,
            grossTonnage: boatForm.value.grossTonnage,
          },
        },
      },
    });
  }

  clientPaiementById(id: string | null) {
    return this.apollo.query({
      query: CLIENT_PAIMENTS,
      variables: {
        userId: id,
      },
    });
  }

  createBoat(boatForm: any) {
    return this.apollo.mutate({
      mutation: CREATE_BOATMODEL,
      variables: {
        createcompletemodelsinput: {
          pName: boatForm.value.name,
          pEnginePower: parseInt(boatForm.value.enginePower),
          pBoatType: boatForm.value.boatType,
          pHullLength: boatForm.value.hullLength,
          pHeadroom: boatForm.value.headroom,
          pDraft: boatForm.value.draft,
          pGrossTonnage: boatForm.value.grossTonnage,
        },
      },
    });
  }

  watchViewFavoritesQuery(userId: string) {
    return this.apollo.watchQuery<any>({
      query: VIEW_FAVOURTIES,
      variables: { favoriteUser: userId },
    });
  }

  addFavorites(favoriteUser: any, favoriteInput: any) {
    return this.apollo.mutate({
      mutation: ADD_FAVOURITES,
      variables: { favoritesinput: favoriteInput },
      refetchQueries: [{ query: VIEW_FAVOURTIES, variables: { favoriteUser } }],
    });
  }

  deleteFavorites(favouriteId: string, favoriteUser: string) {
    return this.apollo.mutate({
      mutation: DELETE_FAVOURITE,
      variables: { favoriteId: favouriteId },
      refetchQueries: [{ query: VIEW_FAVOURTIES, variables: { favoriteUser } }],
    });
  }

  getBoatUser(userId: string) {
    return this.apollo.query({
      query: BOATS_USER,
      variables: {
        userId,
      },
    });
  }

  watchEstimatedPriceQuery(estimationParam: any) {
    return this.apollo.watchQuery<any>({
      query: ESTIMATED_PRICE,
      fetchPolicy: 'network-only',
      variables: estimationParam,
    });
  }

  watchChessPriceQuery(chessParam: any) {
    return this.apollo.watchQuery<any>({
      query: CHESS_PRICE,
      fetchPolicy: 'network-only',
      variables: chessParam,
    });
  }

  getHarbor(id: any) {
    return this.apollo.query({
      query: GET_HARBOR,
      variables: {
        harborInput: id,
      },
    });
  }

  createAd(startDateISO: string, endDateISO: string, jobForm: any) {
    return this.apollo.mutate({
      mutation: CREATE_AD,
      variables: {
        adInput: {
          adType: jobForm.value.adType,
          boatId: jobForm.value.boatId,
          coastDistance: jobForm.value.coastDistance,
          distance: jobForm.value.distance,
          endHarbor: jobForm.value.endHarbor,
          estimatedDays: jobForm.value.estimatedDays,
          spokenLanguage: jobForm.value.spokenLanguages,
          startDate: startDateISO,
          endDate: endDateISO,
          startHarbor: jobForm.value.startHarbor,
          description: jobForm.value.description,
        },
      },
    });
  }

  createJob(startDateISO: string, endDateISO: string, jobForm: any, data: any) {
    return this.apollo.mutate({
      mutation: CREATE_JOB,
      variables: {
        jobInput: {
          adId: data.createCompleteAd.ad.id,
          startDate: startDateISO,
          endDate: endDateISO,
          isCaptain: false,
          positionType: jobForm.value.positionType,
          commissionRate: jobForm.value.commissionRate,
          initialPrice: jobForm.value.initialPrice * 100,
          travelFee: jobForm.value.travelFee,
          chessRemuneration: jobForm.value.chessRemuneration,
          onboardFee: jobForm.value.onboardFee,
          contractType: jobForm.value.contractType,
          sendEmail: jobForm.value.sendEmail,
          reserved: jobForm.value.reserved,
        },
      },
    });
  }

  getDocuments() {
    return this.apollo.query({
      query: GET_DOCUMENTS,
    });
  }

  watchTrainings() {
    return this.apollo.watchQuery({
      query: GET_TRAININGS,
      fetchPolicy: 'network-only',
      variables: {
        type: 'TRAINING',
        status: 'WAITING',
      },
    });
  }

  watchDegrees(selectedTable: string) {
    return this.apollo.watchQuery({
      query: GET_DEGREES,
      fetchPolicy: 'network-only',
      variables: {
        type: 'DEGREE',
        status: selectedTable,
      },
    });
  }

  updateDocument(
    controls: any,
    sailorNumber: string | null,
    selectedTraining: any,
    data: any,
    selectedTable: any
  ) {
    return this.apollo.mutate({
      mutation: UPDATE_DOCUMENT,
      variables: {
        documentInput: {
          pDocumentId: selectedTraining.id,
          pDocumentPatch: {
            serial: controls['serial'].value,
            sailorId: sailorNumber,
            documentUrl:
              data.generatePresignedPost.url +
              '/' +
              data.generatePresignedPost.fields.key,
            expirationDate: controls['endDate'].value,
            documentTypeId: controls['type'].value,
          },
        },
      },
      refetchQueries: [
        {
          query: GET_TRAININGS,
          fetchPolicy: 'network-only',
          variables: {
            type: 'TRAINING',
            status: selectedTable,
          },
        },
      ],
    });
  }

  updateDetails(selectedTraining: any, controls: any) {
    return this.apollo.mutate({
      mutation: UPDATE_DETAILS,
      variables: {
        detailsInput: {
          id: selectedTraining.user.id,
          patch: {
            sailorNumber: controls['holderNumber'].value,
          },
        },
      },
    });
  }
}
