import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { OFFER_CHESS } from 'src/graphql/chess';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.css'],
})
export class ChessComponent {
  offers: any = new Array<any>();
  tabWatting: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.loadOffers(false);
  }

  watting() {
    this.tabWatting = true;
    this.loadOffers(false);
  }

  done() {
    this.tabWatting = false;
    this.loadOffers(true);
  }

  loadOffers(done: boolean) {
    this.apollo
      .query({
        query: OFFER_CHESS,
        variables: { done: done },
      })
      .subscribe(({ data }: any) => {
        this.offers = data.chessOffers.nodes;
        this.sortOffersByDate();
      });
  }

  sortOffersByDate() {
    // Clone the offers array to a new array before sorting
    const sortedOffers = [...this.offers].sort((a, b) => {
      const startDateA = a.job.startDate.split(' - ')[0];
      const startDateB = b.job.startDate.split(' - ')[0];
      return Date.parse(startDateA) - Date.parse(startDateB);
    });
    this.offers = sortedOffers;
  }
}
