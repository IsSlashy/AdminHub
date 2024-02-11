import { Component, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Apollo, QueryRef } from 'apollo-angular';
import {
  COMMERCIAL_JOBS,
  UPDATE_JOB,
  CANCEL_OFFER_MUTATION,
} from 'src/graphql/dashboard';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnDestroy {
  @ViewChild(ModalConfirmedComponent) modalConfirmed!: ModalConfirmedComponent;

  jobs: any[] = []; // Utilisation du type any pour la liste des jobs
  commercials: any = []; // Vous pouvez également définir un type pour les commerciaux
  jobsQuery!: QueryRef<any, { jobStatus: String[] | null }>;
  private jobsSub!: Subscription;

  dataSource!: MatTableDataSource<any>; // Utilisation du type any pour le dataSource
  displayedColumns: string[] = [
    'date',
    'poste',
    'port',
    'model',
    'status',
    'client',
    'commercial',
    'link',
    'notification',
  ];
  pageIndex: number = 0;

  jobStatus: Array<String> | null = [
    'PUBLISHED',
    'CONFIRMED',
    'DONE',
    'ABORTED',
    'ASSIGNED',
    'PENDING',
    'OPEN',
    'DRAFT',
    'CLOSED',
    'CLAIMED',
  ];
  searchForm: FormGroup = this.formBuilder.group({
    jobStatus: [null, []],
    first: [20, []],
    offset: [0, []],
  });

  constructor(
    private apollo: Apollo,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.jobsQuery = this.apollo.watchQuery({
      query: COMMERCIAL_JOBS,
      variables: { jobStatus: this.jobStatus },
    });

    this.jobsSub = this.jobsQuery.valueChanges.subscribe(({ data }: any) => {
      console.log(data);
      this.commercials = data.commercials.nodes;
      this.jobs = data.currentUser.commercialJobs.nodes; // Assignation directe des données
      this.dataSource = new MatTableDataSource<any>(this.jobs);
      this.dataSource.data = this.jobs.slice(0, 10);
      console.log(this.jobs);
    });
  }

  updateStatus(e: any) {
    this.jobsQuery.refetch({ jobStatus: e });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.dataSource.data = this.jobs.slice(startIndex, endIndex);
  }

  updateCommercial(e: any, jobId: string) {
    this.apollo
      .mutate({
        mutation: UPDATE_JOB,
        variables: {
          jobInput: {
            id: jobId,
            patch: {
              commercial1Id: e,
            },
          },
        },
      })
      .subscribe(
        ({ data }: any) => {
          this.modalConfirmed.openModal();
        },
        (err: any) => {
          console.error(err);
          this.modalConfirmed.modalRejected();
        }
      );
  }

  openDetail(id: string) {
    const url =
      'https://www.captnboat.com/fr/recherche/detail-annonce?id=' + id;
    window.open(url, '_blank');
  }

  ngOnDestroy() {
    if (this.jobsSub) {
      this.jobsSub.unsubscribe();
    }
  }
}
