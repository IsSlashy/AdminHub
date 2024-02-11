import { Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {
  CANCEL_OFFER,
  CANDIDATE_JOB,
  GET_FAVORITES_JOBS,
  GET_SKIPPER_ASSIGNED_JOBS,
  GET_SKIPPER_CONFIRMED_JOBS,
  OPPORTUNITIES,
} from 'src/graphql/sailor';

@Component({
  selector: 'app-sailor-jobs',
  templateUrl: './sailor-jobs.component.html',
  styleUrls: ['./sailor-jobs.component.css'],
})
export class SailorJobsComponent {
  userId: any;
  jobs: any;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'photo',
    'bateau',
    'date',
    'place',
    'contract',
    'actions',
  ];
  pageIndex: number = 0;
  set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  activeTab: string = '';
  opportunitiesCount: number = 0;
  assignedCount: number = 0;
  confirmdedCount: number = 0;
  favoriteCount: number = 0;
  candidateCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.route.parent?.paramMap.subscribe((param) => {
      this.userId = param.get('id');
      this.selectOpportunities();
    });
  }

  selectOpportunities() {
    this.activeTab = 'opportunities';
    this.apollo
      .query({
        query: OPPORTUNITIES,
        variables: {
          userId: this.userId,
        },
        fetchPolicy: 'network-only',
      })
      .subscribe(({ data, loading }: any) => {
        this.jobs = data.user.jobsForUser.nodes;
        this.dataSource = data.user.jobsForUser.nodes;
        this.favoriteCount = data.user?.jobsFavorites?.totalCount;
        this.opportunitiesCount = data.user?.jobsForUser?.totalCount;
        this.assignedCount = data.user?.jobsAsSailorAssigned?.totalCount;
        this.confirmdedCount = data.user?.jobsAsSailorConfirmed?.totalCount;
        this.candidateCount = data.user?.sailorJobsCandidated?.totalCount;
      });
  }
  cancelOffer(offerId: string) {
    this.apollo
      .mutate({
        mutation: CANCEL_OFFER,
        variables: {
          cancelofferinput: {
            pOfferId: offerId, // Utilisez pOfferId ici au lieu de offerId
          },
        },
      })
      .subscribe(
        ({ data }) => {
          console.log('Offre annulée', data);
          // Mise à jour de l'interface utilisateur après l'annulation
        },
        (error) => {
          console.error("Erreur lors de l'annulation de l'offre", error);
          // Gestion des erreurs
        }
      );
  }
  selectCandidateJob() {
    this.activeTab = 'candidateJob';
    this.apollo
      .query({
        query: CANDIDATE_JOB,
        variables: {
          userId: this.userId,
        },
        fetchPolicy: 'network-only',
      })
      .subscribe(({ data, loading }: any) => {
        this.jobs = data.user.sailorJobsCandidated.nodes;
        this.dataSource = data.user.sailorJobsCandidated.nodes;
        this.candidateCount = data.user.sailorJobsCandidated?.totalCount;
      });
  }

  selectConfirmededJob() {
    this.activeTab = 'confirmedJob';
    this.apollo
      .query({
        query: GET_SKIPPER_CONFIRMED_JOBS,
        variables: {
          userId: this.userId,
        },
      })
      .subscribe(({ data, loading }: any) => {
        this.jobs = data.user.jobsAsSailorConfirmed.nodes;
        this.dataSource = data.user.jobsAsSailorConfirmed.nodes;
        this.confirmdedCount = data.user.jobsAsSailorConfirmed?.totalCount;
      });
  }

  selectAssignededJob() {
    this.activeTab = 'assignedJob';
    this.apollo
      .query({
        query: GET_SKIPPER_ASSIGNED_JOBS,
        variables: {
          userId: this.userId,
        },
      })
      .subscribe(({ data, loading }: any) => {
        this.jobs = data.user.jobsAsSailorAssigned.nodes;
        this.dataSource = data.user.jobsAsSailorAssigned.nodes;
        this.assignedCount = data.user.jobsAsSailorAssigned?.totalCount;
      });
  }

  selectFavoriteJob() {
    this.activeTab = 'favoriteJob';
    this.apollo
      .query({
        query: GET_FAVORITES_JOBS,
        variables: {
          userId: this.userId,
        },
      })
      .subscribe(({ data, loading }: any) => {
        this.jobs = data.user.jobsFavorites.nodes;
        this.dataSource = data.user.jobsFavorites.nodes;
        this.favoriteCount = data.user.jobsFavorites?.totalCount;
      });
  }
}
