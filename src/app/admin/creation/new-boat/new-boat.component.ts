import { Component, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable, map, startWith } from 'rxjs';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import {
  CREATE_BOAT,
  CREATE_BOAT_PICTURE,
  DATA_BOAT,
  GENERATE_URL,
} from 'src/graphql/creation/new-boat';

@Component({
  selector: 'app-new-boat',
  templateUrl: './new-boat.component.html',
  styleUrls: ['./new-boat.component.css'],
})
export class NewBoatComponent {
  @ViewChild(ModalConfirmedComponent) modalConfirmed!: ModalConfirmedComponent;

  boatForm: UntypedFormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    flagId: ['', [Validators.required]],
    modelId: ['', [Validators.required]],
    autoPilot: [true, [Validators.required]],
    registrationNumber: ['', []],
  });
  actualImg: string = '';
  pictures: Array<any> = [];
  countries: any;
  ownerId: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private apollo: Apollo,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  addedPicture: Array<any> = new Array();
  imgBuffer: any;
  isSubmitted: boolean = false;
  myControlFlags = new UntypedFormControl();
  filteredFlags!: Observable<{ name: string; id: string }[]>;
  file: File = new File([], '');

  ngOnInit() {
    this.route?.paramMap.subscribe((param) => {
      this.ownerId = param.get('id');
    });
    this.apollo
      .query({
        query: DATA_BOAT,
      })
      .subscribe(({ data }: any) => {
        this.countries = data.countries.nodes;
        this.filteredFlags = this.myControlFlags.valueChanges.pipe(
          startWith(''),
          map((value) => (typeof value === 'string' ? value : value.name)),
          map((name) =>
            name ? this._filterFlags(name) : this.countries.slice()
          )
        );
      });
  }

  private _filterFlags(value: string): string[] {
    const filterValue = value.toLocaleLowerCase();
    return this.countries.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  public changeFlag(e: any) {
    this.boatForm.controls['flagId'].setValue(e.option.value.id);
  }
  public displayFlag(country: any) {
    return country && country.name ? country.name : '';
  }
  public handleModelSelection(e: any) {
    this.boatForm.controls['modelId'].setValue(e.id);
  }

  private scroll(el: HTMLElement) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  }

  handleFileInput(files: any) {
    var fileType;
    fileType = files.target.files[0].type.split('/')[1];
    this.file = files.target.files[0];
    this.actualImg = URL.createObjectURL(this.file);
    console.log(this.actualImg);

    this.pictures.push(this.actualImg);
  }
  modifImage(files: any) {
    this.file = files.target.files[0];
    var fileType;
    fileType = files.target.files[0].type.split('/')[1];
    this.updatePics();
  }
  createBoat() {
    this.isSubmitted = true;

    for (const controlName in this.boatForm.controls) {
      if (this.boatForm.controls.hasOwnProperty(controlName)) {
        const control = this.boatForm.get(controlName);
        if (control && control.invalid) {
          console.log(`Le contrôle ${controlName} n'est pas valide.`);
        }
      }
    }

    const value = this.boatForm.value;
    let equipement;
    value.autoPilot === true
      ? (equipement = 'dc77a081-8d05-47c3-82d7-a76693f30afa')
      : (equipement = null);
    this.apollo
      .mutate({
        mutation: CREATE_BOAT,
        variables: {
          boatinput: {
            ownerId: this.ownerId,
            flagId: value.flagId,
            modelId: value.modelId,
            name: value.name,
            registrationNumber: value.registrationNumber,
            equipments: equipement,
          },
        },
      })
      .subscribe(
        ({ data }: any) => {
          const boatId = data.createCompleteBoat.boat.id;
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
                  mutation: CREATE_BOAT_PICTURE,
                  variables: {
                    boatPictureInput: {
                      boatPicture: {
                        boatId: boatId,
                        url:
                          data.generatePresignedPost.url +
                          '/' +
                          data.generatePresignedPost.fields.key,
                      },
                    },
                  },
                })
                .subscribe(
                  ({ data }: any) => {
                    this.router.navigateByUrl(
                      'admin/client/' + this.ownerId + '/boats'
                    );
                    console.log('boat is created successfully');
                  },
                  (err) => {
                    this.modalConfirmed.modalRejected();
                  }
                );
            });
        },
        (error) => {
          console.log('err', error);
        }
      );
  }
  updatePics() {
    // const boatId = this.idBoat;
    // this.apollo
    //   .mutate({
    //     mutation: GENERATE_URL,
    //     variables: {
    //       keyInput: {
    //         key: this.file.name,
    //       },
    //     },
    //   })
    //   .subscribe(async ({ data }: any) => {
    //     this.pictures;
    //     const formData = new FormData();
    //     formData.append('Content-Type', this.file.type);
    //     Object.entries(data.generatePresignedPost.fields).forEach(
    //       ([k, value]: any) => {
    //         formData.append(k, value);
    //       }
    //     );
    //     formData.append('file', this.file);
    //     await fetch(data.generatePresignedPost.url, {
    //       method: 'POST',
    //       body: formData,
    //     });
    //     this.apollo.mutate({
    //       mutation: CREATE_BOAT_PICTURE,
    //       variables: {
    //         boatPictureInput: {
    //           boatPicture: {
    //             boatId: boatId,
    //             url:
    //               data.generatePresignedPost.url +
    //               '/' +
    //               data.generatePresignedPost.fields.key,
    //           },
    //         },
    //       },
    //     });
    //   });
  }
}
