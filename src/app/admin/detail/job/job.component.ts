import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { CANCEL_JOB, RE_PUBLISH_JOB, PREVIEW_JOB, ADMIN_MAIL_OPPORTUNITY } from 'src/graphql/job';
import { ModalConfirmedComponent } from 'src/app/components/modal-confirmed/modal-confirmed.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalAssigneOfferComponent } from 'src/app/components/modal-assigne-offer/modal-assigne-offer.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent {
  @ViewChild(ModalConfirmedComponent)modalConfirmed!: ModalConfirmedComponent;

  jobQuery!: QueryRef<any, any>;
  jobSub!: Subscription
  jobId: any;
  job: any;
  constructor(
    private route: ActivatedRoute, private apollo: Apollo,
    public dialog: MatDialog, private router: Router
  ){}

  ngOnInit(){
    this.route.paramMap.subscribe(param => {
      this.jobId = param.get('id')
      this.jobQuery = this.apollo.watchQuery({
        query: PREVIEW_JOB,
        variables:{
          jobId: this.jobId
        }
      })

      this.jobSub = this.jobQuery.valueChanges.subscribe(({data}: any) => {
        this.job = data.job
      })
    })
  }
   ngOnDestroy(){
    this.jobSub.unsubscribe()
   }

  openDetail(){
    const url = 'https://www.captnboat.com/fr/recherche/detail-annonce?id=' + this.jobId
    window.open(url, "_blank");
  }

  mailOffer(){
    this.apollo.mutate({
      mutation: ADMIN_MAIL_OPPORTUNITY,
      variables: {
        pJobId: this.job.id,
      },
    }).subscribe(({data}: any) => {
      this.modalConfirmed.openModal()
    })
  }

  openModalAssigne(){
    const dialogRef = this.dialog.open(ModalAssigneOfferComponent, {
      data: {jobId: this.job.id},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.jobQuery.refetch({jobId: this.jobId})
    });
  }

  rePublish(sendEmail: boolean){
    const pJobId = {pJobId: this.job.id}
    this.apollo.mutate({
      mutation: RE_PUBLISH_JOB,
      variables:{
        pJobInput: {
          pJobId: this.job.id,
          sendMailOpportunity: sendEmail
        }
      },
      refetchQueries:[{
        query: PREVIEW_JOB,
        variables:{
          jobId: this.job.id
        }
      }]
    }).subscribe(({data}: any) => {
      this.modalConfirmed.openModal()
    }, (err: any) => {
      console.log(err);
      this.modalConfirmed.modalRejected()
    })
  }

  cancelJob(){
    this.apollo.mutate({
      mutation: CANCEL_JOB,
      variables:{
        pJobId: {
          pJobId: this.job.id
        }
      },
      refetchQueries:[{
        query: PREVIEW_JOB,
        variables:{
          jobId: this.job.id
        }
      }]
    }).subscribe(({data}: any) => {
      this.modalConfirmed.openModal()
    }, (err: any) => {
      console.log(err);
      this.modalConfirmed.modalRejected()
    })
  }
  navigate(route: string) {
    switch (route) {
      case 'job':
        this.router.navigate(['/admin/creation/job'],{queryParams: { adId: this.job.ad.id },})
        break;
      case 'offer':
        this.router.navigate(['/admin/creation/offer'],{queryParams: { jobId: this.job.id },})
        break;
      case 'notation':
        window.open('https://captnboat.com/fr/notation?id=' + this.job.id, '_blank')
        break;
      case 'job':
        break;
      case 'job':
        break;

      default:
        break;
    }
  }
}
