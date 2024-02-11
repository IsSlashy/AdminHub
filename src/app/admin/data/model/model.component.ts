import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import {
  CREATE_BOATMODEL,
  GET_BOATMODEL,
  UPDATE_BOATMODEL,
} from 'src/graphql/boats';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css'],
})
export class ModelComponent implements OnInit {
  @ViewChild(ModalConfirmedComponent) modalConfirmed!: ModalConfirmedComponent;

  boats: any[] = [];
  selectedBoat: any;
  boatForm: FormGroup;
  isEditing: boolean = false;
  countries: any;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo
  ) {
    this.boatForm = this.fb.group({
      id: [],
      name: [null, Validators.required],
      enginePower: [null, Validators.required],
      boatType: [null, Validators.required],
      hullLength: [null, Validators.required],
      headroom: [null, Validators.required],
      draft: [null, Validators.required],
      grossTonnage: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSelect(e: any) {
    console.log('le event', e);
    this.isEditing = true;
    this.selectedBoat = e;
    this.boatForm.patchValue(e);
    this.apollo
      .query({
        query: GET_BOATMODEL,
        variables: {
          id: e.id,
        },
      })
      .subscribe(({ data }: any) => {
        console.log('la data', data);
        if (data && data.model) {
          this.boatForm.patchValue({
            id: data.model.id,
            name: data.model.name,
            enginePower: data.model.enginePower,
            boatType: data.model.boatType,
            hullLength: data.model.hullLength,
            headroom: data.model.headroom,
            draft: data.model.draft,
            grossTonnage: data.model.grossTonnage,
          });
          console.log('le formulaire', this.boatForm.value);
        } else {
          console.error('Erreur: data.model est null ou non défini');
        }
      });
  }

  openAddForm() {
    console.log('Ouvrir le formulaire d’ajout');
    this.isEditing = false;
    this.boatForm.reset();
  }

  onSubmit() {
    console.log('Form Submitted', this.boatForm.value);

    if (this.boatForm.valid) {
      if (this.isEditing) {
        this.apollo
          .mutate({
            mutation: UPDATE_BOATMODEL,
            variables: {
              updatemodelinput: {
                id: this.boatForm.value.id,
                patch: {
                  name: this.boatForm.value.name,
                  enginePower: parseInt(this.boatForm.value.enginePower, 10),
                  boatType: this.boatForm.value.boatType,
                  hullLength: this.boatForm.value.hullLength,
                  headroom: this.boatForm.value.headroom,
                  draft: this.boatForm.value.draft,
                  grossTonnage: this.boatForm.value.grossTonnage,
                },
              },
            },
          })
          .subscribe(
            (response) => {
              console.log('Modèle de bateau mis à jour avec succès', response);
              this.modalConfirmed.openModal(); // Ouvrir le modal en cas de succès
              this.ngOnInit();
              this.isEditing = false;
            },
            (error) => {
              console.error(
                'Erreur lors de la mise à jour du modèle de bateau',
                error
              );
              this.modalConfirmed.modalRejected(); // Ouvrir le modal en cas d'erreur
            }
          );
      } else {
        this.apollo
          .mutate({
            mutation: CREATE_BOATMODEL,
            variables: {
              createcompletemodelsinput: {
                pName: this.boatForm.value.name,
                pEnginePower: parseInt(this.boatForm.value.enginePower),
                pBoatType: this.boatForm.value.boatType,
                pHullLength: this.boatForm.value.hullLength,
                pHeadroom: this.boatForm.value.headroom,
                pDraft: this.boatForm.value.draft,
                pGrossTonnage: this.boatForm.value.grossTonnage,
              },
            },
          })
          .subscribe(
            (response) => {
              console.log('Modèle de bateau créé avec succès', response);
              this.modalConfirmed.openModal(); // Ouvrir le modal en cas de succès
              this.ngOnInit();
            },
            (error) => {
              console.error(
                'Erreur lors de la création du modèle de bateau',
                error
              );
              this.modalConfirmed.modalRejected(); // Ouvrir le modal en cas d'erreur
            }
          );
      }
    }
  }

  resetForm() {
    this.boatForm.reset();
    this.isEditing = false;
  }
}
