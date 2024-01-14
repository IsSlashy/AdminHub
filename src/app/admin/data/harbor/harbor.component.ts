import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { CREATE_HARBOR, GET_HARBOR, UPDATE_HARBOR } from 'src/graphql/harbor';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';

@Component({
  selector: 'app-harbor',
  templateUrl: './harbor.component.html',
  styleUrls: ['./harbor.component.css']
})
export class HarborComponent implements OnInit {
  @ViewChild(ModalConfirmedComponent) modalConfirmed!: ModalConfirmedComponent;

  ports: any[] = [];
  selectedPort: any;
  harborForm: FormGroup;
  isEditing: boolean = false;

  constructor(private fb: FormBuilder, private apollo: Apollo) {
      this.harborForm = this.fb.group({
        id: [],
        lat: [null, [Validators.required, Validators.pattern("^[0-9]*\.?[0-9]*$")]],
        lng: [null, [Validators.required, Validators.pattern("^[0-9]*\.?[0-9]*$")]],
        nameEn: [null, Validators.required],
        nameFr: [null, Validators.required],
        placeId: [null, Validators.required]
      });
  }

  ngOnInit(): void {
    // Ici, vous pourriez ajouter un appel pour récupérer et afficher la liste des ports existants
  }

  onSelectharbor(e: any){
    this.isEditing = true;
    this.selectedPort = e;
    this.harborForm.patchValue(e);
    this.apollo.query({
      query: GET_HARBOR,
      variables: {
        harborsId: e.id
      }
    }).subscribe(({data}: any) => {
      this.harborForm.patchValue({
        id: data.harbor.id,
        lat: data.harbor.lat,
        lng: data.harbor.lng,
        nameEn: data.harbor.nameEn,
        nameFr: data.harbor.nameFr,
        placeId: data.harbor.place.id
      });
    });
  }
  selectPlace(e: any){
    this.harborForm.patchValue({placeId: e.id})
  }

  openAddForm() {
    this.isEditing = false;
    this.harborForm.reset();
  }

  async onSubmit() {
    console.log('le form', this.harborForm )
    if (this.harborForm.valid) {
      if (this.isEditing) {
        // Mettez à jour le port existant
        this.apollo.mutate({
          mutation: UPDATE_HARBOR,
          variables: {
            updateharbor: {
              id: this.harborForm.value.id,
              patch: {
                nameFr: this.harborForm.value.nameFr,
                nameEn: this.harborForm.value.nameEn,
                lat: parseFloat(this.harborForm.value.lat),
                lng: parseFloat(this.harborForm.value.lng),
                placeId: this.harborForm.value.placeId
              }
            }
          }
        }).subscribe(response => {
          console.log('Port mis à jour avec succès', response);
          this.modalConfirmed.openModal();  // Ouvrir le modal en cas de succès
          this.ngOnInit();
          this.isEditing = false;
        }, error => {
          console.error('Erreur lors de la mise à jour du port', error);
          this.modalConfirmed.modalRejected();  // Ouvrir le modal en cas d'erreur
        });
      } else {
        // Créez un nouveau port
        this.apollo.mutate({
          mutation: CREATE_HARBOR,
          variables: {
            createharbor: {
              pNameFr: this.harborForm.value.nameFr,
              pNameEn: this.harborForm.value.nameEn,
              pLat: parseFloat(this.harborForm.value.lat),
              pLng: parseFloat(this.harborForm.value.lng),
            }
          }
        }).subscribe(response => {
          console.log('Port créé avec succès', response);
          this.modalConfirmed.openModal();  // Ouvrir le modal en cas de succès
          this.ngOnInit();
        }, error => {
          console.error('Erreur lors de la création du port', error);
          this.modalConfirmed.modalRejected();  // Ouvrir le modal en cas d'erreur
        });
      }
    }
  }

  resetForm() {
    this.harborForm.reset();
    this.isEditing = false;
  }
}
