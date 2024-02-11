import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { NOTATION_Query, NOTATION_Mutation } from 'src/graphql/notations';

@Component({
  selector: 'app-notation',
  templateUrl: './notation.component.html',
  styleUrls: ['./notation.component.css'],
})
export class NotationComponent implements OnInit, OnDestroy {
  noteForm: FormGroup;
  entityId: string | null = null;
  notationData: any;
  private querySubscription: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {
    this.noteForm = this.formBuilder.group({
      averageNote: [
        '',
        [Validators.required, Validators.min(0), Validators.max(5)],
      ],
      noteSkill: [
        '',
        [Validators.required, Validators.min(0), Validators.max(5)],
      ],
      noteRespect: [
        '',
        [Validators.required, Validators.min(0), Validators.max(5)],
      ],
      noteCommunication: [
        '',
        [Validators.required, Validators.min(0), Validators.max(5)],
      ],
      comment: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.entityId = this.route.snapshot.paramMap.get('id');
    if (this.entityId) {
      this.querySubscription = this.apollo
        .watchQuery<any>({
          query: NOTATION_Query,
          variables: {
            notationid: this.entityId,
          },
        })
        .valueChanges.subscribe((result) => {
          this.notationData = result.data?.notation;
          this.noteForm.patchValue({
            noteSkill: this.notationData.noteSkill,
            noteRespect: this.notationData.noteRespect,
            noteCommunication: this.notationData.noteCommunication,
            comment: this.notationData.comment,
          });
        });
    }
  }

  onSubmitNote() {
    const updatedData = this.noteForm.value;
    this.apollo
      .mutate({
        mutation: NOTATION_Mutation,
        variables: {
          notationinput: {
            id: this.entityId,
            patch: {
              noteSkill: updatedData.noteSkill,
              noteRespect: updatedData.noteRespect,
              noteCommunication: updatedData.noteCommunication,
              comment: updatedData.comment,
            },
          },
        },
      })
      .subscribe(
        (response) => {
          console.log('Réponse de la mutation:', response);
        },
        (error) => {
          console.error('Erreur lors de la mutation:', error);
        }
      );
  }

  ngOnDestroy(): void {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
