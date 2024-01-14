import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { BILLING, UPSERT_BILLING, GENERATE_CONTRACT } from 'src/graphql/job';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';


interface AddressData {
  id: string;
  formattedAddress: string;
}

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})

export class BillingComponent {
  @ViewChild(ModalConfirmedComponent)modalConfirmed!: ModalConfirmedComponent;

  billing: any;

  languagesStripe: Array<{value: string, name: string}> = [
    {value: "ar", name: "Arabic"}, {value: "bg", name: "Bulgarian (Bulgaria)"},
    {value: "cs", name: "Czech (Czech Republic)"}, {value: "da", name: "Danish (Denmark)"},
    {value: "de", name: "German (Germany)"}, {value: "el", name: "Greek (Greece)"},
    {value: "en", name: "English"}, {value: "en-GB", name: "English (United Kingdom)"},
    {value: "es", name: "Spanish (Spain)"}, {value: "es-419", name: "Spanish (Latin America)"},
    {value: "et", name: "Estonian (Estonia)"}, {value: "fi", name: "Finnish (Finland)"},
    {value: "fil", name: "Filipino (Philipines)"}, {value: "fr", name: "French (France)"},
    {value: "fr-CA", name: "French (Canada)"}, {value: "he", name: "Hebrew (Israel"},
    {value: "hr", name: "Croatian (Croatia)"}, {value: "hu", name: "Hungarian (Hungary)"},
    {value: "id", name: "Indonesian (Indonesia)"}, {value: "it", name: "Italian (Italy)"},
    {value: "ja", name: "Japanese (Japan)"}, {value: "ko", name: "Korean (Korea)"},
    {value: "lt", name: "Lithuanian (Lithuania)"}, {value: "lv", name: "Latvian (Latvia)"},
    {value: "ms", name: "Malay (Malaysia)"}, {value: "mt", name: "Maltese (Malta)"},
    {value: "nb", name: "Norwegian Bokmål"}, {value: "nl", name: "Dutch (Netherlands)"},
    {value: "pl", name: "Polish (Poland)"}, {value: "pt-BR", name: "Portuguese (Brazil)"},
    {value: "pt", name: "Portuguese"}, {value: "ro", name: "Romanian (Romania)"},
    {value: "ru", name: "Russian (Russia)"}, {value: "sk", name: "Slovak (Slovakia)"},
    {value: "sl", name: "Slovenian (Slovenia)"}, {value: "sv", name: "Swedish (Sweden)"},
    {value: "th", name: "Thai (Thailand)"}, {value: "tr", name: "Turkish (Turkey)"},
    {value: "vi", name: "Vietnamese (Vietnam)"}, {value: "zh", name: "Chinese Simplified (China)"},
    {value: "zh-HK", name: "Chinese Traditional (Hong Kong)"}, {value: "zh-TW", name: "Chinese Traditional (Taiwan)"}
  ]
  billingForm: FormGroup = this.formBuilder.group({
    //client
    language: [null,[]],
    clientType: [null,[]],
    adType: [null,[]],
    address: [null,[]],
    addressId: [null,[]],
    siret: [null,[]],
    phoneNumber: [null,[]],
    lastname: [null,[]],
    firstname: [null,[]],
    email: ['',[]],
    corporateName: [null,[]],
    //marin
    sailorStatus: [null,[]],
    sailorSiret: [null,[]],
    sailorPhoneNumber: [null,[]],
    sailorLastname: [null,[]],
    sailorFirstname: [null,[]],
    sailorEmail: [null,[]],
    sailorCorporateName: [null,[]],
    sailorBirthday: [null,[]],
    sailorAddressId: [null,[]],
    sailorAddress: [null,[]],
    //mission
    boatName: [null,[]],
    Immatriculation: [null,[]],
    startHarborId: [null,[]],
    startHarbor: [null,[]],
    endHarborId: [null,[]],
    endHarbor: [null,[]],
    startDate: [null,[]],
    registrationNumber: [null,[]],
    price: [null,[]],
    position: [null,[]],
    model: [null,[]],
    modelId: [null,[]],
    flagId: [null,[]],
    endDate: [null,[]],
  })

  countries : any = new Array<any>();
  job: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apollo: Apollo
  ){}

  ngOnInit(){
    this.route.parent?.paramMap.subscribe(param =>{
      this.apollo.query({
        query: BILLING,
        variables:{
          jobId: param.get('id')
        }
      }).subscribe(({data}:any) => {
        this.job = data.job
        this.countries = data.countries.nodes
        this.billing = data.job.billing
        this.billingForm.patchValue({
          // Client
          clientType: data.job.billing?.clientType,
          language: data.job.billing?.language,
          firstname: data.job.billing?.firstname,
          lastname: data.job.billing?.lastname,
          email: data.job.billing?.email,
          phoneNumber: data.job.billing?.phoneNumber,
          address: data.job.billing?.address?.formattedAddress,
          addressId: data.job.billing?.address?.id,
          siret: data.job.billing?.siret,
          corporateName: data.job.billing?.corporateName,
          // Marin
          sailorStatus: data.job.billing?.sailorStatus,
          sailorSiret: data.job.billing?.sailorSiret,
          sailorPhoneNumber: data.job.billing?.sailorPhoneNumber,
          sailorLastname: data.job.billing?.sailorLastname,
          sailorFirstname: data.job.billing?.sailorFirstname,
          sailorEmail: data.job.billing?.sailorEmail,
          sailorCorporateName: data.job.billing?.sailorCorporateName,
          sailorBirthday: data.job.billing?.sailorBirthday,
          sailorAddressId: data.job.billing?.sailorAddress?.id,
          sailorAddress: data.job.billing?.sailorAddress?.formattedAddress,
          // Mission
          adType: data.job.billing?.adType,
          boatName: data.job.billing?.boatName,
          startHarborId: data.job.billing?.startHarbor?.id,
          startHarbor: data.job.billing?.startHarbor?.nameFr,
          endHarborId: data.job.billing?.endHarbor?.id,
          endHarbor: data.job.billing?.endHarbor?.nameFr,
          startDate: data.job.billing?.startDate,
          Immatriculation: data.job.billing?.registrationNumber,
          price: data.job.billing?.price,
          position: data.job.billing?.position,
          model: data.job.billing?.model?.name,
          pModelId: data.job.billing?.model?.id,
          flagId: data.job.billing?.flagId,
          endDate: data.job.billing?.endDate,
        })
      })
    })
  }
  handleSailorAddressChange(event:AddressData){
    this.billingForm.controls['sailorAddressId'].setValue(event)
  }
  handleAddressChange(event:AddressData){
    this.billingForm.controls['addressId'].setValue(event)
  }
  handleModelSelection(e:any){
    this.billingForm.controls['modelId'].setValue(e.id);
    this.billingForm.controls['model'].setValue(e.name);
  }
  startHarborSelection(e:any){
    this.billingForm.controls['startHarborId'].setValue(e.id);
    this.billingForm.controls['startHarbor'].setValue(e.name);
  }
  endHarborSelection(e:any){
    this.billingForm.controls['endHarborId'].setValue(e.id);
    this.billingForm.controls['endHarbor'].setValue(e.name);
  }

  generateContractPdf(){
    console.log('le job', this.job)
    this.apollo.mutate({
      mutation: GENERATE_CONTRACT,
      variables:{
        offerId: this.job.finalOffer.id
      },
      refetchQueries: [{query: BILLING}]
    }).subscribe(({data}: any) => {
      this.modalConfirmed.openModal()
    },
    (error) => {
      console.log('error a la génération du contrat', error)
    })
  }

  updateBilling(){

    this.apollo.mutate({
      mutation: UPSERT_BILLING,
      variables: {
        billingPayload: {
          pAdType: this.billingForm.value.adType,
          pAddressId: this.billingForm.value.addressId,
          pBoatName: this.billingForm.value.boatName,
          pClientType: this.billingForm.value.clientType,
          pStartHarborId: this.billingForm.value.startHarborId,
          pStartDate: this.billingForm.value.startDate,
          pSiret: this.billingForm.value.siret,
          pSailorStatus: this.billingForm.value.sailorStatus,
          pSailorSiret: this.billingForm.value.sailorSiret,
          pSailorPhoneNumber: this.billingForm.value.sailorPhoneNumber,
          pSailorLastname: this.billingForm.value.sailorLastname,
          pSailorFirstname: this.billingForm.value.sailorFirstname,
          pSailorEmail: this.billingForm.value.sailorEmail,
          pSailorCorporateName: this.billingForm.value.sailorCorporateName,
          pSailorBirthday: this.billingForm.value.sailorBirthday,
          pSailorAddressId: this.billingForm.value.sailorAddressId,
          pRegistrationNumber: this.billingForm.value.Immatriculation,
          pPrice: this.billingForm.value.price,
          pPosition: this.billingForm.value.position,
          pPhoneNumber: this.billingForm.value.phoneNumber,
          pModelId: this.billingForm.value.modelId,
          pLastname: this.billingForm.value.lastname,
          pLanguage: this.billingForm.value.language,
          pJobId: this.job.id,
          pFlagId: this.billingForm.value.flagId,
          pFirstname: this.billingForm.value.firstname,
          pEndHarborId: this.billingForm.value.endHarborId,
          pEndDate: this.billingForm.value.endDate,
          pEmail: this.billingForm.value.email,
          pCorporateName: this.billingForm.value.corporateName,
        }
      }
    }).subscribe(({ data }: any) => {
      this.modalConfirmed.openModal()
      console.log('le update job reussi ');
    }, (err: any) => {
      console.log(err);
      this.modalConfirmed.modalRejected()
    })


  }
}
