import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CANCELED, CONFIRMED, PAID, PUBLISHED } from 'src/graphql/client';

@Component({
  selector: 'app-client-jobs',
  templateUrl: './client-jobs.component.html',
  styleUrls: ['./client-jobs.component.css'],
})
export class ClientJobsComponent {
  userId: string | null = '';
  ads: any = new Array<any>();
  activeTab: string = '';

  publishedCount: number | null = 0;
  assignedCount: number | null = 0;
  confirmdedCount: number | null = 0;
  canceledCount: number | null = 0;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.route.parent?.paramMap.subscribe((param) => {
      this.userId = param.get('id');
      this.selectPublished();
    });
  }

  selectPublished() {
    this.activeTab = 'published';
    this.apollo
      .query({
        query: PUBLISHED,
        variables: {
          userId: this.userId,
        },
        fetchPolicy: 'network-only',
      })
      .subscribe(({ data }: any) => {
        this.ads = data.user.adsAsClient.nodes;
        this.publishedCount = data.user.adsAsClient.totalCount;
        this.assignedCount = data.user.adsAsClientPaid.totalCount;
        this.confirmdedCount = data.user.adsAsClientConfirmed.totalCount;
        this.canceledCount = data.user.adsAsClientArchived.totalCount;
      });
  }

  selectPaid() {
    this.activeTab = 'paid';
    this.apollo
      .query({
        query: PAID,
        variables: {
          userId: this.userId,
        },
        fetchPolicy: 'network-only',
      })
      .subscribe(({ data }: any) => {
        this.ads = data.user.adsAsClientPaid.nodes;
        this.publishedCount = data.user.adsAsClient.totalCount;
        this.assignedCount = data.user.adsAsClientPaid.totalCount;
        this.confirmdedCount = data.user.adsAsClientConfirmed.totalCount;
        this.canceledCount = data.user.adsAsClientArchived.totalCount;
      });
  }

  selectConfirmed() {
    this.activeTab = 'confirmed';
    this.apollo
      .query({
        query: CONFIRMED,
        variables: {
          userId: this.userId,
        },
        fetchPolicy: 'network-only',
      })
      .subscribe(({ data }: any) => {
        this.ads = data.user.adsAsClientConfirmed.nodes;
        this.publishedCount = data.user.adsAsClient.totalCount;
        this.assignedCount = data.user.adsAsClientPaid.totalCount;
        this.confirmdedCount = data.user.adsAsClientConfirmed.totalCount;
        this.canceledCount = data.user.adsAsClientArchived.totalCount;
      });
  }

  selectCanceled() {
    this.activeTab = 'canceled';
    this.apollo
      .query({
        query: CANCELED,
        variables: {
          userId: this.userId,
        },
        fetchPolicy: 'network-only',
      })
      .subscribe(({ data }: any) => {
        this.ads = data.user.adsAsClientArchived.nodes;
        this.publishedCount = data.user.adsAsClient.totalCount;
        this.assignedCount = data.user.adsAsClientPaid.totalCount;
        this.confirmdedCount = data.user.adsAsClientConfirmed.totalCount;
        this.canceledCount = data.user.adsAsClientArchived.totalCount;
      });
  }
}
