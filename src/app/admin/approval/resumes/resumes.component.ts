import {
  ChangeDetectorRef,
  Component,
  Input,
  SecurityContext,
} from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import {
  DELETE_RESUME,
  GENERATE_URL,
  GET_NO_RESUME,
  GET_RESUMES,
  REFUSE_DOCUMENT,
  REFUSE_RESUME,
  UPLOAD_RESUME,
  VALIDE_RESUME,
} from 'src/graphql/approval';

@Component({
  selector: 'app-resumes',
  templateUrl: './resumes.component.html',
  styleUrls: ['./resumes.component.css'],
})
export class ResumesComponent {
  @Input() searchDoc: any;

  searchDocObject: any;
  myControl = new FormControl();
  urlDocument: SafeResourceUrl = '';
  selectedResume: any;
  holderNumberCanUpdate: boolean = false;
  selectedReason: string = '';
  subscription!: Subscription;
  type: string = 'RESUME';
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
  reason: string = '';
  selectedTable: string = 'WAITING';

  constructor(
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private apollo: Apollo,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.subscription = this.apollo
      .watchQuery({
        query: GET_RESUMES,
        fetchPolicy: 'network-only',
        variables: {
          status: this.selectedTable,
        },
      })
      .valueChanges.subscribe(({ data }: any) => {
        this.searchDocObject = data;
        console.log(this.searchDocObject.resumes.nodes);
      });
  }
  ngOnChanges() {
    this.cdRef.detectChanges();
    this.searchDocObject = JSON.parse(this.searchDoc);
    console.log(this.searchDocObject, this.type);
  }
  //MODAL
  openRejectModal() {
    const modal = document.getElementById('modal-rejected');
    if (modal) {
      modal.style.display = 'block';
      modal.style.opacity = '1';
    }
  }
  openModal(resume: any) {
    console.log(resume);

    if (resume) {
      this.patchFunction(resume);
      if (
        this.modifyForm.value.holderNumber === undefined ||
        this.modifyForm.value.holderNumber
      ) {
        console.log('value is null');
        this.holderNumberCanUpdate = true;
      }
    }
    this.selectedResume = resume;
    this.urlDocument = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.selectedResume.url
    );
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block';
      modal.style.opacity = '1';
    }
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
  closeModal(modalId: string) {
    this.selectedResume = null;
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
  //UPLOAD NEW IMAGE
  handleFileInput(event: Event, userId: string) {
    console.log(event);
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
    }
    const cv = this.file;

    this.apollo
      .mutate({
        mutation: GENERATE_URL,
        variables: {
          keyInput: {
            key: cv.name,
          },
        },
      })
      .subscribe(async ({ data }: any) => {
        const formData = new FormData();
        formData.append('Content-Type', cv.type);
        Object.entries(data.generatePresignedPost.fields).forEach(
          ([k, value]: any) => {
            formData.append(k, value);
          }
        );
        formData.append('file', cv);

        await fetch(data.generatePresignedPost.url, {
          method: 'POST',
          body: formData,
        });
        console.log(
          'le url',
          data.generatePresignedPost.url +
            '/' +
            data.generatePresignedPost.fields.key
        );
        this.apollo
          .mutate({
            mutation: UPLOAD_RESUME,
            variables: {
              inputresume: {
                resume: {
                  url:
                    data.generatePresignedPost.url +
                    '/' +
                    data.generatePresignedPost.fields.key,
                  userId: userId,
                },
              },
            },
          })
          .subscribe(({ data }: any) => {
            this.getResumes();
            this.closeModal('myModal');
            console.log('on create le resume');
          });
      });
  }
  //TELECHARGER L'IMAGE
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
  //VALIDER LE CV
  validation(resume: any) {
    this.apollo
      .mutate({
        mutation: VALIDE_RESUME,
        variables: {
          inputresume: {
            pResumeId: resume.id || this.selectedResume.id,
          },
        },
        refetchQueries: [
          {
            query: GET_RESUMES,
            fetchPolicy: 'network-only',
            variables: {
              status: this.selectedTable,
            },
          },
        ],
      })
      .subscribe(({ data, loading }: any) => {
        console.log('La modif à été faite', data);
      });
    //this.skipper.updateStatus(resumeBearer.id, 'VALID');
    this.closeModal('myModal');
  }
  //REFUSER LE CV
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
        mutation: REFUSE_RESUME,
        variables: {
          inputresume: {
            pResumeId: this.selectedResume.id,
            pReason: this.selectedReason,
          },
        },
        refetchQueries: [
          {
            query: GET_RESUMES,
            fetchPolicy: 'network-only',
            variables: {
              status: this.selectedTable,
            },
          },
        ],
      })
      .subscribe(
        ({ data, loading }: any) => {
          console.log('La modif à été faite');
        },
        (error) => {
          alert(error.message);
        }
      );
    this.closeModal('myModal');
    this.closeModal('modal-rejected');
  }
  //SUPPRIMER LE CV
  deleteResume() {
    this.apollo
      .mutate({
        mutation: DELETE_RESUME,
        variables: {
          inputresume: {
            pResumeId: this.selectedResume.id,
          },
        },
        refetchQueries: [
          {
            query: GET_RESUMES,
            fetchPolicy: 'network-only',
            variables: {
              status: this.selectedTable,
            },
          },
        ],
      })
      .subscribe(({ data, loading }: any) => {
        console.log('document supprimé ');
        this.closeModal('modal-rejected');
        this.closeModal('myModal');
      });
  }
  onReasonSelected(reason: string) {
    this.reason = reason;
  }

  selectTable(table: string) {
    this.selectedTable = table;
    this.getResumes();
  }

  //GET RESUMES
  getResumes() {
    this.apollo
      .query({
        query: GET_NO_RESUME,
        fetchPolicy: 'network-only',
        variables: {
          status: this.selectedTable,
        },
      })
      .subscribe(({ data }: any) => {
        this.searchDocObject = data;
      });
  }
  //GET NO RESUME
  getNoResume() {
    this.type = 'NORESUME';
    this.apollo
      .query({
        query: GET_NO_RESUME,
      })
      .subscribe(({ data, loading }: any) => {
        let skippers = data.users.nodes.filter(
          (skipper: { preferredConnection: string }) =>
            skipper.preferredConnection === 'SAILOR'
        );
        let noResumesSkippers: any = [];
        skippers.forEach(
          (element: { resumes: { totalCount: number; nodes: any[] } }) => {
            if (element.resumes.totalCount === 0) {
              noResumesSkippers.push(element);
            } else {
              let verif = element.resumes.nodes.filter(
                (ele: any) => ele.status !== 'ACHIVED'
              );
              if (verif.length === 0) {
                noResumesSkippers.push(element);
              }
            }
          }
        );
        this.searchDocObject = data;
      });
  }
}
