import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Apollo, QueryRef } from 'apollo-angular';
import { GET_JOBS, UPDATE_JOB } from 'src/graphql/follow-up';
import {
  CANCEL_JOB,
  RE_PUBLISH_JOB,
  ADMIN_MAIL_OPPORTUNITY,
  VALIDATE_JOB
} from 'src/graphql/job';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalAssigneOfferComponent } from 'src/app/components/modal-assigne-offer/modal-assigne-offer.component';


@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css'],
})
export class FollowUpComponent {
  @ViewChild(ModalConfirmedComponent) modalConfirmed!: ModalConfirmedComponent;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  allJobs: Array<any> = new Array<any>();
  jobs: Array<any> = new Array<any>();
  commercials: Array<any> = new Array<any>();
  jobsQuery!: QueryRef<any, any>;
  private jobsSub!: Subscription;

  commercial: Array<String> | null = null;
  filteredData: any;
  pageIndex: number = 0;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'job',
    'owner',
    'client',
    'marin',
    'commercial',
    'conv',
    'commission',
    'actionJob',
  ];
  readonly formControl: FormGroup;
  readonly searchControl: FormGroup;

  currentDate: string = '';
  subscription: QueryRef<any> | undefined;

  checked = false;

  currentJob: any;
  currentOffer: any;
  jobsNumber: any;
  sort!: MatSort;
  count: number = 0;

  paidPrice: number = 0;

  constructor(
    private apollo: Apollo, private formBuilder: FormBuilder,
    public dialog: MatDialog) {

    this.dataSource = new MatTableDataSource<any>(this.jobs);

    this.formControl = this.formBuilder.group({
      ownerLastname: '',
      ownerFirstname: '',
      skipperFirstname: '',
      skipperLastname: '',
    });
    this.searchControl = this.formBuilder.group({
      status: [],
      commercial: null,
      ended: [false],
    });
  }
  // LES FORM
  commercialForm: FormGroup = this.formBuilder.group({
    commercial2: ['', []],
    commercial1: ['', []],
  });

  ngOnInit(): void {
    this.jobsQuery = this.apollo.watchQuery({
      query: GET_JOBS,
      fetchPolicy: 'network-only',
      variables: this.searchControl.value,
    });

    this.jobsSub = this.jobsQuery.valueChanges.subscribe(({ data }: any) => {
      this.allJobs = data.adminJobs.nodes;
      this.jobs = [...this.allJobs];
      this.commercials = data.commercials.nodes;
      this.dataSource = new MatTableDataSource<any>(this.jobs);
      this.dataSource.paginator = this.paginator;

      this.applyFilter('');
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.jobsQuery.refetch(this.searchControl.value);
      });

    this.formControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        const filter = {
          //skipper filter
          skipperFirstname: value.skipperFirstname.trim().toLowerCase(),
          skipperLastname: value.skipperLastname.trim().toLowerCase(),
          //owner filter
          ownerFirstname: value.ownerFirstname.trim().toLowerCase(),
          ownerLastname: value.ownerLastname.trim().toLowerCase(),
        };
        this.applyFilter(filter);
      });

    let date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    this.currentDate = date.toISOString().slice(0, -5);
  }


  applyFilter(filterValue: any) {
    this.dataSource.filterPredicate = (data: any, filter: any) => {
      return (
        data.finalOffer?.sailor.firstname
          .toLowerCase()
          .includes(filter.skipperFirstname) &&
        data.finalOffer?.sailor.userDetailById.lastname
          .toLowerCase()
          .includes(filter.skipperLastname) &&
        (data.ad.boat.owner.firstname
          ?.toLowerCase()
          .includes(filter.ownerFirstname) ||
          data.billing?.firstname
            .toLowerCase()
            .includes(filter.ownerFirstname)) &&
        (data.ad.boat.owner.lastname
          ?.toLowerCase()
          .includes(filter.ownerLastname) ||
          data.billing?.lastname.toLowerCase().includes(filter.ownerLastname))
      );
    };
    this.dataSource.filter = filterValue;
  }

  jobCommercial(e: any) {
    this.jobsQuery.refetch({ jobStatus: e });
  }

  updateCommercial(e: any, jobId: any) {
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
        refetchQueries: [
          { query: GET_JOBS, variables: this.searchControl.value },
        ],
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

  openModalAssigne(jobId: string){
    const dialogRef = this.dialog.open(ModalAssigneOfferComponent, {
      data: {jobId: jobId},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  cancelJob(id: any) {
    const pJobId = { pJobId: id };
    this.apollo
      .mutate({
        mutation: CANCEL_JOB,
        variables: {
          pJobId: pJobId,
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
  mailOffer(id: any) {
    this.apollo
      .mutate({
        mutation: ADMIN_MAIL_OPPORTUNITY,
        variables: {
          pJobId: id,
        },
      })
      .subscribe(({ data }: any) => {
        this.modalConfirmed.openModal();
      });
  }
  rePublish(id: any) {
    const pJobId = { pJobId: id };
    this.apollo
      .mutate({
        mutation: RE_PUBLISH_JOB,
        variables: {
          pJobId: pJobId,
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
  skipperNotation(id: any) {
    const url = `https://captnboat.com/fr/notation?id=${id}`;
    window.open(url, '_blank');
  }

  validateJob(id: any) {
    this.apollo
      .mutate({
        mutation: VALIDATE_JOB,
        variables: {
          jobId: id,
        },
      }).subscribe(({ data }: any) => {
        this.modalConfirmed.openModal();
        },
        (err: any) => {
          console.log(err);
          this.modalConfirmed.modalRejected();
      });
  }
}
