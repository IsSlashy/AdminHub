import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable, Subscription, map, startWith } from 'rxjs';
import {
  ADD_DOCUMENT,
  DELETE_DOCUMENT,
  GENERATE_URL,
  SAILOR_DOCS,
  UPLOAD_RESUME,
  VALIDE_DOCUMENT,
} from 'src/graphql/sailor';

export interface DocType {
  name: string;
  id: string;
  country: string;
  shortName: string;
  expiration: boolean;
}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent {
  documentForm: FormGroup = this.formBuilder.group({
    serial: [null, [Validators.required]],
    sailorId: [null, []],
    expirationDate: [null, []],
    documentType: [null, [Validators.required]],
    certificateFile: [
      null,
      [
        Validators.required,
        Validators.pattern(/\.pdf$|.png$|.docx$|.doc$|.jpeg$|.jpg/i),
      ],
    ],
  });

  private subscription: Subscription | undefined;

  userId: string | null = '';
  user: any;
  filteredOptions: Observable<DocType[]> = new Observable<DocType[]>();
  allDoc: any = new Array<any>();
  documentTypes: any = new Array<any>();
  options: Array<DocType> = [];
  docSelected: any;
  file: File = new File([], '');
  resume: any;
  userStructures: any;
refusedDegrees: any;

  get degrees() {
    return this.allDoc?.filter(
      (element: { documentType: { type: string } }) =>
        element.documentType.type === 'DEGREE'
    );
  }
  get trainings() {
    return this.allDoc?.filter(
      (element: { documentType: { type: string } }) =>
        element.documentType.type === 'TRAINING'
    );
  }
  get invalid_doc() {
    return this.allDoc?.filter(
      (element: { status: { type: string } }) =>
        element.status.type === 'INVALID'
    );
  }


  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((param) => {
      this.userId = param.get('id');
      this.subscription = this.apollo.watchQuery<any>({
        query: SAILOR_DOCS,
        variables: { userId: this.userId },
      }).valueChanges.subscribe(({ data }: any) => {
        console.log('Data reçue:', data);
          this.documentTypes = data.documentTypes?.nodes;
          this.allDoc = data.user.documents?.nodes;
          console.log('Documents reçus:', this.allDoc);
          this.resume = data.user.resumes.nodes[0];
          this.user = data.user.userDetailById;
          this.userStructures = data.user.structures?.nodes
          console.log(this.userStructures);

          this.options = [];
          data.documentTypes.nodes.forEach(
            (element: {
              name: any;
              id: any;
              country: { shortName: string; name: string };
              expiration: any;
            }) => {
              const docType: DocType = {
                name: element.name,
                id: element.id,
                country: element.country?.name,
                shortName: element.country?.shortName.toLowerCase(),
                expiration: element.expiration,
              };
              this.options.push(docType);
            }
          );

          this.filteredOptions = this.documentForm
            .get('documentType')!
            .valueChanges.pipe(
              startWith(''),
              map((value) => (typeof value === 'string' ? value : value?.name)),
              map((name) => (name ? this._filter(name) : this.options.slice()))
            );
        }
      );
    });
  }

  private _filter(docType: string): DocType[] {
    const filterValue = docType.toLowerCase();
    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  displayFn(docType: DocType): string {
    return docType && docType.name ? docType.name : '';
  }

  handleFileInput(files: any) {
    this.file = files.target.files[0];
    console.log('le file', this.file)
  }

  handleCvInput(files: any) {
    const file = files.target.files[0];
    const regex = new RegExp(/\.pdf$/i);
    console.log('on rentre dans le pdf', file);
    if (!regex.test(file.name)) {
      return;
    }

    this.apollo
      .mutate({
        mutation: GENERATE_URL,
        variables: {
          keyInput: {
            key: file.name,
          },
        },
      })
      .subscribe(async ({ data }: any) => {
        console.log('generate');
        const formData = new FormData();
        formData.append('Content-Type', file.type);
        Object.entries(data.generatePresignedPost.fields).forEach(
          ([k, value]: any) => {
            formData.append(k, value);
          }
        );
        formData.append('file', file);

        await fetch(data.generatePresignedPost.url, {
          method: 'POST',
          body: formData,
        });
        this.apollo
          .mutate({
            mutation: UPLOAD_RESUME,
            variables: {
              inputresume: {
                resume: {
                  userId: this.userId,
                  url: data.generatePresignedPost.url + '/' + data.generatePresignedPost.fields.key,
                },
              },
            },
            refetchQueries: [
              {
                query: SAILOR_DOCS,
                variables: {
                  userId: this.userId,
                },
              },
            ],
          })
          .subscribe(({ data }: any) => {
            this.resume = data.createResume.resume;
          });
      });
  }

  changeDocument(e: any) {
    console.log('le event', e.option.value);
    this.docSelected = e.option.value;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  delete(uuid: string) {
    this.apollo
      .mutate({
        mutation: DELETE_DOCUMENT,
        variables: {
          documentId: {
            pDocumentId: uuid,
          },
        },
        refetchQueries: [{
          query: SAILOR_DOCS,
          variables: { userId: this.userId,}
        }],
      })
      .subscribe(({ data }: any) => {
        console.log('la query a foncitonné');
      });
  }

  addDocument() {
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

        this.apollo
          .mutate({
            mutation: ADD_DOCUMENT,
            variables: {
              documentInput: {
                pUserId: this.userId,
                pDocumentTypeId: this.docSelected.id,
                pSailorId: this.user.sailorId,
                pDocumentUrl: data.generatePresignedPost.url + '/' + data.generatePresignedPost.fields.key,
                pSerial: this.documentForm.value.serial,
                pExpirationDate: this.documentForm.value.expirationDate? this.documentForm.value.expirationDate.toString().slice(0, 24) + 'UTC': null,
              },
            },
          })
          .subscribe(({ data }: any) => {

            this.apollo.mutate({
              mutation: VALIDE_DOCUMENT,
              variables: {
                validedocument: {
                  pDocumentId: data.addDocument.document.id,
                },
              },refetchQueries: [
                {
                  query: SAILOR_DOCS,
                  variables: {
                    userId: this.userId,
                  },
                },
              ],
            }).subscribe(({data, loading}:any) => {
              this.documentForm.reset();
              this.file = new File([], '');
            })

          });
      });
  }
}
