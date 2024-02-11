import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import {
  SAILOR_PERSONNAL,
  UPDATE_DETAIL_SAILOR,
  UPDATE_SAILOR,
} from 'src/graphql/sailor';

interface AddressData {
  id: string;
  formattedAddress: string;
}

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
})
export class PersonalComponent {
  @ViewChild(ModalConfirmedComponent) modalConfirmed!: ModalConfirmedComponent;

  personalForm: FormGroup = this.formBuilder.group({
    firstName: [null, []],
    lastName: [null, []],
    civility: [null, []],
    email: [null, []],
    birthDay: [null, []],
    sailorNumber: [null, []],
    phoneNumber: [null, []],
    nationality: [null, []],
    nativeLanguage: [null, []],
    favoriteCurrency: [null, []],
    userStatus: [null, []],
    commercialId: [null, []],
    spokenLanguages: [null, []],
    birthCountry: [null, []],
    birthPlace: [null, []],
    addressId: [null, []],
    formattedAddress: [null, []],
    birthName: [null, []],
    rib: [null, []],
    socialSecurityNumber: [null, []],
    taxDomicil: [null, []],
  });

  private subscription: Subscription | undefined;

  userId: string | null = '';
  user: any;
  nationalities: any = new Array<any>();
  languages: any = new Array<any>();
  countries: any = new Array<any>();
  commercials: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.route.parent?.paramMap.subscribe((param) => {
      this.userId = param.get('id');

      this.subscription = this.apollo
        .watchQuery<any>({
          query: SAILOR_PERSONNAL,
          variables: { userId: this.userId },
        })
        .valueChanges.subscribe(({ data }: any) => {
          this.user = data.user;
          this.nationalities = data.nationalities.nodes;
          this.languages = data.languages.nodes;
          this.countries = data.countries.nodes;
          this.commercials = data.commercials.nodes;
          this.personalForm.patchValue({
            firstName: data.user.firstname,
            civility: data.user.civility,
            birthDay: data.user.birthday,
            favoriteCurrency: data.user.favoriteCurrency,
            nationality: data.user.nationality1Id,
            nativeLanguage: data.user.nativeLanguageId,
            userStatus: data.user.userStatus,
            commercialId: data.user.commercialId,

            lastName: data.user.userDetailById.lastname,
            email: data.user.userDetailById.email,
            sailorNumber: data.user.userDetailById.sailorNumber,
            phoneNumber: data.user.userDetailById.phoneNumber,
            birthCountry: data.user.userDetailById.birthCountry,
            birthPlace: data.user.userDetailById.birthPlace,
            birthName: data.user.userDetailById.birthName,
            rib: data.user.userDetailById.rib,
            socialSecurityNumber: data.user.userDetailById.socialSecurityNumber,
            taxDomicil: data.user.userDetailById.taxDomicil,
            addressId: data.user.userDetailById.personnalAddress?.id,
            formattedAddress:
              data.user.userDetailById.personnalAddress?.formattedAddress,
            // spokenLanguages: data.user.spokenLanguages,
          });
        });
    });
  }

  handleAddressChange(event: AddressData) {
    this.personalForm.controls['addressId'].setValue(event);
  }

  updateUser() {
    this.apollo
      .mutate({
        mutation: UPDATE_SAILOR,
        variables: {
          sailorPayload: {
            id: this.userId,
            patch: {
              firstname: this.personalForm.value.firstName,
              civility: this.personalForm.value.civility,
              birthday: this.personalForm.value.birthDay,
              favoriteCurrency: this.personalForm.value.favoriteCurrency,
              nationality1Id: this.personalForm.value.nationality,
              nativeLanguageId: this.personalForm.value.nativeLanguage,
              userStatus: this.personalForm.value.userStatus,
              commercialId: this.personalForm.value.commercialId,
            },
          },
        },
      })
      .subscribe(({ data }: any) => {
        console.log('Update user a foncitonné');
        this.apollo
          .mutate({
            mutation: UPDATE_DETAIL_SAILOR,
            refetchQueries: [
              { query: SAILOR_PERSONNAL, variables: { userId: this.userId } },
            ],
            variables: {
              sailorPayload: {
                id: this.userId,
                patch: {
                  lastname: this.personalForm.value.lastName,
                  email: this.personalForm.value.email,
                  sailorNumber: this.personalForm.value.sailorNumber,
                  phoneNumber: this.personalForm.value.phoneNumber,
                  birthCountry: this.personalForm.value.birthCountry,
                  birthPlace: this.personalForm.value.birthPlace,
                  birthName: this.personalForm.value.birthName,
                  rib: this.personalForm.value.rib,
                  socialSecurityNumber:
                    this.personalForm.value.socialSecurityNumber,
                  taxDomicil: this.personalForm.value.taxDomicil,
                  personnalAddressId: this.personalForm.value.addressId,
                },
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
  }
}
