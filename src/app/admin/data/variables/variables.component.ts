import { Component, OnInit, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QUERY_VARIABLE, update_Variable } from 'src/graphql/data';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css'],
})
export class VariablesComponent implements OnInit {
  @ViewChild(ModalConfirmedComponent) modalConfirmed!: ModalConfirmedComponent;

  editForm: FormGroup;

  // Étape 1 : Déclaration et initialisation des variables
  variableid: string | null = null;
  variableform: any = {};
  initialFormValues: any = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private apollo: Apollo
  ) {
    this.editForm = this.fb.group({
      accident: [''],
      brutJour: [''],
      categorie12An: [''],
      categorie12Jour: [''],
      categorie12Base: [''],
      categorie12L: [''],
      categorie3An: [''],
      categorie3Base: [''],
      categorie3Jour: [''],
      categorie3L: [''],
      categorie6An: [''],
      categorie6Base: [''],
      categorie6Jour: [''],
      categorie6L: [''],
      categorie8An: [''],
      categorie8Base: [''],
      categorie8Jour: [''],
      categorie8L: [''],
      colDGH: [''],
      colEnim: [''],
      createdAt: [''],
      death: [''],
      disease: [''],
      meal: [''],
      id: [''],
      rapatriation: [''],
      // ... autres champs
    });
  }

  ngOnInit() {
    this.apollo
      .watchQuery({ query: QUERY_VARIABLE })
      .valueChanges.subscribe((result) => {
        const data = result.data as any;
        if (data && data.variables && data.variables.nodes[0]) {
          this.editForm.patchValue(data.variables.nodes[0]);
          this.variableid = data.variables.nodes[0]?.id || null;
          this.initialFormValues = { ...data.variables.nodes[0] };
        } else {
          console.error('Data not available');
        }
      });
  }

  update_Variable() {
    if (this.variableid) {
      this.apollo
        .mutate({
          mutation: update_Variable,
          refetchQueries: [
            { query: QUERY_VARIABLE, variables: { id: this.variableid } },
          ],
          variables: {
            variableInput: {
              id: this.variableid,
              patch: {
                accident: parseFloat(this.editForm.value.accident),
                brutJour: parseFloat(this.editForm.value.brutJour),
                categorie12An: parseFloat(this.editForm.value.categorie12An),
                categorie12Jour: parseFloat(
                  this.editForm.value.categorie12Jour
                ),
                categorie12Base: parseFloat(
                  this.editForm.value.categorie12Base
                ),
                categorie12L: parseFloat(this.editForm.value.categorie12L),
                categorie3An: parseFloat(this.editForm.value.categorie3An),
                categorie3Base: parseFloat(this.editForm.value.categorie3Base),
                categorie3Jour: parseFloat(this.editForm.value.categorie3Jour),
                categorie3L: parseFloat(this.editForm.value.categorie3L),
                categorie6An: parseFloat(this.editForm.value.categorie6An),
                categorie6Base: parseFloat(this.editForm.value.categorie6Base),
                categorie6Jour: parseFloat(this.editForm.value.categorie6Jour),
                categorie6L: parseFloat(this.editForm.value.categorie6L),
                categorie8An: parseFloat(this.editForm.value.categorie8An),
                categorie8Base: parseFloat(this.editForm.value.categorie8Base),
                categorie8Jour: parseFloat(this.editForm.value.categorie8Jour),
                categorie8L: parseFloat(this.editForm.value.categorie8L),
                colDGH: parseFloat(this.editForm.value.colDGH),
                colEnim: parseFloat(this.editForm.value.colEnim),
                createdAt: this.editForm.value.createdAt, // Assuming createdAt is a string date, not converting to float
                death: parseFloat(this.editForm.value.death),
                disease: parseFloat(this.editForm.value.disease),
                meal: parseFloat(this.editForm.value.meal),
                id: this.editForm.value.id, // Assuming id is a string, not converting to float
                rapatriation: parseFloat(this.editForm.value.rapatriation),
                // ... autres champs
              },
            },
          },
        })
        .subscribe(
          ({ data }: any) => {
            console.log('la mutation a réussi');
            this.modalConfirmed.openModal(); // Ouvrir le modal en cas de succès
            window.location.reload();
          },
          (error) => {
            console.error('Erreur :', error);
            this.modalConfirmed.modalRejected(); // Ouvrir le modal en cas d'erreur
          }
        );
    } else {
      console.error('variableid est null');
    }
  }

  resetForm() {
    if (this.initialFormValues) {
      this.editForm.reset(this.initialFormValues);
    } else {
      console.error('No initial values to reset to.');
    }
  }
}
