import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css'],
})
export class ModelComponent {
  @ViewChild(ModalConfirmedComponent) modalConfirmed!: ModalConfirmedComponent;

  boats: any[] = [];
  selectedBoat: any;
  boatForm: FormGroup;
  isEditing: boolean = false;
  countries: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataServiceService
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

  onSelect(e: any) {
    console.log('le event', e);
    this.isEditing = true;
    this.selectedBoat = e;
    this.boatForm.patchValue(e);
    this.dataService.getBoatById(e.id).subscribe(({ data }: any) => {
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
        this.dataService.updateBoat(this.boatForm).subscribe({
          next: (response) => {
            console.log('Modèle de bateau mis à jour avec succès', response);
            this.modalConfirmed.openModal(); // Ouvrir le modal en cas de succès
            this.isEditing = false;
          },
          error: (error) => {
            console.error(
              'Erreur lors de la mise à jour du modèle de bateau',
              error
            );
            this.modalConfirmed.modalRejected(); // Ouvrir le modal en cas d'erreur
          },
        });
      } else {
        this.dataService.createBoat(this.boatForm).subscribe({
          next: (response) => {
            console.log('Modèle de bateau créé avec succès', response);
            this.modalConfirmed.openModal(); // Ouvrir le modal en cas de succès
          },
          error: (error) => {
            console.error(
              'Erreur lors de la création du modèle de bateau',
              error
            );
            this.modalConfirmed.modalRejected(); // Ouvrir le modal en cas d'erreur
          },
        });
      }
    }
  }

  resetForm() {
    this.boatForm.reset();
    this.isEditing = false;
  }
}
