import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import {
  BOAT,
  CREATE_BOAT_PICTURE,
  DELETE_BOAT_PICTURE,
  GENERATE_URL,
  UPDATE_BOAT,
} from 'src/graphql/boat';

@Component({
  selector: 'app-boat',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.css'],
})
export class BoatComponent {
  @ViewChild(ModalConfirmedComponent) modalConfirmed!: ModalConfirmedComponent;

  boat: any;
  countries: any = new Array<any>();

  boatForm: FormGroup = this.formBuilder.group({
    name: [null, []],
    registrationNumber: [null, []],
    flagId: [null, []],
    modelId: [null, []],
    model: [null, []],
    homeHarborId: [null, []],
    homeHarbor: [null, []],
    aisUrl: [null, []],
    commercialUsage: [null, []],
    mmsiNumber: [null, []],
  });

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.apollo
        .query({
          query: BOAT,
          variables: {
            boatId: params.get('id'),
          },
        })
        .subscribe(({ data }: any) => {
          this.boat = data.boat;
          this.boatForm.patchValue({
            name: data.boat.name,
            registrationNumber: data.boat.registrationNumber,
            flagId: data.boat.flagId,
            modelId: data.boat.model?.id,
            model: data.boat.model?.name,
            homeHarborId: data.boat.homeHarbor?.id,
            homeHarbor: data.boat.homeHarbor?.name,
            aisUrl: data.boat.aisUrl,
            commercialUsage: data.boat.commercialUsage,
            mmsiNumber: data.boat.mmsiNumber,
          });
          this.countries = data.countries.nodes;
        });
    });
  }

  handleModelSelection(e: any) {
    this.boatForm.controls['modelId'].setValue(e.id);
    this.boatForm.controls['model'].setValue(e.name);
  }
  startHarborSelection(e: any) {
    this.boatForm.controls['homeHarborId'].setValue(e.id);
    this.boatForm.controls['homeHarbor'].setValue(e.name);
  }

  updateBoat() {
    this.apollo
      .mutate({
        mutation: UPDATE_BOAT,
        variables: {
          boatPatch: {
            id: this.boat.id,
            patch: {
              name: this.boatForm.value.name,
              registrationNumber: this.boatForm.value.registrationNumber,
              flagId: this.boatForm.value.flagId,
              modelId: this.boatForm.value.modelId,
              homeHarborId: this.boatForm.value.homeHarborId,
              aisUrl: this.boatForm.value.aisUrl,
              commercialUsage: this.boatForm.value.commercialUsage,
              mmsiNumber: parseInt(this.boatForm.value.mmsiNumber),
            },
          },
        },
      })
      .subscribe(
        ({ data }: any) => {
          console.log('les infos ont bien été mise a jours');
          this.modalConfirmed.openModal();
        },
        (err: any) => {
          console.log(err);
          this.modalConfirmed.modalRejected();
        }
      );
  }

  fileChangeEvent(event: any): void {
    const file = event.target.files[0];
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
            mutation: CREATE_BOAT_PICTURE,
            variables: {
              boatPictureInput: {
                boatPicture: {
                  boatId: this.boat.id,
                  url:
                    data.generatePresignedPost.url +
                    '/' +
                    data.generatePresignedPost.fields.key,
                },
              },
            },
            refetchQueries: [
              {
                query: BOAT,
              },
            ],
          })
          .subscribe(({ data }: any) => {
            console.log('created');
          });
      });
  }

  deletePic(e: any) {
    this.apollo
      .mutate({
        mutation: DELETE_BOAT_PICTURE,
        variables: {
          boatPicture: {
            boatPictureId: e.id,
          },
        },
        refetchQueries: [
          {
            query: BOAT,
          },
        ],
      })
      .subscribe(({ data }: any) => {
        console.log(data);
      });
  }
}
