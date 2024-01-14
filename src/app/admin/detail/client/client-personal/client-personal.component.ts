import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import { USER_CLIENT, UPDATE_USER, UPDATE_USER_DETAIL, GENERATE_URL, USER_AVATAR_UPLOAD } from 'src/graphql/client';

@Component({
  selector: 'app-client-personal',
  templateUrl: './client-personal.component.html',
  styleUrls: ['./client-personal.component.css']
})
export class ClientPersonalComponent {
onStatusChange() {
  console.log('Statut changé en:', this.userForm.value.userStatus);
}
  @ViewChild(ModalConfirmedComponent) modalConfirmed!: ModalConfirmedComponent;
  @ViewChild('imageInput') imageInput!: ElementRef;
  userForm: FormGroup;

  user: any;
  nationalities: any[] = [];
  languages: any[] = [];
  commercials: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private route: ActivatedRoute
  ) {
    this.userForm = this.formBuilder.group({
      firstname: [null, []],
      birthday: [null, []],
      civility: [null, []],
      nationality: [null, []],
      nativeLanguage: [null, []],
      favoriteCurrency: [null, []],
      userStatus: [null, []],
      pipeDriveId: [null, []],
      commissionRate: [null, []],
      phoneNumber: [null, []],
      lastname: [null, []],
      email: [null, []],
      commercialId: [null, []],
    });
  }

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(param => {
      const userId = param.get('id');
      if (userId) {
        this.apollo.query({ query: USER_CLIENT, variables: { userId } })
          .subscribe(({ data }: any) => {
            this.user = data.user;
            this.nationalities = data.nationalities.nodes;
            this.languages = data.languages.nodes;
            this.commercials = data.commercials.nodes
            this.initFormWithUserData();
          });
      }
    });
  }

  initFormWithUserData() {
    this.userForm.patchValue({
      firstname: this.user.firstname,
      birthday: this.user.birthday,
      civility: this.user.civility,
      nationality: this.user.nationality1Id,
      nativeLanguage: this.user.nativeLanguageId,
      favoriteCurrency: this.user.favoriteCurrency,
      userStatus: this.user.userStatus,
      pipeDriveId: this.user.pipeDriveId,
      commissionRate: this.user.commissionRate,
      commercialId: this.user.commercialId,
      phoneNumber: this.user.userDetailById.phoneNumber,
      lastname: this.user.userDetailById.lastname,
      email: this.user.userDetailById.email,
    });
  }


  openImageUpload() {
    this.imageInput.nativeElement.click();
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.apollo.mutate({
        mutation: GENERATE_URL,
        variables: { keyInput: { key: file.name } },
      }).subscribe(async ({ data }: any) => {
        const formData = new FormData();
        formData.append('Content-Type', file.type);
        Object.entries(data.generatePresignedPost.fields).forEach(([k, value]) => {
          formData.append(k, value as string);
        });
        formData.append('file', file);

        try {
          await fetch(data.generatePresignedPost.url, {
            method: 'POST',
            body: formData,
          });
          const imageUrl = data.generatePresignedPost.url + '/' + data.generatePresignedPost.fields.key;
          this.updateUserAvatar(imageUrl);
        } catch (error) {
          console.error("Erreur lors de l'envoi de l'image:", error);
        }
      });
    }
  }
  updateUserAvatar(imageUrl: string) {
    const userInput = { id: this.user.id, patch: { avatarUrl: imageUrl } };
    this.apollo.mutate({
      mutation: USER_AVATAR_UPLOAD,
      variables: { pfpupload: userInput }
    }).subscribe(() => {
      // Créer une nouvelle instance de l'objet user avec la nouvelle URL de l'avatar
      this.user = { ...this.user, avatarUrl: imageUrl };
      console.log('Avatar mis à jour');
    }, error => {
      console.error("Erreur lors de la mise à jour de l'avatar:", error);
    });
  }


  updateUser() {
    this.apollo.mutate({
      mutation: UPDATE_USER,
      variables: {
        userPayload: {
          id: this.user.id,
          patch: {
            firstname: this.userForm.value.firstname,
            birthday: this.userForm.value.birthday,
            civility: this.userForm.value.civility,
            nationality1Id: this.userForm.value.nationality,
            nativeLanguageId: this.userForm.value.nativeLanguage,
            favoriteCurrency: this.userForm.value.favoriteCurrency,
            userStatus: this.userForm.value.userStatus,
            pipeDriveId: this.userForm.value.pipeDriveId,
            commissionRate: this.userForm.value.commissionRate,
            commercialId: this.userForm.value.commercialId
          }
        }
      }
    }).subscribe(({ data }: any) => {
      this.apollo.mutate({
        mutation: UPDATE_USER_DETAIL,
        variables: {
          userDetailPayload: {
            id: this.user.id,
            patch: {
              phoneNumber: this.userForm.value.phoneNumber,
              lastname: this.userForm.value.lastname,
              email: this.userForm.value.email
            }
          }
        }
      }).subscribe(({ data }: any) => {
        this.modalConfirmed.openModal();
        console.log('le update job reussi');
      }, (error) => {
        console.log('error update details', error);
      });
    }, (error) => {
      console.log('update user error', error);
    });
  }
}
