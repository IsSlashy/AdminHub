import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import { CHESS_PRICE, CREATE_JOB, ESTIMATED_PRICE, GET_AD } from 'src/graphql/creation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.css'],
})
export class NewJobComponent {
  @ViewChild(ModalConfirmedComponent)modalConfirmed!: ModalConfirmedComponent;

  jobForm: FormGroup = this.formBuilder.group({
    adId:[null, []],
    positionType: [null, []],
    commissionRate: [18, []],
    contractType: [null, []],
    monthlyRemuneration: [false, []],
    initialPrice: [null, []],
    chessRemuneration: [null, []],
    travelFee: [null, []],
    onboardFee: [null, []],
    sleepOnBoardLastNight: [null, []],
    sleepOnBoardNightBefore: [null, []],
    sleeping: [null, []],
    sendEmail: [true, []],
    reserved: [null, []],
  });
  ad: any;
  autoPilot: boolean = true;
  daysCalcul: number = 0;

  estimatePriceQuery!: QueryRef<any>;
  private estimatePriceSubscription!: Subscription;
  estimationParam: {
    duration: number | null;
    hullLength: number | null;
    boatType: string | null;
    autoPilote: boolean;
    adType: string | null;
    endHarborLattitude: number | null;
    endHarborLongitude: number | null;
    startHarborLattitude: number | null;
    startHarborLongitude: number | null;
    positionType: string | null;
    estimatedTime: number | null;
    distance: number | null;
  } = {
    duration: null,
    hullLength: null,
    boatType: null,
    autoPilote: true,
    adType: null,
    endHarborLattitude: null,
    endHarborLongitude: null,
    startHarborLattitude: null,
    startHarborLongitude: null,
    positionType: null,
    estimatedTime: 0,
    distance: null,
  };

  chessPriceQuery!: QueryRef<any>;
  private chessPriceSubscription!: Subscription;
  chessParam: {
    positionType: string | null;
    price: string | null;
    adType: string | null;
    startHarbor: string | null;
    endHarbor: string | null;
    coastDistance: string | null;
    duration: number | null;
    estimatedDays: number | null;
    boatFlag: string | null;
  } = {
    positionType: null,
    price: null,
    adType: null,
    startHarbor: null,
    endHarbor: null,
    coastDistance: null,
    duration: null,
    estimatedDays: 0,
    boatFlag: null,
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apollo: Apollo,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((param) => {
      this.jobForm.patchValue({ adId: param.get('adId') });
    });

    this.apollo.query({
      query: GET_AD,
      variables: {
        adInput : this.jobForm.value.adId,
      }
    }).subscribe(({data}:any) =>{
      this.ad = data.ad
      this.autoPilot = data.ad.boat.boatEquipments.nodes.some(
        (el: any) => el.equipment.name === 'PILOTE_AUTO'
      );
      this.estimationParam.estimatedTime = data.ad.estimatedDays;
      this.estimationParam.adType = data.ad.adType;
      this.estimationParam.distance = data.ad.distance;
      this.estimationParam.hullLength = data.ad.boat.model.hullLength;
      this.estimationParam.boatType = data.ad.boat.model.boatType;
      this.estimationParam.autoPilote = this.autoPilot;
      this.estimationParam.endHarborLattitude = data.ad.harborByEndHarbor.lat;
      this.estimationParam.endHarborLongitude = data.ad.harborByEndHarbor.lng;
      this.estimationParam.startHarborLattitude = data.ad.harborByStartHarbor.lat;
      this.estimationParam.startHarborLongitude = data.ad.harborByStartHarbor.lng;

      this.chessParam.adType = data.ad.adType;
      this.chessParam.boatFlag = data.ad.boat.flag.id;
      this.chessParam.startHarbor = data.ad.harborByStartHarbor.id;
      this.chessParam.endHarbor = data.ad.harborByEndHarbor.id;
      this.chessParam.coastDistance = data.ad.coastDistance;
      this.chessParam.estimatedDays = data.ad.estimatedDays;

      this.estimatePriceQuery = this.apollo.watchQuery<any>({
        query: ESTIMATED_PRICE,
        fetchPolicy: 'network-only',
        variables: this.estimationParam,
      });

      this.estimatePriceSubscription =
        this.estimatePriceQuery.valueChanges.subscribe(({ data }) => {
          this.jobForm.patchValue({ initialPrice: data.estimatedPrice });
        });


      this.chessPriceQuery = this.apollo.watchQuery<any>({
        query: CHESS_PRICE,
        variables: this.chessParam,
      });

      this.chessPriceSubscription = this.chessPriceQuery.valueChanges.subscribe(
        ({ data }) => {
          this.jobForm.patchValue({
            chessRemuneration: data.apiCalculeRemuChess,
          });
        }
      );
    })
    this.jobForm.get('monthlyRemuneration')?.valueChanges.subscribe((val) => {
      this.jobForm.value.monthlyRemuneration = val;

      this._daysCalcul();
      this.chessParam.price = this.jobForm.value.price;
      this.chessPriceQuery.refetch(this.chessParam);

      if (val) {
        this.chessParam.duration = 30;
        this.estimationParam.duration = 30;
        this.chessParam.duration = 30;
      } else {
        this.chessParam.duration = this.daysCalcul;
        this.estimationParam.duration = this.daysCalcul;
      }
      this.chessPriceQuery.refetch(this.chessParam);
      this.estimatePriceQuery.refetch(this.estimationParam);
    });

    this.jobForm.get('initialPrice')?.valueChanges.subscribe((val) => {
      this.jobForm.value.price = val;
      this.chessParam.price = val;
      this.chessPriceQuery.refetch(this.chessParam);
    });

    this.jobForm.get('positionType')?.valueChanges.subscribe((val) => {
      this._daysCalcul();
      setTimeout(() => {
        this.chessParam.positionType = val;
        this.estimationParam.positionType = val;
        this.chessPriceQuery.refetch(this.chessParam);
        this.estimatePriceQuery.refetch(this.estimationParam);
      }, 300);
    });
  }

  _daysCalcul() {
    const startDate = new Date(this.ad.startDate);
    const endDate = new Date(this.ad.endDate);

    var time_diff = endDate.getTime() - startDate.getTime();
    // différence de jours
    let duration = time_diff / (1000 * 60 * 60 * 24) + 1;
    this.jobForm.value.commisionRate = duration < 30 ? 18 : 10;
    if (duration >= 0) {
      this.daysCalcul = Math.ceil(duration);
    } else {
      this.daysCalcul = 1;
    }

    this.estimationParam.duration = this.daysCalcul;
    this.chessParam.duration = this.daysCalcul;

    if (this.daysCalcul > 365) {
      this.jobForm.patchValue({monthlyRemuneration: true})
    }
  }

  createJob() {
    this.apollo
      .mutate({
        mutation: CREATE_JOB,
        variables: {
          jobInput: {
            adId: this.jobForm.value.adId,
            positionType: this.jobForm.value.positionType,
            commissionRate: this.jobForm.value.commissionRate,
            startDate: this.ad.startDate,
            endDate: this.ad.endDate,
            initialPrice: this.jobForm.value.initialPrice * 100,
            travelFee: this.jobForm.value.travelFee,
            chessRemuneration: this.jobForm.value.chessRemuneration,
            onboardFee: this.jobForm.value.onboardFee,
            contractType: this.jobForm.value.contractType,
            isCaptain: false,
            sendEmail: this.jobForm.value.sendEmail,
            monthlyRemuneration: this.jobForm.value.monthlyRemuneration,
            reserved: this.jobForm.value.reserved
          },
        },
      })
      .subscribe(({ data }: any) => {
        this.router.navigate([
          'admin/job/' + data.createCompleteJobAdmin.job.id,
        ]);
      }, (err) =>{
        this.modalConfirmed.modalRejected()
      });
  }
}
