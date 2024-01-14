import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import {
  CONFIRM_EMAIL,
  DELETE_CLIENT,
  DELETE_SAILOR,
  FORGOT_PASSWORD,
  MANAGEMENT_QUERY,
  UPDATE_USER_DETAILS,
  UPDATE_USERS,
} from 'src/graphql/management';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface User {
  id: number;
  firstname: string;
  preferredConnection: string;
  createdAt: string;
  commercialId: number;
  clientType?: string;
  userDetailById: {
    lastname: string;
    phoneNumber: string;
    email: string;
    captnBoatApproved: boolean;
    captnBoatBlacklisted: boolean;
  };
}

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
})
export class ManagementComponent {
  @ViewChild(ModalConfirmedComponent) modalConfirmed!: ModalConfirmedComponent;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  users: Array<any> = [];
  commercials: Array<any> = [];
  pageIndex: number = 0;
  usersQuery!: QueryRef<any, any>;
  private usersSub!: Subscription;
  readonly formControl: FormGroup;

  allUsers: any[] = [];
  filteredData: any;
  dataSource!: MatTableDataSource<User>;

  displayedColumns: string[] = [
    'infos',
    'firstname',
    'lastname',
    'phone',
    'email',
    'commercial',
    'action',
    'preferredConnection',
    'clientType'
  ];

  constructor(private apollo: Apollo, private formBuilder: FormBuilder) {
    this.formControl = this.formBuilder.group({
      firstname: '',
      lastname: '',
      email: '',
      phoneNumber: '',
    });
  }

  ngOnInit(): void {
    this.usersQuery = this.apollo.watchQuery({
      query: MANAGEMENT_QUERY,
      variables: { userCondition: {} },
    });

    this.usersSub = this.usersQuery.valueChanges.subscribe(({ data }: any) => {
      this.allUsers = data.users.nodes;
      this.users = [...this.allUsers];
      this.dataSource = new MatTableDataSource<User>(this.users);
      this.dataSource.paginator = this.paginator;
      this.commercials = data.commercials.nodes;
      this.applyFilter('');
    });

    this.formControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        const filter = {
          firstname: value.firstname.toLowerCase(),
          lastname: value.lastname.toLowerCase(),
          phoneNumber: value.phoneNumber.toLowerCase(),
          email: value.email.toLowerCase(),
        };

        this.applyFilter(filter);
      });
  }

  applyFilter(filterValue: any) {
    this.dataSource.filterPredicate = (data: User, filter: any) => {
      return (
        data.firstname?.toLowerCase().includes(filter.firstname) &&
        data.userDetailById.lastname?.toLowerCase().includes(filter.lastname) &&
        data.userDetailById.phoneNumber?.toLowerCase().includes(filter.phoneNumber) &&
        data.userDetailById.email?.toLowerCase().includes(filter.email)
      );
    };

    this.dataSource.filter = filterValue;
  }

  refetch(type: string | null) {
    this.dataSource = new MatTableDataSource<User>(this.users);
    if (type === null){
      this.usersQuery.refetch({userCondition:{}})
    }else {
      this.usersQuery.refetch({userCondition:{preferredConnection: type}})
    }
  }
  captnboatUsers(){
  const users = this.users.filter(user => user.userDetailById.email.includes('@captnboat.com'))
   this.dataSource = new MatTableDataSource<User>(users);
  }

  getUrl(user: any) {
    const url =
      user.preferredConnection === 'CLIENT'
        ? '/admin/client/'
        : '/admin/sailor/';
    return url + user.id;
  }
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    this.pageIndex = event.pageIndex;
    const endIndex = startIndex + event.pageSize;
    this.dataSource.data = this.filteredData.slice(startIndex, endIndex);
  }
  password(email: string) {
    this.apollo
      .mutate({
        mutation: FORGOT_PASSWORD,
        variables: {
          emailInput: {
            email: email,
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

  email(userId: string) {
    this.apollo
      .mutate({
        mutation: CONFIRM_EMAIL,
        variables: {
          userPayload: {
            pUserId: userId,
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

  updateCommercial(e: any, userId: any) {
    this.apollo
      .mutate({
        mutation: UPDATE_USERS,
        variables: {
          userPayload: {
            id: userId,
            patch: {
              commercialId: e,
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
  }

  blacklisted(user: any) {
    const boolean = user.userDetailById.captnBoatBlacklisted ? false : true;
    this.apollo
      .mutate({
        mutation: UPDATE_USER_DETAILS,
        variables: {
          userPayload: {
            id: user.id,
            patch: {
              captnBoatBlacklisted: boolean,
            },
          },
        },
        refetchQueries: [{ query: MANAGEMENT_QUERY }],
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

  approved(user: any) {
    const boolean = user.userDetailById.captnBoatApproved ? false : true;
    this.apollo
      .mutate({
        mutation: UPDATE_USER_DETAILS,
        variables: {
          userPayload: {
            id: user.id,
            patch: {
              captnBoatApproved: boolean,
            },
          },
        },
        refetchQueries: [{ query: MANAGEMENT_QUERY }],
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

  deleteSailor(sailorId: any) {
    this.apollo
      .mutate({
        mutation: DELETE_SAILOR,
        variables: {
          sailorid: {
            pUserId: sailorId,
          },
        },
      })
      .subscribe(
        ({ data }: any) => {
          console.log(data);
          this.modalConfirmed.openModal();
        },
        (err: any) => {
          console.log(err);
          this.modalConfirmed.modalRejected();
        }
      );
  }

  deleteClient(clientId: any) {
    this.apollo
      .mutate({
        mutation: DELETE_CLIENT,
        variables: {
          clientid: {
            pUserId: clientId,
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
}
