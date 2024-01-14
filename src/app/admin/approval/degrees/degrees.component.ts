import { ChangeDetectorRef, Component, Input, SecurityContext } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Apollo } from 'apollo-angular';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { ARCHIVE_DOCUMENT, GENERATE_URL, GET_DEGREES, GET_DOCUMENTS, REFUSE_DOCUMENT, UPDATE_DETAILS, UPDATE_DOCUMENT, UPDATE_USER, VALIDE_DOCUMENT } from 'src/graphql/approval';


export interface User {
  name: string;
  id: string;
  shortName:string;
}
@Component({
  selector: 'app-degrees',
  templateUrl: './degrees.component.html',
  styleUrls: ['./degrees.component.css']
})
export class DegreesComponent {
  @Input() searchDoc:any
  searchDocObject: any;
  selectedTraining: any;
  filteredOptions: Observable<User[]> | undefined;
  options: Array<User> = [] ;
  myControl = new FormControl();
  urlDocument: SafeResourceUrl = '';
  subscription!: Subscription;


  modifyForm: FormGroup = this.formBuilder.group({
    type: [null, []],
    name: null,
    serial: null,
    holderName: [null,[]],
    holderNumber: [null, []],
    date: [null,[]],
    endDate: [null,[]],
    birthday:[null,[]],
  });
  file: any;
  holderNumberCanUpdate: boolean = false;
  selectedReason: string = '';
  reason: string ='';
  selectedTable: string = "WAITING";

  constructor(private cdRef: ChangeDetectorRef,
    private formBuilder: UntypedFormBuilder,
    private apollo: Apollo,
    private sanitizer: DomSanitizer,
     ){}

     ngOnInit() {

       this.apollo
      .query({
        query: GET_DOCUMENTS,
      })
      .subscribe(({ data, loading }: any) => {

        data.documentTypes.nodes.forEach((element:any) => {
          const user: User = {name: element.name, id: element.id, shortName: element.country?.shortName,};
          this.options.push(user);
        });
        this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.options.slice())
        );
      })

          //GET degrees

    this.subscription = this.apollo.watchQuery({
        query: GET_DEGREES,
        fetchPolicy:'network-only',
        variables: {
          type: 'DEGREE',
          status: this.selectedTable
        },
      }).valueChanges.subscribe(({data}:any) => {
        this.searchDocObject = data
      })

    }
ngOnChanges() {
  try {
    this.searchDocObject = JSON.parse(this.searchDoc);
  } catch (error) {
    console.error('Erreur lors de l\'analyse JSON :', error);
    this.searchDocObject = null;
  }
  this.cdRef.detectChanges();
}

private _filter(name: string): User[] {
  const filterValue = name.toLowerCase();
    return this.options.filter((option) =>
    option.name.toLowerCase().includes(filterValue)
  );
}
selectTable(table: string) {
  this.selectedTable = table;
  this.getDegrees()
}
    //GET degrees
    getDegrees(){
      this.apollo.query({
        query: GET_DEGREES,
        fetchPolicy:'network-only',
        variables: {
          type: 'DEGREE',
          status: this.selectedTable
        },
      }).subscribe(({data}:any) => {
          this.searchDocObject = data
      })
    }
changeDocument(e:any) {
  console.log('levent', e.option.value.id);
  this.modifyForm.controls['type'].setValue(e.option.value.id)
}
displayFn(user: User): string {
  return user && user.name ? user.name : '';
}

//MODAL
openRejectModal(){
  const modal = document.getElementById('modal-rejected');
  if(modal){
    modal.style.display = 'block';
    modal.style.opacity = '1';
  }
}

openModal(training: any) {
  if(training){
    this.patchFunction(training)
    if(this.modifyForm.value.holderNumber === undefined || this.modifyForm.value.holderNumber) {
      console.log('value is null');
    this.holderNumberCanUpdate = true;
  }
  }
    this.selectedTraining = training;
    this.urlDocument = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedTraining.documentUrl)
    const modal = document.getElementById('myModal');
    if(modal){
      modal.style.display = 'block';
      modal.style.opacity = '1';
    }
  }
  closeModal(modalId:string) {
    this.selectedTraining = null;
    const modal = document.getElementById(modalId);
   if(modal) modal.style.display = 'none';
  }
  //OUVRIR LE DOCUMENT
  openDocUrl(url:SafeResourceUrl){
    const urlAsString: string | null = this.sanitizer.sanitize(SecurityContext.URL, url);
    if(urlAsString)
    window.open(urlAsString, '_blank');
  }
  //PATCH VALUE
patchFunction(data:any){
  this.myControl.patchValue(data.documentType);
  this.modifyForm.patchValue({
    type: data.documentType?.id,
    name: data.documentType?.name,
    serial: data.serial,
    holderNumber: data.sailorId,
    endDate: data.expirationDate,
    birthday:data.user.birthday,
  })
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
downloadImage(url:any) {
  const urlAsString: string | null = this.sanitizer.sanitize(SecurityContext.URL, url);
  const link = document.createElement('a');
  if(urlAsString)
  link.href = urlAsString;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

//VALIDATION DU DOCUMENT
validation(degree:any) {
  console.log(degree);

  this.apollo.mutate({
    mutation: VALIDE_DOCUMENT,
    variables: {
      validedocument: {
        pDocumentId: degree.id || this.selectedTraining.id
      },
    },
    refetchQueries:  [{
      query: GET_DEGREES,
      fetchPolicy: 'network-only',
      variables:{
        type: 'DEGREE',
        status: this.selectedTable
      }
    }]
  }).subscribe(({data, loading}:any) => {
    console.log("La modif à été faite");
    this.closeModal('myModal');
  })
}
//DELETE DOCUMENT
deleteDocument(){
  this.apollo.mutate({
    mutation: ARCHIVE_DOCUMENT,
    variables: {
      docInput: {
        pDocumentId: this.selectedTraining.id
      },
    },
    refetchQueries:  [{
      query: GET_DEGREES,
      fetchPolicy: 'network-only',
      variables:{
        type: 'DEGREE',
        status: this.selectedTable
      }
    }]
  }).subscribe(({data, loading}:any) => {
    this.closeModal('myModal')
  })
}
  // Refuse document
  invalidate() {
    if (this.reason === 'AUTRE') {
      const autreInput = document.getElementById('autre') as HTMLInputElement;
      if (autreInput) {
        this.selectedReason = autreInput.value;
      }
    } else {
      this.selectedReason = this.reason;
    }
      this.apollo.mutate({
        mutation: REFUSE_DOCUMENT,
        variables: {
          refuseinput: {
            pDocumentId: this.selectedTraining.id,
            pReason: this.selectedReason
          },
        },
        refetchQueries:  [{
          query: GET_DEGREES,
          fetchPolicy: 'network-only',
          variables:{
            type: 'DEGREE',
            status: this.selectedTable
          }
        }]
      }).subscribe(({data, loading}:any) => {
        console.log("La modif à été faite");
      })
      this.closeModal('myModal');
      this.closeModal('modal-rejected')
  }
//ACCEPTER MODIFICATION
confirmModification(selectedTraining:any){
const val = new Date(this.modifyForm.controls['endDate'].value)
  const jour = val?.getDate();
  const mois = val?.getMonth() + 1;
  const annee = val?.getFullYear();
  this.modifyForm.controls['endDate'].setValue(`${annee}/${mois.toString().padStart(2, '0')}/${jour.toString().padStart(2, '0')}`)
  if(this.modifyForm.controls['endDate'].value === '1970/01/01'){
    this.modifyForm.controls['endDate'].setValue(null)
  }
  var regex = /^\s*$/;
  console.log('holdernumber',this.modifyForm.value.holderNumber,'selected doc =>', selectedTraining );
  if(regex.test(this.modifyForm.controls['holderNumber'].value)){
    var sailorNumber :string | null = null
  } else {
    sailorNumber = this.modifyForm.controls['holderNumber'].value
  }
  console.log(this.file);

  if(this.file?.name !== null && this.file?.name !== undefined){
    this.apollo.mutate({
      mutation: GENERATE_URL,
      variables: {
          keyInput: {
            key: this.file.name
          }
      }
    }).subscribe(async ({data}: any) => {
      const formData = new FormData();
      formData.append("Content-Type", this.file.type);
      Object.entries(data.generatePresignedPost.fields).forEach(([k, value]: any) => {
        formData.append(k, value);
      });
      formData.append("file", this.file);
      await fetch(data.generatePresignedPost.url, {
        method: "POST",
        body: formData,
      });
    this.closeModal('myModal');
    const controls = this.modifyForm.controls;

    this.apollo.mutate({
      mutation: UPDATE_DOCUMENT,
      variables: {
        documentInput: {
          pDocumentId: selectedTraining.id,
          pDocumentPatch:{
            serial: controls['serial'].value,
            sailorId: sailorNumber,
            documentUrl: data.generatePresignedPost.url + '/' + data.generatePresignedPost.fields.key ,
            expirationDate:  controls['endDate'].value,
            documentTypeId: controls['type'].value,
          }
        },
      },
      refetchQueries:  [{
        query: GET_DEGREES,
        fetchPolicy: 'network-only',
        variables:{
          type: 'DEGREE',
          status: this.selectedTable
        }      }]
    }).subscribe(({data, loading}:any) => {
      console.log("La modif à été faite",data);
      if(this.holderNumberCanUpdate){
        this.apollo.mutate({
          mutation:UPDATE_DETAILS,
          variables:{
            detailsInput:{
              id:selectedTraining.user.id,
              patch:{
                sailorNumber:controls['holderNumber'].value
              }
            }
          },
        }).subscribe(({data, loading}:any) => {
          console.log("mutation good ==> mtn update user", data);
          this.apollo.mutate({
            mutation:UPDATE_USER,
            variables:{
              userinput:selectedTraining.user.id,
              patch:{
                birthday:controls['birthday'].value?.toString().slice(0, 24) + 'UTC',
              }
            }
          })
        });
      }
      this.closeModal('myModal');
      this.myControl = new FormControl();
      this.modifyForm.value.holderNumber
    })
  })
  } else{

    const controls = this.modifyForm.controls;

    this.apollo.mutate({
      mutation: UPDATE_DOCUMENT,
      variables: {
        documentInput: {
          pDocumentId: selectedTraining.id,
          pDocumentPatch:{
            serial: controls['serial'].value,
            sailorId: sailorNumber,
            documentUrl: selectedTraining.documentUrl ,
            expirationDate: controls['endDate'].value,
            documentTypeId: controls['type'].value,
          }
        },
      },
      refetchQueries:  [{
        query: GET_DEGREES,
        fetchPolicy: 'network-only',
        variables:{
          type: 'DEGREE',
          status: this.selectedTable
        }      }]
    }).subscribe(({data, loading}:any) => {
      console.log("La modif à été faite",data);
      if(this.modifyForm.value.holderNumber){
        this.apollo.mutate({
          mutation:UPDATE_DETAILS,
          variables:{
            detailsInput:{
              id:selectedTraining.user.id,
              patch:{
                sailorNumber:sailorNumber
              }
            }
          },
        }).subscribe(({data, loading}:any) => {
          console.log("mutation good ==> 2", data, this.selectedTraining);
          this.apollo.mutate({
            mutation:UPDATE_USER,
            variables:{
              userinput:{
              id: selectedTraining.user.id,
              patch:{
                birthday:controls['birthday'].value?.toString().slice(0, 24) + 'UTC',
              }
              }

            }
          }).subscribe(({data, loading}:any) => {
          },(error)=>{
            console.log(error);
          }
          );
        });
      }
      this.closeModal('myModal');
      this.myControl = new FormControl();
      this.modifyForm.value.holderNumber
    })

  }
}
onReasonSelected(reason: string) {
  this.reason = reason
}

}
