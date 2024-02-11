import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import {
  DETAIL_CHESS,
  RECORD_CHESS,
  UPDATE_BILLING,
  UPDATE_DETAIL_SAILOR,
  UPDATE_SAILOR,
} from 'src/graphql/chess';

interface AddressData {
  id: string;
  formattedAddress: string;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  @ViewChild(ModalConfirmedComponent) modalConfirmed!: ModalConfirmedComponent;

  nationalities: any;
  countries: any;

  missionForm: FormGroup = this.formBuilder.group({
    startDate: [null, []],
    endDate: [null, []],
    startHarbor: [null, []],
    endHarbor: [null, []],
    price: [null, []],
    position: [null, []],
  });

  sailorForm: FormGroup = this.formBuilder.group({
    lastname: [null, []],
    firstname: [null, []],
    birthday: [null, []],
    nationality: [null, []],
    birthPlace: [null, []],
    birthCountry: [null, []],
    socialNumber: [null, []],
    rib: [null, []],
    personalAddress: [null, []],
    personalAddressId: [null, []],
    addressId: [null, []],
    phoneNumber: [null, []],
    email: [null, []],
    sailorNumber: [null, []],
    taxDom: [null, []],
    civility: [null, []],
  });

  billingForm: FormGroup = this.formBuilder.group({
    clientType: [null, []],
    firstname: [null, []],
    lastname: [null, []],
    phoneNumber: [null, []],
    email: [null, []],
    address: [null, []],
    addressId: [null, []],
    model: [null, []],
    modelId: [null, []],
    boatName: [null, []],
    registrationNumber: [null, []],
    flagId: [null, []],
  });

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private formBuilder: FormBuilder
  ) {}
  id: any;
  offer: any;

  ngOnInit(): void {
    // Accéder au paramètre "id"
    this.route.paramMap.subscribe((params) => {
      this.apollo
        .query({
          query: DETAIL_CHESS,
          variables: {
            offerId: params.get('id'),
          },
        })
        .subscribe(({ data }: any) => {
          console.log('la data', data);
          this.offer = data.offer;
          this.nationalities = data.nationalities.nodes;
          this.countries = data.places.nodes;

          this.patchForm();
        });
    });
  }

  patchForm() {
    this.sailorForm.patchValue({
      birthday: this.offer.sailor.birthday,
      firstname: this.offer.sailor.firstname,
      nationality: this.offer.sailor.nationality1.id,
      civility: this.offer.sailor.civility,

      lastname: this.offer.sailor.userDetailById.lastname,
      birthPlace: this.offer.sailor.userDetailById.birthPlace,
      birthCountry: this.offer.sailor.userDetailById.birthCountry,
      socialNumber: this.offer.sailor.userDetailById.socialSecurityNumber,
      rib: this.offer.sailor.userDetailById.rib,
      personalAddress:
        this.offer.sailor.userDetailById.personnalAddress?.formattedAddress,
      personalAddressId: this.offer.sailor.userDetailById.personnalAddress?.id,
      phoneNumber: this.offer.sailor.userDetailById.phoneNumber,
      email: this.offer.sailor.userDetailById.email,
      sailorNumber: this.offer.sailor.userDetailById.sailorNumber,
      taxDom: this.offer.sailor.userDetailById.placeByTaxDomicil.id,
    });

    this.missionForm.patchValue({
      startDate: this.offer.job.ad.startDate,
      endDate: this.offer.job.ad.endDate,
      startHarbor: this.offer.job.ad.harborByStartHarbor.nameFr,
      endHarbor: this.offer.job.ad.harborByEndHarbor.nameFr,
      price: this.offer.chessRemuneration,
      position: this.offer.job.position,
    });

    this.billingForm.patchValue({
      clientType: this.offer.job.billing.clientType,
      firstname: this.offer.job.billing.firstname,
      lastname: this.offer.job.billing.lastname,
      phoneNumber: this.offer.job.billing.phoneNumber,
      email: this.offer.job.billing.email,
      address: this.offer.job.billing.address?.formattedAddress,
      addressId: this.offer.job.billing.address?.id,
      model: this.offer.job.billing.model?.name,
      modelId: this.offer.job.billing.model?.id,
      boatName: this.offer.job.billing.boatName,
      registrationNumber: this.offer.job.billing.registrationNumber,
      flagId: this.offer.job.billing.flag?.id,
    });

    console.log('le from', this.billingForm.value);
  }

  handleAddressChange(event: AddressData) {
    this.billingForm.controls['addressId'].setValue(event);
    console.log('le from', this.billingForm.value);
  }
  handleAddressSailorChange(event: AddressData) {
    this.sailorForm.controls['personalAddressId'].setValue(event);
  }

  handleModelSelection(e: any) {
    this.billingForm.controls['modelId'].setValue(e.id);
    this.billingForm.controls['model'].setValue(e.name);
  }

  updateSailor() {
    this.apollo
      .mutate({
        mutation: UPDATE_SAILOR,
        variables: {
          sailorPayload: {
            id: this.offer.sailor.id,
            patch: {
              firstname: this.sailorForm.value.firstname,
              birthday: this.sailorForm.value.birthday,
              nationality1Id: this.sailorForm.value.nationality,
              civility: this.sailorForm.value.civility,
            },
          },
        },
      })
      .subscribe(({ data }: any) => {
        this.apollo
          .mutate({
            mutation: UPDATE_DETAIL_SAILOR,
            refetchQueries: [
              { query: DETAIL_CHESS, variables: { offerId: this.offer.id } },
            ],
            variables: {
              sailorPayload: {
                id: this.offer.sailor.id,
                patch: {
                  lastname: this.sailorForm.value.lastname,
                  birthPlace: this.sailorForm.value.birthPlace,
                  birthCountry: this.sailorForm.value.birthCountry,
                  socialSecurityNumber: this.sailorForm.value.socialNumber,
                  rib: this.sailorForm.value.rib,
                  personnalAddressId: this.sailorForm.value.personalAddressId,
                  phoneNumber: this.sailorForm.value.phoneNumber,
                  email: this.sailorForm.value.email,
                  sailorNumber: this.sailorForm.value.sailorNumber,
                  taxDomicil: this.sailorForm.value.taxDom,
                },
              },
            },
          })
          .subscribe(
            ({ data }: any) => {
              this.modalConfirmed.openModal();
            },
            (err: any) => {
              console.log(err);
              this.modalConfirmed.modalRejected();
            }
          );
      });
  }

  updateClient() {
    this.apollo
      .mutate({
        mutation: UPDATE_BILLING,
        variables: {
          billingPayload: {
            pJobId: this.offer.job.id,
            pClientType: this.billingForm.value.clientType,
            pFirstname: this.billingForm.value.firstname,
            pLastname: this.billingForm.value.lastname,
            pPhoneNumber: this.billingForm.value.phoneNumber,
            pEmail: this.billingForm.value.email,
            pAddressId: this.billingForm.value.addressId,
            pModelId: this.billingForm.value.modelId,
            pBoatName: this.billingForm.value.boatName,
            pRegistrationNumber: this.billingForm.value.registrationNumber,
            pFlagId: this.billingForm.value.flagId,
          },
        },
      })
      .subscribe(
        ({ data }: any) => {
          this.modalConfirmed.openModal();
        },
        (err: any) => {
          console.log(err);
          this.modalConfirmed.modalRejected();
        }
      );
  }

  sendApiChess() {
    this.apollo
      .mutate({
        mutation: RECORD_CHESS,
        variables: {
          jobId: this.offer.job.id,
        },
      })
      .subscribe(
        ({ data }: any) => {
          this.modalConfirmed.openModal();
        },
        (err: any) => {
          console.log(err);
          this.modalConfirmed.modalRejected();
        }
      );
  }
}
