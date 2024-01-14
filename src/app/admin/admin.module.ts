import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataComponent } from './data/data.component';
import { ChessComponent } from './chess/chess.component';
import { DetailComponent } from './chess/detail/detail.component';
import { ManagementComponent } from './management/management.component';
import { JobComponent } from './detail/job/job.component';
import { BoatComponent } from './detail/boat/boat.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConnectionComponent } from './connection/connection.component';
import { ComponentsModule } from '../components/components.module';
import { AdminComponent } from './admin.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatistiquesComponent } from './dashboard/statistiques/statistiques.component';
import { JobsComponent } from './dashboard/jobs/jobs.component';
import { DevisComponent } from './dashboard/devis/devis.component';
import { BillingComponent } from './detail/job/billing/billing.component';
import { InfoComponent } from './detail/job/info/info.component';
import { FollowUpComponent } from './follow-up/follow-up.component';
import { MatchingComponent } from './detail/job/matching/matching.component';
import { SailorComponent } from './detail/sailor/sailor.component';
import { ClientComponent } from './detail/client/client.component';
import { ProfilComponent } from './detail/sailor/profil/profil.component';
import { DocumentsComponent } from './detail/sailor/documents/documents.component';
import { PersonalComponent } from './detail/sailor/personal/personal.component';
import { BoatsComponent } from './detail/client/boats/boats.component';
import { ClientPersonalComponent } from './detail/client/client-personal/client-personal.component';
import { ClientJobsComponent } from './detail/client/client-jobs/client-jobs.component';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { PaimentsComponent } from './detail/client/paiments/paiments.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { SailorJobsComponent } from './detail/sailor/sailor-jobs/sailor-jobs.component';
import { FinanceComponent } from './detail/sailor/finance/finance.component';
import { ChatComponent } from './chat/chat.component';
import { TrainingsComponent } from './approval/trainings/trainings.component';
import { DegreesComponent } from './approval/degrees/degrees.component';
import { ResumesComponent } from './approval/resumes/resumes.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { OffersComponent } from './detail/job/offers/offers.component';
import { OfferComponent } from './detail/offer/offer.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NewCompleteJobComponent } from './creation/new-complete-job/new-complete-job.component';
import { NewOfferComponent } from './creation/new-offer/new-offer.component';
import { NewJobComponent } from './creation/new-job/new-job.component';
import { CreationComponent } from './creation/creation.component';
import { NewBoatComponent } from './creation/new-boat/new-boat.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { VariablesComponent } from './data/variables/variables.component';
import { NotationsComponent } from './notations/notations.component';
import { HarborComponent } from './data/harbor/harbor.component';
import { ModelComponent } from './data/model/model.component';
import { SettingsComponent } from './detail/sailor/settings/settings.component';
import { FavorisComponent } from './detail/client/favorites/favorites.component';
import { NotationComponent } from './detail/notation/notation.component';
import { AlertDocumentComponent } from './dashboard/alert-document/alert-document.component';


@NgModule({
  declarations: [
    ChessComponent,
    DetailComponent,
    ManagementComponent,
    JobComponent,
    BoatComponent,
    DashboardComponent,
    ConnectionComponent,
    AdminComponent,
    StatistiquesComponent,
    JobsComponent,
    DevisComponent,
    JobComponent,
    BillingComponent,
    InfoComponent,
    FollowUpComponent,
    MatchingComponent,
    SailorComponent,
    ClientComponent,
    ProfilComponent,
    DocumentsComponent,
    PersonalComponent,
    BoatsComponent,
    ClientPersonalComponent,
    ClientJobsComponent,
    PaimentsComponent,
    SailorJobsComponent,
    FinanceComponent,
    ChatComponent,
    TrainingsComponent,
    DegreesComponent,
    ResumesComponent,
    OffersComponent,
    OfferComponent,
    NewCompleteJobComponent,
    NewOfferComponent,
    NewJobComponent,
    CreationComponent,
    NewBoatComponent,
    DataComponent,
    FilterPipe,
    VariablesComponent,
    HarborComponent,
    NotationsComponent,
    ModelComponent,
    SettingsComponent,
    NotationComponent,
    FavorisComponent,
    AlertDocumentComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    MatTooltipModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
],
  exports:[
    TrainingsComponent,
    DegreesComponent,
    ResumesComponent,
  ]
})
export class AdminModule { }
