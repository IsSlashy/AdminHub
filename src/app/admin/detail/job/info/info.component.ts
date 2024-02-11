import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import {
  JOB,
  UPDATE_AD,
  UPDATE_JOB,
  UPDATE_SPOKENN_LANGUAGE,
} from 'src/graphql/job';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent {
  @ViewChild(ModalConfirmedComponent) modalConfirmed!: ModalConfirmedComponent;

  jobId: string | null = '';
  adId: string | null = '';
  boat: any;
  job: any;
  languages: Array<any> = [];
  commercials: Array<any> = [];
  displayedColumns: string[] = ['name'];

  jobForm: FormGroup = this.formBuilder.group({
    remuneration: [null, []],
    commission: [null, []],
    chessRemuneration: [null, []],
    civilityPref: [null, []],
    commercial1Id: [null, []],
    commissionRate: [null, []],
    fee: [null, []],
    contractType: [null, []],
    description: [null, []],
    endDate: [null, []],
    initialPrice: [null, []],
    lessor: [null, []],
    monthlyCommission: [null, []],
    monthlyRemuneration: [null, []],
    onboardFee: [null, []],
    position: [null, []],
    sleepOnBoardLastNight: [null, []],
    sleepOnBoardNightBefore: [null, []],
    sleeping: [null, []],
    startDate: [null, []],
    travelFee: [null, []],
    isCaptain: [null, []],
    jobStatus: [null, []],
    reserved: [null, []],
    premiumService: [null, []],
  });

  adForm: FormGroup = this.formBuilder.group({
    adType: [null, []],
    boatId: [null, []],
    coastDistance: [null, []],
    commercialActivity: [null, []],
    description: [null, []],
    distance: [null, []],
    endHarbor: [null, []],
    startHarbor: [null, []],
    endHarborName: [null, []],
    startHarborName: [null, []],
    estimatedDays: [null, []],
    ownerIdClient: [null, []],
    passengerNumber: [null, []],
    languages: [null, []],
  });

  constructor(
    private apollo: Apollo,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    moment.tz.setDefault('Europe/Paris');
  }

  ngOnInit() {
    this.route.parent?.paramMap.subscribe((param) => {
      this.jobId = param.get('id');
      if (this.jobId) {
        this.apollo
          .query({
            query: JOB,
            variables: { jobId: this.jobId },
          })
          .subscribe(({ data }: any) => {
            console.log('la data', data);
            this.adId = data.job.ad.id;
            this.boat = data.job.ad.boat;
            this.job = data.job;
            this.languages = data.languages.nodes;
            this.commercials = data.commercials.nodes;
            const lang = data.job.ad.spokenLanguagesByAdsId?.nodes.map(
              (elt: any) => elt.language.id
            );
            this.jobForm.patchValue({
              remuneration: data.job.remuneration,
              commission: data.job.commission,
              chessRemuneration: data.job.chessRemuneration,
              civilityPref: data.job.civilityPref,
              commercial1Id: data.job.commercial1Id,
              commissionRate: data.job.commissionRate,
              contractType: data.job.contractType,
              description: data.job.description,
              endDate: moment
                .tz(data.job.endDate, 'Europe/Paris')
                .toISOString(),
              initialPrice: data.job.initialPrice / 100,
              lessor: data.job.lessor,
              monthlyCommission: data.job.monthlyCommission,
              monthlyRemuneration: data.job.monthlyRemuneration,
              onboardFee: data.job.onboardFee,
              position: data.job.position,
              sleepOnBoardLastNight: data.job.sleepOnBoardLastNight,
              sleepOnBoardNightBefore: data.job.sleepOnBoardNightBefore,
              sleeping: data.job.sleeping,
              startDate: moment
                .tz(data.job.startDate, 'Europe/Paris')
                .toISOString(),
              travelFee: data.job.travelFee,
              isCaptain: data.job.isCaptain,
              jobStatus: data.job.jobStatus,
              fee: data.job.fee,
              reserved: data.job.reserved,
              premiumService: data.job.premiumService,
            });
            this.adForm.patchValue({
              adType: data.job.ad.adType,
              boatId: data.job.ad.boatId,
              coastDistance: data.job.ad.coastDistance,
              commercialActivity: data.job.ad.commercialActivity,
              description: data.job.ad.description,
              distance: data.job.ad.distance,
              endHarbor: data.job.ad.harborByEndHarbor?.id,
              endHarborName: data.job.ad.harborByEndHarbor?.nameFr,
              startHarbor: data.job.ad.harborByStartHarbor?.id,
              startHarborName: data.job.ad.harborByStartHarbor?.nameFr,
              estimatedDays: data.job.ad.estimatedDays,
              ownerIdClient: data.job.ad.ownerIdClient,
              passengerNumber: data.job.ad.passengerNumber,
              languages: lang,
            });
          });
      }
    });
  }

  startHarborSelection(e: any) {
    this.adForm.controls['startHarbor'].setValue(e.id);
    this.adForm.controls['startHarborName'].setValue(e.name);
  }

  endHarborSelection(e: any) {
    this.adForm.controls['endHarbor'].setValue(e.id);
    this.adForm.controls['endHarborName'].setValue(e.name);
  }

  changeBoat(event: any) {
    this.boat = event;
    this.adForm.controls['boatId'].setValue(event.id);
  }

  updateAd() {
    this.apollo
      .mutate({
        mutation: UPDATE_AD,
        refetchQueries: [{ query: JOB, variables: { jobId: this.jobId } }],
        variables: {
          adInput: {
            id: this.adId,
            patch: {
              adType: this.adForm.value.adType,
              boatId: this.adForm.value.boatId,
              coastDistance: this.adForm.value.coastDistance,
              commercialActivity: this.adForm.value.commercialActivity,
              description: this.adForm.value.description,
              distance: this.adForm.value.distance,
              endHarbor: this.adForm.value.endHarbor,
              startHarbor: this.adForm.value.startHarbor,
              estimatedDays: this.adForm.value.estimatedDays,
              ownerIdClient: this.adForm.value.ownerIdClient,
              passengerNumber: this.adForm.value.passengerNumber,
            },
          },
        },
      })
      .subscribe(({ data }: any) => {
        this.apollo
          .mutate({
            mutation: UPDATE_SPOKENN_LANGUAGE,
            variables: {
              updateLanguagesInput: {
                adId: this.adId,
                spokenLanguages: this.adForm.value.languages,
              },
            },
          })
          .subscribe(({ data }: any) => {
            this.modalConfirmed.openModal();
          });
      });
  }

  updateJob() {
    this.apollo
      .mutate({
        mutation: UPDATE_JOB,
        refetchQueries: [{ query: JOB, variables: { jobId: this.jobId } }],
        variables: {
          jobInput: {
            id: this.jobId,
            patch: {
              chessRemuneration: this.jobForm.value.chessRemuneration,
              civilityPref: this.jobForm.value.civilityPref,
              commercial1Id: this.jobForm.value.commercial1Id,
              commissionRate: this.jobForm.value.commissionRate,
              contractType: this.jobForm.value.contractType,
              description: this.jobForm.value.description,
              endDate: moment
                .tz(this.jobForm.value.endDate, 'Europe/Paris')
                .format(),
              initialPrice: this.jobForm.value.initialPrice * 100,
              lessor: this.jobForm.value.lessor,
              monthlyCommission: this.jobForm.value.monthlyCommission,
              monthlyRemuneration: this.jobForm.value.monthlyRemuneration,
              onboardFee: this.jobForm.value.onboardFee,
              position: this.jobForm.value.position,
              sleepOnBoardLastNight: this.jobForm.value.sleepOnBoardLastNight,
              sleepOnBoardNightBefore:
                this.jobForm.value.sleepOnBoardNightBefore,
              sleeping: this.jobForm.value.sleeping,
              jobStatus: this.jobForm.value.jobStatus,
              startDate: moment
                .tz(this.jobForm.value.startDate, 'Europe/Paris')
                .format(),
              travelFee: this.jobForm.value.travelFee,
              isCaptain: this.jobForm.value.isCaptain,
              pSpokenLanguage: this.jobForm.value.languages,
              reserved: this.jobForm.value.reserved,
              premiumService: this.jobForm.value.premiumService,
            },
          },
        },
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.modalConfirmed.openModal();
        },
        error: (error) => {
          console.error('Error updating job:', error);
          this.modalConfirmed.modalRejected();
        },
      });
  }
}
