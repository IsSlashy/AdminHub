import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css'],
})
export class NewOfferComponent {
  @ViewChild(ModalConfirmedComponent) modalConfirmed!: ModalConfirmedComponent;

  offerForm: FormGroup = this.formBuilder.group({
    pSailorId: [null, []],
    sailorfirstname: [null, []],
    sailorlastname: [null, []],
    location: ['Paris', []],
    pJobId: [null, []],
    price: [null, []],
    chessRemuneration: [null, []],
    contractType: [null, []],
    onboardFee: [null, []],
    travelFee: [null, []],
    travelFeeExpenses: [null, []],
  });
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dataService: DataServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.offerForm.patchValue({
        pSailorId: params.get('sailorId'),
        pJobId: params.get('jobId'),
      });
      this.loadSkipper(null);
      this.dataService.getJobById(params.get('jobId'))
        .subscribe({
          next: ({ data }: any) => {
            this.offerForm.patchValue({
              price: data.job.realPrice,
              chessRemuneration: data.job?.chessRemuneration,
            })
          }
        })
    });

    this.offerForm.get('pSailorId')?.valueChanges
      .subscribe({
        next: val => this.loadSkipper(val)
      })
  }

  loadSkipper(val: string | null) {
    const id = val ? val : this.offerForm.value.pSailorId;
    if (id === null) return;
    this.dataService.getSailorInfoById(id)
      .subscribe(({ data }: any) => {
        this.offerForm.patchValue({
          sailorfirstname: data.user.firstname,
          sailorlastname: data.user.userDetailById.lastname,
        });
      });
  }

  createOffer() {
    this.loading = true;
    this.dataService.generateSignature(this.offerForm.value.sailorfirstname, this.offerForm.value.sailorlastname)
      .subscribe(
        ({ data }: any) => {
          this.dataService.createOffer(this.offerForm, data)
            .subscribe(
              ({ data }: any) => {
                this.router.navigateByUrl(
                  'admin/offer/' + data.newOfferAdmin.offer.id
                );
              },
              (err) => {
                this.modalConfirmed.modalRejected();
                this.loading = false;
              }
            );
        },
        (err) => {
          this.modalConfirmed.modalRejected();
          this.loading = false;
        }
      );
  }
}
