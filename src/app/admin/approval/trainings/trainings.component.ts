import { ChangeDetectorRef, Component, SecurityContext } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Apollo } from 'apollo-angular';
import { Observable, Subscription, map, startWith } from 'rxjs';
import {
  ARCHIVE_DOCUMENT,
  GENERATE_URL,
  GET_TRAININGS,
  REFUSE_DOCUMENT,
  UPDATE_DETAILS,
  UPDATE_DOCUMENT,
  UPDATE_USER,
  VALIDE_DOCUMENT,
} from 'src/graphql/approval';
import { DataServiceService } from '../../services/data-service.service';

export interface User {
  name: string;
  id: string;
  shortName: string;
}

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css'],
})
export class TrainingsComponent {
  editDocument(_t23: any) {
    throw new Error('Method not implemented.');
  }

  searchDocObject: any;
  selectedTraining: any;
  filteredOptions: Observable<User[]> | undefined;
  options: Array<User> = [];
  myControl = new FormControl();
  urlDocument: SafeResourceUrl = '';
  selectedReason: string = '';

  modifyForm: FormGroup = this.formBuilder.group({
    type: [null, []],
    name: null,
    serial: null,
    holderName: [null, []],
    holderNumber: [null, []],
    date: [null, []],
    endDate: [null, []],
    birthday: [null, []],
  });
  file: any;
  holderNumberCanUpdate: boolean = false;
  reason: any;
  selectedTable: string = 'WAITING';
  searchTraining: any;
  waitingTraining: any;
  subscription!: Subscription;
  constructor(
    private cdRef: ChangeDetectorRef,
    private formBuilder: UntypedFormBuilder,
    private apollo: Apollo,
    private sanitizer: DomSanitizer,
    private dataService: DataServiceService
  ) {}
  ngOnInit() {
    this.options = [];
    this.dataService.getDocuments().subscribe(({ data }: any) => {
      data.documentTypes.nodes.forEach((element: any) => {
        const user: User = {
          name: element.name,
          id: element.id,
          shortName: element.country?.shortName,
        };
        this.options.push(user);
      });
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value.name)),
        map((name) => (name ? this._filter(name) : this.options.slice()))
      );
    });

    //GET TRAININGS
    this.subscription = this.dataService
      .watchTrainings()
      .valueChanges.subscribe(({ data }: any) => {
        this.searchTraining = data;
        if (this.selectedTable === 'WAITING') {
          this.waitingTraining = data.documents.totalCount;
        }
      });
  }

  ngOnChanges() {
    this.searchDocObject = JSON.parse(this.searchTraining);
    this.cdRef.detectChanges();
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  changeDocument(e: any) {
    console.log('levent', e.option.value.id);
    this.modifyForm.controls['type'].setValue(e.option.value.id);
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }
  //MODAL
  openModal(training: any) {
    if (training) {
      this.patchFunction(training);
      if (
        this.modifyForm.value.holderNumber === undefined ||
        this.modifyForm.value.holderNumber
      ) {
        console.log('value is null');
        this.holderNumberCanUpdate = true;
      }
    }
    this.selectedTraining = training;
    this.urlDocument = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.selectedTraining.documentUrl
    );
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block';
      modal.style.opacity = '1';
    }
  }
  openRejectModal() {
    const modal = document.getElementById('modal-rejected');
    if (modal) {
      modal.style.display = 'block';
      modal.style.opacity = '1';
    }
  }
  closeModal(modalId: string) {
    this.selectedTraining = null;
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
  }
  //OUVRIR LE DOCUMENT
  openDocUrl(url: SafeResourceUrl) {
    const urlAsString: string | null = this.sanitizer.sanitize(
      SecurityContext.URL,
      url
    );
    if (urlAsString) window.open(urlAsString, '_blank');
  }

  //PATCH VALUE
  patchFunction(data: any) {
    this.myControl.patchValue(data.documentType);
    this.modifyForm.patchValue({
      type: data.documentType?.id,
      name: data.documentType?.name,
      serial: data.serial,
      holderNumber: data.sailorId,
      endDate: data.expirationDate,
      birthday: data.user.birthday,
    });
  }
  //UPLOAD NEW IMAGE
  handleFileInput(event: Event) {
    console.log(event);
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
    }
  }

  //DONWLOAD DOC
  downloadImage(url: any) {
    const urlAsString: string | null = this.sanitizer.sanitize(
      SecurityContext.URL,
      url
    );
    const link = document.createElement('a');
    if (urlAsString) link.href = urlAsString;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  //ACCEPTER MODIFICATION
  confirmModification(selectedTraining: any) {
    const val = new Date(this.modifyForm.value.endDate);
    const jour = val?.getDate();
    const mois = val?.getMonth() + 1;
    const annee = val?.getFullYear();
    this.modifyForm.controls['endDate'].setValue(
      `${annee}/${mois.toString().padStart(2, '0')}/${jour.toString().padStart(2, '0')}`
    );

    if (this.modifyForm.controls['endDate'].value === '1970/01/01') {
      this.modifyForm.controls['endDate'].setValue(null);
    }
    console.log(this.modifyForm.controls['endDate'].value);

    let regex = /^\s*$/;
    console.log(
      'holdernumber',
      this.modifyForm.value.holderNumber,
      'selected doc =>',
      selectedTraining
    );
    if (regex.test(this.modifyForm.controls['holderNumber'].value)) {
      var sailorNumber: string | null = null;
    } else {
      sailorNumber = this.modifyForm.controls['holderNumber'].value;
    }
    console.log(this.file);

    if (this.file?.name !== null && this.file?.name !== undefined) {
      this.apollo
        .mutate({
          mutation: GENERATE_URL,
          variables: {
            keyInput: {
              key: this.file.name,
            },
          },
        })
        .subscribe(async ({ data }: any) => {
          const formData = new FormData();
          formData.append('Content-Type', this.file.type);
          Object.entries(data.generatePresignedPost.fields).forEach(
            ([k, value]: any) => {
              formData.append(k, value);
            }
          );
          formData.append('file', this.file);
          await fetch(data.generatePresignedPost.url, {
            method: 'POST',
            body: formData,
          });
          this.closeModal('myModal');
          const controls = this.modifyForm.controls;

          this.dataService
            .updateDocument(
              controls,
              sailorNumber,
              selectedTraining,
              data,
              this.selectTable
            )
            .subscribe(({ data, loading }: any) => {
              console.log('La modif à été faite', data);
              if (this.holderNumberCanUpdate) {
                this.dataService
                  .updateDetails(selectedTraining, controls)
                  .subscribe(({ data, loading }: any) => {
                    console.log('mutation good ==> mtn update user', data);
                    this.apollo.mutate({
                      mutation: UPDATE_USER,
                      variables: {
                        userinput: selectedTraining.user.id,
                        patch: {
                          birthday:
                            controls['birthday'].value
                              ?.toString()
                              .slice(0, 24) + 'UTC',
                        },
                      },
                    });
                  });
              }
              this.closeModal('myModal');
              this.myControl = new FormControl();
            });
        });
    } else {
      const controls = this.modifyForm.controls;

      this.apollo
        .mutate({
          mutation: UPDATE_DOCUMENT,
          variables: {
            documentInput: {
              pDocumentId: selectedTraining.id,
              pDocumentPatch: {
                serial: controls['serial'].value,
                sailorId: sailorNumber,
                documentUrl: selectedTraining.documentUrl,
                expirationDate: controls['endDate'].value,
                documentTypeId: controls['type'].value,
              },
            },
          },
          refetchQueries: [
            {
              query: GET_TRAININGS,
              fetchPolicy: 'network-only',
              variables: {
                type: 'TRAINING',
                status: this.selectedTable,
              },
            },
          ],
        })
        .subscribe(({ data, loading }: any) => {
          console.log('La modif à été faite', data);
          if (this.modifyForm.value.holderNumber) {
            this.apollo
              .mutate({
                mutation: UPDATE_DETAILS,
                variables: {
                  detailsInput: {
                    id: selectedTraining.user.id,
                    patch: {
                      sailorNumber: sailorNumber,
                    },
                  },
                },
              })
              .subscribe(({ data, loading }: any) => {
                console.log('mutation good ==> 2', data, this.selectedTraining);
                this.apollo
                  .mutate({
                    mutation: UPDATE_USER,
                    variables: {
                      userinput: {
                        id: selectedTraining.user.id,
                        patch: {
                          birthday:
                            controls['birthday'].value
                              ?.toString()
                              .slice(0, 24) + 'UTC',
                        },
                      },
                    },
                  })
                  .subscribe(
                    ({ data, loading }: any) => {},
                    (error) => {
                      console.log(error);
                    }
                  );
              });
          }
          this.closeModal('myModal');
          this.myControl = new FormControl();
          this.modifyForm.value.holderNumber;
        });
    }
  }
  //VALIDATION DU DOCUMENT
  validation(training: any) {
    this.apollo
      .mutate({
        mutation: VALIDE_DOCUMENT,
        variables: {
          validedocument: {
            pDocumentId: training.id || this.selectedTraining.id,
          },
        },
        refetchQueries: [
          {
            query: GET_TRAININGS,
            fetchPolicy: 'network-only',
            variables: {
              type: 'TRAINING',
              status: this.selectedTable,
            },
          },
        ],
      })
      .subscribe(({ data, loading }: any) => {
        console.log('La modif à été faite');
        this.closeModal('myModal');
      });
  }
  //REFUS DU DOCUMENT
  invalidate() {
    if (this.reason === 'AUTRE') {
      const autreInput = document.getElementById('autre') as HTMLInputElement;
      if (autreInput) {
        this.selectedReason = autreInput.value;
      }
    } else {
      this.selectedReason = this.reason;
    }

    this.apollo
      .mutate({
        mutation: REFUSE_DOCUMENT,
        fetchPolicy: 'network-only',
        variables: {
          refuseinput: {
            pDocumentId: this.selectedTraining.id,
            pReason: this.selectedReason,
          },
        },
        refetchQueries: [
          {
            query: GET_TRAININGS,
            fetchPolicy: 'network-only',
            variables: {
              type: 'TRAINING',
              status: this.selectedTable,
            },
          },
        ],
      })
      .subscribe(({ data, loading }: any) => {
        console.log('La modif à été faite');
      });
    this.closeModal('myModal');
    this.closeModal('modal-rejected');
  }

  onReasonSelected(reason: string) {
    this.reason = reason;
  }
  //DELETE DOCUMENT
  deleteDocument() {
    this.apollo
      .mutate({
        mutation: ARCHIVE_DOCUMENT,
        variables: {
          docInput: {
            pDocumentId: this.selectedTraining.id,
          },
        },
        refetchQueries: [
          {
            query: GET_TRAININGS,
            fetchPolicy: 'network-only',
            variables: {
              type: 'TRAINING',
              status: 'WAITING',
            },
          },
        ],
      })
      .subscribe(({ data, loading }: any) => {});
  }

  selectTable(table: string) {
    this.selectedTable = table;
    this.getTrainings();
  }

  getTrainings() {
    this.apollo
      .query({
        query: GET_TRAININGS,
        fetchPolicy: 'network-only',
        variables: {
          type: 'TRAINING',
          status: this.selectedTable,
        },
      })
      .subscribe(({ data }: any) => {
        this.searchTraining = data;
        if (this.selectedTable === 'WAITING') {
          this.waitingTraining = data.documents.totalCount;
        }
      });
  }
}
