import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { GooglePlacesAutocompleteComponent } from './google-places-autocomplete/google-places-autocomplete.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AutocompleteModelComponent } from './autocomplete-model/autocomplete-model.component';
import { AutocompleteHarborComponent } from './autocomplete-harbor/autocomplete-harbor.component';
import { AutocompletePlaceComponent } from './autocomplete-place/autocomplete-place.component';
import { ModalConfirmedComponent } from './modal-confirmed/modal-confirmed.component';
import { ModalAssigneOfferComponent } from './modal-assigne-offer/modal-assigne-offer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CalculesComponent } from './calcules/calcules.component';

@NgModule({
  declarations: [
    GooglePlacesAutocompleteComponent,
    AutocompleteModelComponent,
    AutocompleteHarborComponent,
    AutocompletePlaceComponent,
    ModalConfirmedComponent,
    ModalAssigneOfferComponent,
    CalculesComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  exports: [
    GooglePlacesAutocompleteComponent,
    AutocompleteModelComponent,
    AutocompleteHarborComponent,
    AutocompletePlaceComponent,
    ModalConfirmedComponent,
    CalculesComponent,
  ],
})
export class ComponentsModule {}
