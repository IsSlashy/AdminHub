import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AquaplotService } from 'src/app/_service/aquaplot.service';
import {
  BOATS_USER,
  CHESS_PRICE,
  CREATE_AD,
  CREATE_JOB,
  ESTIMATED_PRICE,
  GET_HARBOR,
} from 'src/graphql/creation';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';

@Component({
  selector: 'app-new-complete-job',
  templateUrl: './new-complete-job.component.html',
  styleUrls: ['./new-complete-job.component.css'],
})
export class NewCompleteJobComponent {
  @ViewChild(ModalConfirmedComponent)modalConfirmed!: ModalConfirmedComponent;

  jobForm: FormGroup = this.formBuilder.group({
    ownerId: ['', []],
    fee: [null, []],
    remuneration: [null, []],
    estimatedTime: [null, []],

    boatId: [null, []],
    coastDistance: [null, []],
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
    startHarbor: [null, []],
    endHarbor: [null, []],
    adType: [null, []],
    spokenLanguages: [null, []],
    description: [null, []],
    distance: [null, []],
    estimatedDays: [null, []],

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
    isCaptain: [null, []],
    reserved: [null, []],
  });

  languages: any = new Array<any>();
  countries: any = new Array<any>();
  boatsSelect: any = new Array<any>();


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

  owner: any;
  boat: any;
  startHarbor: any = null;
  endHarbor: any = null;
  daysCalcul: number = 0;
  startDate: any;
  endDate: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private apollo: Apollo,
    private aquaplotService: AquaplotService,
    private router: Router
  ) {}

  ngOnInit() {
    // initial inforamtions
    this.route.queryParamMap.subscribe((param) => {
      this.jobForm.patchValue({ ownerId: param.get('ownerId') });
      this.apollo
        .query({
          query: BOATS_USER,
          variables: {
            userId: this.jobForm.value.ownerId,
          },
        })
        .subscribe(({ data }: any) => {
          this.owner = data.user;
          this.countries = data.countries.nodes;
          this.languages = data.languages.nodes;
          this.boatsSelect = data.user.boatsByOwnerId.nodes;
        });
    });

    //subscription extimated price
    this.estimatePriceQuery = this.apollo.watchQuery<any>({
      query: ESTIMATED_PRICE,
      fetchPolicy: 'network-only',
      variables: this.estimationParam,
    });

    this.estimatePriceSubscription =
      this.estimatePriceQuery.valueChanges.subscribe(({ data }) => {
        this.jobForm.patchValue({ initialPrice: data.estimatedPrice });
      });

    // subscription chess price
    this.chessPriceQuery = this.apollo.watchQuery<any>({
      query: CHESS_PRICE,
      fetchPolicy: 'network-only',
      variables: this.chessParam,
    });

    this.chessPriceSubscription = this.chessPriceQuery.valueChanges.subscribe(
      ({ data }) => {
        this.jobForm.patchValue({
          chessRemuneration: data.apiCalculeRemuChess,
        });
      }
    );

    this.jobForm.get('ownerId')?.valueChanges.subscribe(() => {
      this.apollo
        .query({
          query: BOATS_USER,
          variables: {
            userId: this.jobForm.value.ownerId,
          },
        })
        .subscribe(({ data }: any) => {
          this.owner = data.user;
          this.countries = data.countries.nodes;
          this.languages = data.languages.nodes;
          this.boatsSelect = data.user.boatsByOwnerId.nodes;
        });
    });
    this.jobForm.get('initialPrice')?.valueChanges.subscribe((val) => {
      const fee = Math.ceil(
        (val * this.jobForm.value.commisionRate) /
          (this.jobForm.value.commisionRate + 100)
      );
      this.jobForm.patchValue({
        fee: fee,
        remunearion: val - fee,
      });
      this.chessParam.price = val;
      this.chessPriceQuery.refetch(this.chessParam);
    });
    this.jobForm.get('monthlyRemuneration')?.valueChanges.subscribe((val) => {
      this.chessParam.price = this.jobForm.value.initialPrice;
      if (val) {
        this.chessParam.duration = 25;
        this.estimationParam.duration = 25;
      } else {
        this.chessParam.duration = this.daysCalcul;
        this.estimationParam.duration = this.daysCalcul;
      }
      this.chessPriceQuery.refetch(this.chessParam);
      this.estimatePriceQuery.refetch(this.estimationParam);
    });

    this.jobForm.get('positionType')?.valueChanges.subscribe((val) => {
      this.estimationParam.positionType = val;
      this.estimatePriceQuery.refetch(this.estimationParam);
      this.chessParam.positionType = val;
    });
    this.jobForm.get('adType')?.valueChanges.subscribe((val) => {
      this.estimationParam.adType = val;
      this.chessParam.adType = val;

      this.chessPriceQuery.refetch(this.chessParam);
      this.estimatePriceQuery.refetch(this.estimationParam);
    });
    this.jobForm.get('coastDistance')?.valueChanges.subscribe((val) => {
      this.chessParam.coastDistance = val;
      this.chessPriceQuery.refetch(this.chessParam);
    });
    this.jobForm.get('startDate')?.valueChanges.subscribe((val) => {
      setTimeout(() => {
        this._daysCalcul();
      }, 300);
    });
    this.jobForm.get('endDate')?.valueChanges.subscribe((val) => {
      setTimeout(() => {
        this._daysCalcul();
      }, 300);
    });
  }

  _daysCalcul() {
    const startDate = new Date(this.jobForm.value.startDate);
    const endDate = new Date(this.jobForm.value.endDate);

    // différence des heures
    var time_diff = endDate.getTime() - startDate.getTime();
    // différence de jours

    this.daysCalcul = Math.round(time_diff / (1000 * 3600 * 24)) + 1;
    this.estimationParam.duration = this.daysCalcul;
    this.chessParam.duration = this.daysCalcul;

    if (this.jobForm.value.monthlyRemuneration && time_diff > 90) {
      this.chessParam.duration = 25;
      this.estimationParam.duration = 25;

      this.chessPriceQuery.refetch(this.chessParam);
      this.estimatePriceQuery.refetch(this.estimationParam);
    } else {
      this.chessPriceQuery.refetch(this.chessParam);
      this.estimatePriceQuery.refetch(this.estimationParam);
    }
  }

  changeBoat(e: any) {
    this.boat = e.value;
    this.jobForm.patchValue({boatId: e.value.id})
    this.estimationParam.autoPilote = this.boat.equipmentsList.some(
      (equipment: any) => equipment.name === 'autopilot'
    )
      ? true
      : false;

    this.estimationParam.boatType = this.boat.model.boatType;
    this.estimationParam.hullLength = this.boat.model.hullLength;

    this.chessParam.boatFlag = this.boat.flag.id
    this.chessPriceQuery.refetch(this.chessParam);
  }

  calculateDistance(): void {
    if (this.startHarbor && this.endHarbor) {
      let distance: number = 0;
      this.aquaplotService
        .getRoute(
          {
            lat: this.startHarbor.lat,
            lng: this.startHarbor.lng,
          },
          {
            lat: this.endHarbor.lat,
            lng: this.endHarbor.lng,
          }
        )
        .subscribe(
          (response) => {
            distance = response.features[0].properties.total_length;
          },
          (error) => {
            console.log('Http request failed (GET route) : ', error);
          },
          () => {
            this.jobForm.patchValue({ distance: distance });
            this.theoriqueTime();
          }
        );
      this.theoriqueTime();
    }
  }

  theoriqueTime() {
    const formValue = this.jobForm.value;
    if (this.boat?.model.boatType === 'MOTORBOAT') {
      const time =
        Math.round(formValue.distance / 240) > 1
          ? Math.round(formValue.distance / 240)
          : 1;
      this.jobForm.patchValue({ estimatedTime: time });
    } else {
      const time =
        Math.round(formValue.distance / 120) > 1
          ? Math.round(formValue.distance / 120)
          : 1;
      this.jobForm.patchValue({ estimatedTime: time });
    }

    this.estimationParam.startHarborLattitude = this.startHarbor.lat;
    this.estimationParam.startHarborLongitude = this.startHarbor.lng;
    this.estimationParam.endHarborLattitude = this.endHarbor.lat;
    this.estimationParam.endHarborLongitude = this.endHarbor.lng;
    this.estimationParam.estimatedTime = this.jobForm.value.estimatedTime;
    this.estimationParam.distance = this.jobForm.value.distance;
    this.estimatePriceQuery.refetch(this.estimationParam);

    this.chessParam.startHarbor = this.startHarbor.id;
    this.chessParam.endHarbor = this.endHarbor.id;
    this.chessParam.estimatedDays = this.jobForm.value.estimatedTime;
    this.chessPriceQuery.refetch(this.chessParam);
  }

  updateHarbours(e: any, start: boolean) {
    this.apollo
      .query({
        query: GET_HARBOR,
        variables: {
          harborInput: e.id,
        },
      })
      .subscribe(({ data, loading }: any) => {
        if (start) {
          this.startHarbor = data.harbor;
          this.jobForm.patchValue({ startHarbor: this.startHarbor.id });
          this.calculateDistance();
        } else {
          this.endHarbor = data.harbor;
          this.jobForm.patchValue({ endHarbor: this.endHarbor.id });
          this.calculateDistance();
        }
      });
  }

  createJob() {
    const startDateValue = this.jobForm.get('startDate')?.value;
    const endDateValue = this.jobForm.get('endDate')?.value;

    if (!startDateValue || !endDateValue) {
      console.error('Start date or end date is missing');
      return;
    }


    const toLocalISO = (dateString: string | number | Date) => {
      const date = new Date(dateString);
      const offset = date.getTimezoneOffset() * 60000;
      return new Date(date.getTime() - offset).toISOString();
    };

    const startDateISO = toLocalISO(startDateValue);
    const endDateISO = toLocalISO(endDateValue);
    this.apollo.mutate({
      mutation: CREATE_AD,
      variables: {
        adInput: {
          adType: this.jobForm.value.adType,
          boatId: this.jobForm.value.boatId,
          coastDistance: this.jobForm.value.coastDistance,
          distance: this.jobForm.value.distance,
          endHarbor: this.jobForm.value.endHarbor,
          estimatedDays: this.jobForm.value.estimatedDays,
          spokenLanguage: this.jobForm.value.spokenLanguages,
          startDate: startDateISO,
          endDate: endDateISO,
          startHarbor: this.jobForm.value.startHarbor,
          description: this.jobForm.value.description
        }
      }
    }).subscribe(({ data }: any) => {
      console.log('Ad created with ID:', data.createCompleteAd.ad.id);

      this.apollo.mutate({
        mutation: CREATE_JOB,
        variables: {
          jobInput: {
            adId: data.createCompleteAd.ad.id,
            startDate: startDateISO,
            positionType: this.jobForm.value.positionType,
            commissionRate: this.jobForm.value.commissionRate,
            endDate: endDateISO,
            initialPrice: this.jobForm.value.initialPrice * 100,
            travelFee: this.jobForm.value.travelFee,
            chessRemuneration: this.jobForm.value.chessRemuneration,
            onboardFee: this.jobForm.value.onboardFee,
            contractType: this.jobForm.value.contractType,
            isCaptain: false,
            sendEmail: this.jobForm.value.sendEmail,
            reserved: this.jobForm.value.reserved
          }
        }
      }).subscribe(({ data }: any) => {
        console.log('Job created with ID:', data.createCompleteJobAdmin.job.id);
        this.router.navigate(['admin/job/' + data.createCompleteJobAdmin.job.id]);
      }, (error) => {
        console.error('Error creating job:', error);
        this.modalConfirmed.modalRejected();
      });
    }, (error) => {
      console.error('Error creating ad:', error);
    });
  }
}
