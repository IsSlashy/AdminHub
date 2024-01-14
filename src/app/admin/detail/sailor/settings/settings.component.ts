import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from "apollo-angular";
import { GET_USER_SETTINGS, UPDATE_USER_NOTIFICATIONS } from "src/graphql/settings";

@Component({
  selector: 'app-settings',
  host: {
    class: 'dashboard--content'
  },
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  notificationForm: FormGroup = new FormGroup({});
  userId: string | null = null;
  idNotification: string = '';
  notifications: any;

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private route: ActivatedRoute
  ) {
    this.notificationForm = this.formBuilder.group({
      emailNewMessage: [''],
      emailNewMission: [''],
      dailyNewMission: [''],
      weeklyNewMission: [''],
      emailJobAccepted: [''],
      emailOfferRefused: [''],
      emailNotation: [''],
      emailNewOffer: [''],
      emailDocumentRefused: [''],
      emailJobConfirmed: [''],
      emailDocumentExpired: [''],
    });
  }


  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((param) => {
      this.userId = param.get('id');
      if (this.userId) {
        this.fetchUserNotifications();
      } else {
        console.error("userId n'est pas défini !");
      }
    });
  }

  private fetchUserNotifications(): void {
    this.apollo.query({
      query: GET_USER_SETTINGS,
      variables: { userId: this.userId }
    }).subscribe(({ data }: any) => {console.log('Form data',data)
      const settings = data.user?.setting;
        this.idNotification = settings.id;
        this.notifications = settings;
        console.log('Form setting',settings)
        this.notificationForm.patchValue(settings)
        console.log('Value Form',this.notificationForm);
    }, error => {
      console.error('Erreur lors de la requête GET_USER_SETTINGS:', error);
    });
  }

  updateNotif(): void {
    if (!this.idNotification) {
      console.error("ID de notification non défini !");
      return;
    }
    const formValues = this.notificationForm.value;

    const settingInput = {
      id: this.idNotification,
      patch: { ...formValues }
    };

    this.apollo.mutate({
      mutation: UPDATE_USER_NOTIFICATIONS,
      variables: { settinginput: settingInput }
    }).subscribe(({ data }: any) => {
      console.log(data, "Save Notif");
    }, error => {
      console.error('Erreur lors de la mise à jour des notifications:', error);
    });
  }
}
