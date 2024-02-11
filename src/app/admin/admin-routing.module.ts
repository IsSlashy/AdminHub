import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionComponent } from './connection/connection.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementComponent } from './management/management.component';
import { ChessComponent } from './chess/chess.component';
import { DetailComponent } from './chess/detail/detail.component';
import { ApprovalComponent } from './approval/approval.component';
import { StatistiquesComponent } from './dashboard/statistiques/statistiques.component';
import { JobsComponent } from './dashboard/jobs/jobs.component';
import { DevisComponent } from './dashboard/devis/devis.component';
import { JobComponent } from './detail/job/job.component';
import { BillingComponent } from './detail/job/billing/billing.component';
import { InfoComponent } from './detail/job/info/info.component';
import { MatchingComponent } from './detail/job/matching/matching.component';
import { SailorComponent } from './detail/sailor/sailor.component';
import { ProfilComponent } from './detail/sailor/profil/profil.component';
import { DocumentsComponent } from './detail/sailor/documents/documents.component';
import { PersonalComponent } from './detail/sailor/personal/personal.component';
import { ClientComponent } from './detail/client/client.component';
import { ClientJobsComponent } from './detail/client/client-jobs/client-jobs.component';
import { BoatsComponent } from './detail/client/boats/boats.component';
import { BoatComponent } from './detail/boat/boat.component';
import { ClientPersonalComponent } from './detail/client/client-personal/client-personal.component';
import { SearchMissionComponent } from './search-mission/search-mission.component';
import { ChatComponent } from './chat/chat.component';
import { DataComponent } from './data/data.component';
import { PaimentsComponent } from './detail/client/paiments/paiments.component';
import { SailorJobsComponent } from './detail/sailor/sailor-jobs/sailor-jobs.component';
import { FinanceComponent } from './detail/sailor/finance/finance.component';
import { FollowUpComponent } from './follow-up/follow-up.component';
import { OffersComponent } from './detail/job/offers/offers.component';
import { OfferComponent } from './detail/offer/offer.component';
import { CreationComponent } from './creation/creation.component';
import { NewCompleteJobComponent } from './creation/new-complete-job/new-complete-job.component';
import { NewJobComponent } from './creation/new-job/new-job.component';
import { NewOfferComponent } from './creation/new-offer/new-offer.component';
import { NewBoatComponent } from './creation/new-boat/new-boat.component';
import { AuthGuard } from '../_guard/auth.guard';
import { VariablesComponent } from './data/variables/variables.component';
import { HarborComponent } from './data/harbor/harbor.component';
import { NotationsComponent } from './notations/notations.component';
import { NotationComponent } from './detail/notation/notation.component';
import { ModelComponent } from './data/model/model.component';
import { DegreesComponent } from './approval/degrees/degrees.component';
import { TrainingsComponent } from './approval/trainings/trainings.component';
import { ResumesComponent } from './approval/resumes/resumes.component';
import { SettingsComponent } from './detail/sailor/settings/settings.component';
import { FavorisComponent } from './detail/client/favorites/favorites.component';
import { AlertDocumentComponent } from './dashboard/alert-document/alert-document.component';

const routes: Routes = [
  { path: '', redirectTo: 'connection', pathMatch: 'full' },
  { path: 'connection', component: ConnectionComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          { path: '', redirectTo: 'statistiques', pathMatch: 'full' },
          { path: 'statistiques', component: StatistiquesComponent },
          { path: 'jobs', component: JobsComponent },
          { path: 'devis', component: DevisComponent },
          { path: 'alert-document', component: AlertDocumentComponent },
          { path: 'profil/:id', component: ProfilComponent },
        ],
      },
      {
        path: 'approval',
        component: ApprovalComponent,
        children: [
          { path: '', redirectTo: 'degree', pathMatch: 'full' },
          { path: 'degree', component: DegreesComponent },
          { path: 'training', component: TrainingsComponent },
          { path: 'resume', component: ResumesComponent },
        ],
      },
      { path: 'management', component: ManagementComponent },
      { path: 'chess', component: ChessComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'follow-up', component: FollowUpComponent },
      { path: 'search-mission', component: SearchMissionComponent },
      { path: 'notations', component: NotationsComponent },
      { path: 'notation/:id', component: NotationComponent },
      {
        path: 'data',
        component: DataComponent,
        children: [
          { path: '', redirectTo: 'variables', pathMatch: 'full' },
          { path: 'port', component: HarborComponent },
          { path: 'variables', component: VariablesComponent },
          { path: 'model', component: ModelComponent },
        ],
      },

      // PAGE CREATION
      {
        path: 'creation',
        component: CreationComponent,
        children: [
          { path: '', redirectTo: 'complete-job', pathMatch: 'full' },
          { path: 'complete-job', component: NewCompleteJobComponent },
          { path: 'job', component: NewJobComponent },
          { path: 'offer', component: NewOfferComponent },
          { path: 'boat/:id', component: NewBoatComponent },
        ],
      },

      // PAGE DETAILS
      { path: 'chess/:id', component: DetailComponent },
      { path: 'boat/:id', component: BoatComponent },
      { path: 'offer/:id', component: OfferComponent },
      {
        path: 'job/:id',
        component: JobComponent,
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: InfoComponent },
          { path: 'billing', component: BillingComponent },
          { path: 'matching', component: MatchingComponent },
          { path: 'offers', component: OffersComponent },
        ],
      },
      {
        path: 'sailor/:id',
        component: SailorComponent,
        children: [
          { path: '', redirectTo: 'profil', pathMatch: 'full' },
          { path: 'profil', component: ProfilComponent },
          { path: 'documents', component: DocumentsComponent },
          { path: 'perso', component: PersonalComponent },
          { path: 'jobs', component: SailorJobsComponent },
          { path: 'finance', component: FinanceComponent },
          { path: 'settings', component: SettingsComponent },
          { path: 'favoris', component: FavorisComponent },
        ],
      },
      {
        path: 'client/:id',
        component: ClientComponent,
        children: [
          { path: '', redirectTo: 'profil', pathMatch: 'full' },
          { path: 'profil', component: ClientPersonalComponent },
          { path: 'boats', component: BoatsComponent },
          { path: 'jobs', component: ClientJobsComponent },
          { path: 'paiments', component: PaimentsComponent },
          { path: 'settings', component: SettingsComponent },
          { path: 'favoris', component: FavorisComponent },
        ],
      },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
