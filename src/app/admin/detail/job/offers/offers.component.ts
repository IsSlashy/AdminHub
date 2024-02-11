import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { JOB_OFFERS } from 'src/graphql/job'; // Importez la requête GraphQL depuis votre fichier

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
  jobId: string | null = '';
  sailors: any[] = []; // Liste de sailors et leurs offres

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.route.parent?.paramMap.subscribe((param) => {
      this.jobId = param.get('id');
      this.apollo
        .query({
          query: JOB_OFFERS,
          variables: {
            jobId: this.jobId,
          },
        })
        .subscribe(({ data }: any) => {
          const offers = data.job.offers.nodes;
          const sailorMap = new Map<string, any>();

          offers.forEach((offer: any) => {
            const sailorId = offer.sailor.id;

            if (!sailorMap.has(sailorId)) {
              sailorMap.set(sailorId, {
                id: sailorId,
                avatar: offer.sailor.avatarUrl,
                firstname: offer.sailor.firstname,
                lastname: offer.sailor.userDetailById.lastname,
                offers: [],
              });
            }

            const sailorOffers = sailorMap.get(sailorId).offers;

            if (sailorOffers) {
              sailorOffers.push({
                id: offer.id,
                realPrice: offer.realPrice,
                contractType: offer.contractType,
                travelFeeExpenses: offer.travelFeeExpenses
                  ? offer.travelFeeExpenses
                  : 0,
                status: offer.status,
                token: offer.token,
              });
            }
          });

          this.sailors = Array.from(sailorMap.values());
          console.log('les sailor', this.sailors);
        });
    });
  }

  copyUrlContract(offer: any) {
    console.log(offer);

    const contentToCopy =
      'https://captnboat.com/fr/contrat-client?id=' +
      offer.id +
      '&token=' +
      offer.token;
    console.log(contentToCopy);
    navigator.clipboard.writeText(contentToCopy);
  }
}
