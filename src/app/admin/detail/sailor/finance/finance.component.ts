import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { IBAN_EDIT, SAILOR_FINANCE, STRIPE_FACTURATION, UPDATE_DETAIL_SAILOR } from 'src/graphql/sailor';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css'],
})
export class FinanceComponent {
  @ViewChild(ModalConfirmedComponent)modalConfirmed!: ModalConfirmedComponent;

  userId: any;
  user: any;
  countries: Array<any> = new Array();
  financeForm: FormGroup = this.formBuilder.group({
    stripeId: [null, []],
    country: [null, []],
  });
  stripe: any;
  ibanElement: any;
  /* @ViewChild('ibanElement', { static: true }) ibanElementRef!: ElementRef; */
  isLoading: boolean = false;
  ribError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    /* this.ibanInit(); */
    this.route.parent?.paramMap.subscribe((param) => {
      this.userId = param.get('id');
      this.apollo
        .query({
          query: SAILOR_FINANCE,
          variables: {
            userId: this.userId,
          },
        })
        .subscribe(({ data }: any) => {
          this.user = data.user;
          this.countries = data.places.nodes;
          this.financeForm.patchValue({
            stripeId: data.user?.userDetailById.stripeAccountId,
          });
          console.log('la data', data);
        });
    });
  }

  /* async ibanInit() {
    this.stripe = await loadStripe(environment.stripe_key);
    const options = { supportedCountries: ['SEPA'] };
    this.ibanElement = this.stripe.elements().create('iban', options);
    this.ibanElement.mount(this.ibanElementRef.nativeElement);
    this.ibanElement.on('change', (event: any) => {
      // Gérez l'événement de modification de l'élément IBAN ici
      console.log('le event', event);
    });
  } */

  updateUser(){
    this.apollo.mutate({
      mutation: UPDATE_DETAIL_SAILOR,
      variables:{
        sailorPayload: {
          id: this.userId,
          patch: {
            stripeAccountId: this.financeForm.value.stripeId
          }
        }
      }
      }).subscribe(({data}: any) => {
        this.modalConfirmed.openModal()
      })
  }

  async updateIban() {
    this.ribError = false;
    const dataRib = {
      currency: 'eur',
      account_holder_name:
        this.user.firstname + this.user.userDetailById.lastname,
      account_holder_type: 'individual',
    };
    const { token } = await this.stripe.createToken(this.ibanElement, dataRib);

    // GO TO EDIT IBAN
    this.apollo
      .mutate({
        mutation: IBAN_EDIT,
        variables: {
          updateibaninput: {
            accountTokenId: this.user?.userDetailById?.stripeAccountId,
            externalAccountToken: token.id,
          },
        },
      })
      .subscribe(
        ({ data }: any) => {},
        (error) => {
          console.log('la mutation job a une erreur', error);
        }
      );
  }

  async updateInfo() {
    if (this.user.stripeCreated === false) {
      if (this.financeForm.value.country === null) {
        return;
      } else {
        this.isLoading = true;
        const dataAccount = {
          tos_shown_and_accepted: true,
        };
        const dataRib = {
          currency: 'eur',
          account_holder_name:
            this.user.firstname + this.user.userDetailById.lastname,
          account_holder_type: 'individual',
        };
        const result = await this.stripe.createToken(this.ibanElement, dataRib);
        const acctToken = await this.stripe.createToken('account', dataAccount);
        this.apollo
          .mutate({
            mutation: STRIPE_FACTURATION,
            variables: {
              accountlinkinput: {
                accountTokenId: acctToken.token.id,
                externalAccountToken: result.token?.id,
                country: this.financeForm.value.country,
                language: this.checklang(),
                isMobile: false,
              },
            },
          })
          .subscribe(
            ({ data }: any) => {
              this.isLoading =false
              window.open(data.createAccountLink.url, '_blank');
              console.log('la mutation', data);
            },
            (error) => {
              this.isLoading =false
              console.log('la mutation job a une erreur', error);
            }
          );
      }
    } else {
      this.isLoading = true
      this.apollo
        .mutate({
          mutation: STRIPE_FACTURATION,
          variables: {
            accountlinkinput: {
              accountTokenId: this.user?.userDetailById?.stripeAccountId,
              language: this.checklang(),
              isMobile: false,
            },
          },
        })
        .subscribe(
          ({ data }: any) => {
            this.isLoading = false
            window.open(data.createAccountLink.url, '_blank');
            console.log('la mutation', data);
          },
          (error) => {
            this.isLoading = false
            console.log('la mutation job a une erreur', error);
          }
        );
    }
  }
  checklang() {
    var lang;
    if (location.href.includes('fr')) {
      lang = 'fr';
    } else if (location.href.includes('en')) {
      lang = 'en';
    } else if (location.href.includes('hr')) {
      lang = 'hr';
    } else if (location.href.includes('es')) {
      lang = 'es';
    } else if (location.href.includes('it')) {
      lang = 'it';
    }
    return lang;
  }
}
