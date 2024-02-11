import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import { UPDATE_USER } from 'src/graphql/client';
import {
  SAILOR_PROFIL,
  UPDATE_LANGAGE,
  UPSERT_PREF,
  UPSERT_VISAS,
} from 'src/graphql/sailor';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent {
  @ViewChild(ModalConfirmedComponent) modalConfirmed!: ModalConfirmedComponent;

  profilForm: FormGroup = this.fromBuilder.group({
    localisation: [null, []],
    localisationtring: [null, []],
    nauticalExperience: [null, []],
    profileDescription: [null, []],
    maxBoatLength: [null, []],
    maxPassenger: [null, []],
    minBoatLength: [null, []],
    vaccin: [null, []],
    tatoo: [null, []],
    smoker: [null, []],
    contractType: [null, []],

    visa: [null, []],
    boatType: [[], []],
    adType: [[], []],
    positionType: [[], []],
    spokenLanguages: [[], []],
  });

  subscription: Subscription | undefined;
  languages: any = new Array<any>();
  visas: any = new Array<any>();
  userId: string | null = '';
  user: any;

  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {}
  userProfileImageUrl: string | null = null;
  ngOnInit() {
    this.route.parent?.paramMap.subscribe((param) => {
      this.userId = param.get('id');

      this.subscription = this.apollo
        .watchQuery<any>({
          query: SAILOR_PROFIL,
          variables: {
            userId: this.userId,
          },
        })
        .valueChanges.subscribe(({ data }: any) => {
          console.log('la data', data);
          this.visas = data.visaTypes?.nodes;
          this.languages = data.languages?.nodes;
          this.user = data.user;
          this.userProfileImageUrl = this.user.resizedImages;

          const visas = data.user.userVisas?.nodes.map(
            (elt: any) => elt.visa.id
          );
          const langs = data.user.sailorSpokenLanguages?.nodes.map(
            (elt: any) => elt.language.id
          );
          const boats =
            data.user.userPreference?.userPreferedBoatTypes.nodes.map(
              (elt: any) => elt.boatType
            );
          const ads = data.user.userPreference?.userPreferedAdTypes.nodes.map(
            (elt: any) => elt.adType
          );
          const positions =
            data.user.userPreference?.userPreferedPositions.nodes.map(
              (elt: any) => elt.position
            );

          this.profilForm.patchValue({
            nauticalExperience: data.user.nauticalExperience,
            profileDescription: data.user.profileDescription,
            maxBoatLength: data.user.userPreference?.maxBoatLength,
            minBoatLength: data.user.userPreference?.minBoatLength,
            maxPassenger: data.user.userPreference?.maxPassenger,
            tatoo: data.user.tatoo,
            smoker: data.user.smoker,
            vaccin: data.user.covidVaccinated,
            contractType:
              data.user.userPreference?.userPreferedContractType?.contractType,

            visa: visas,
            spokenLanguages: langs,
            boatType: boats,
            adType: ads,
            positionType: positions,
          });
          console.log('le form', this.profilForm.value);
        });
    });
  }
  updateBoatType(value: string) {
    const boatTypeArray = this.profilForm.get('boatType')!.value;

    if (boatTypeArray.includes(value)) {
      this.profilForm.patchValue({
        boatType: boatTypeArray.filter((v: string) => v !== value),
      });
    } else {
      this.profilForm.patchValue({
        boatType: [...boatTypeArray, value],
      });
    }
    console.log('le form', this.profilForm.value.boatType);
  }
  updatePositionType(value: string) {
    const positionTypeArray = this.profilForm.get('positionType')!.value;

    if (positionTypeArray.includes(value)) {
      this.profilForm.patchValue({
        positionType: positionTypeArray.filter((v: string) => v !== value),
      });
    } else {
      this.profilForm.patchValue({
        positionType: [...positionTypeArray, value],
      });
    }
    console.log('le form', this.profilForm.value.boatType);
  }
  updateAdType(value: string) {
    const adTypeArray = this.profilForm.get('adType')!.value;

    if (adTypeArray.includes(value)) {
      this.profilForm.patchValue({
        adType: adTypeArray.filter((v: string) => v !== value),
      });
    } else {
      this.profilForm.patchValue({
        adType: [...adTypeArray, value],
      });
    }
    console.log('le form', this.profilForm.value.boatType);
  }

  updatePref() {
    this.apollo
      .mutate({
        mutation: UPDATE_USER,
        variables: {
          userPayload: {
            id: this.userId,
            patch: {
              nauticalExperience: this.profilForm.value.nauticalExperience,
              profileDescription: this.profilForm.value.profileDescription,
              covidVaccinated: this.profilForm.value.vaccin,
              tatoo: this.profilForm.value.tatoo,
              smoker: this.profilForm.value.smoker,
            },
          },
        },
      })
      .subscribe(({ data }: any) => {
        console.log('la mutation update user a réussi');
        this.apollo
          .mutate({
            mutation: UPSERT_PREF,
            variables: {
              upsertInput: {
                pAdType: this.profilForm.value.adType,
                pBoatType: this.profilForm.value.boatType,
                pMaxBoatLength: this.profilForm.value.maxBoatLength || 35,
                pMaxPassenger: this.profilForm.value.maxPassenger || 0,
                pPosition: this.profilForm.value.positionType,
                pMinBoatLength: this.profilForm.value.minBoatLength,
                pContractType: this.profilForm.value.contractType,
                pSailorId: this.userId,
              },
            },
          })
          .subscribe(({ data }: any) => {
            console.log('la mutation update pref a réussi');
            this.apollo
              .mutate({
                mutation: UPSERT_VISAS,
                variables: {
                  visaInput: {
                    pSailorId: this.userId,
                    pVisa: this.profilForm.value.visa,
                  },
                },
              })
              .subscribe(({ data }: any) => {
                console.log('la mutation update visa a réussi');
                this.apollo
                  .mutate({
                    mutation: UPDATE_LANGAGE,
                    variables: {
                      langageInput: {
                        spokenLanguages: this.profilForm.value.spokenLanguages,
                        userId: this.userId,
                      },
                    },
                  })
                  .subscribe(
                    ({ data }: any) => {
                      this.modalConfirmed.openModal();
                      console.log('le update job reussi ');
                    },
                    (err: any) => {
                      console.log(err);
                      this.modalConfirmed.modalRejected();
                    }
                  );
              });
          });
      });
  }
  goToUrl(type: any) {
    window.open(
      'https://www.captnboat.com/fr/recherche/marins-professionels?id=' +
        this.userId
    );
  }
}
