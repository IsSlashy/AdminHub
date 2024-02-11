import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Apollo } from 'apollo-angular';

declare const google: any;
import gql from 'graphql-tag';
const UPSERT_ADDRESS = gql`
  mutation upsertAddress($addressInput: UpsertAddressInput!) {
    upsertAddress(input: $addressInput) {
      address {
        id
      }
    }
  }
`;

@Component({
  selector: 'app-google-places-autocomplete',
  templateUrl: './google-places-autocomplete.component.html',
  styleUrls: ['./google-places-autocomplete.component.css'],
})
export class GooglePlacesAutocompleteComponent {
  @ViewChild('addressText') addressText!: ElementRef;
  @Input() setAddresse: any;
  @Output() selectedAddress: EventEmitter<any> = new EventEmitter();

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    const inputElement = document.getElementById('addressText');
    if (inputElement)
      if (inputElement instanceof HTMLInputElement)
        inputElement.value = this.setAddresse;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['setAddresse'] && this.setAddresse) {
      this.setGoogleAutocompleteValue(this.setAddresse);
    }
  }

  setGoogleAutocompleteValue(value: string) {
    const inputElement = this.addressText?.nativeElement;
    if (inputElement instanceof HTMLInputElement) {
      inputElement.value = value;
    }
  }

  ngAfterViewInit() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.addressText.nativeElement
    );
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const selectedPlace = autocomplete.getPlace();
      this.handleAddressChange(selectedPlace);
    });
  }

  handleAddressChange(address: any) {
    const country = address.address_components.find(
      (x: any) => x.types[0] === 'country'
    );
    const county = address.address_components.find(
      (x: any) => x.types[0] === 'administrative_area_level_1'
    );
    const zip = address.address_components.find((x: any) =>
      x.types.some((e: string) => ['postal_code', 'postal_town'].includes(e))
    );
    const city = address.address_components.find((x: any) =>
      x.types.some((e: string) =>
        ['administrative_area_level_2', 'locality'].includes(e)
      )
    );
    const street = address.address_components.find(
      (x: any) => x.types[0] === 'route'
    );
    const number = address.address_components.find((x: any) =>
      x.types.some((e: string) => ['premise', 'street_number'].includes(e))
    );
    let longNameReplace: any;
    if (number && street) {
      longNameReplace = number.long_name + ' ' + street.long_name;
    } else {
      longNameReplace = null;
    }

    this.apollo
      .mutate({
        mutation: UPSERT_ADDRESS,
        variables: {
          addressInput: {
            pCountry: country ? country.long_name : null,
            pCountryShortName: country ? country.short_name : null,
            pCounty: county?.long_name,
            pCountyShortName: county?.short_name,
            pCity: city?.long_name,
            pCityShortName: city?.short_name,
            pZipcode: zip?.long_name,
            pStreetAddress: longNameReplace,
            pFormattedAddress: address.formatted_address,
            pGooglePlaceId: address.place_id,
            pLat: address.geometry.location.lat(),
            pLong: address.geometry.location.lng(),
          },
        },
      })
      .subscribe(({ data }: any) => {
        this.selectedAddress.emit(data.upsertAddress.address.id);
      });
  }
}
