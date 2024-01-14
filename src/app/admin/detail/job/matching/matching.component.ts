import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CORRESPONDANT, OPEN_CONV } from 'src/graphql/job';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent {
  marins: any[] = [];
  languages: string[] = [];
  dataSource!: MatTableDataSource<any>;
  filteredDataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["nom", "email", "telephone", "conversation","zipcode"];
  jobId: string | null = '';


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.parent?.paramMap.subscribe(param => {
      this.jobId = param.get('id');
      this.apollo.query({ query: CORRESPONDANT, variables: { jobId: this.jobId } })
        .subscribe(({ data }: any) => {
          console.log("Réponse GraphQL:", data); // Pour le débogage
          this.marins = data.usersForJob.nodes;
          this.dataSource = new MatTableDataSource(this.marins);
          this.filteredDataSource = new MatTableDataSource(this.marins);1
          this.filteredDataSource.paginator = this.paginator;

          const languagesSet = new Set<string>();
          this.marins.forEach(marin => {
            marin.sailorSpokenLanguages.nodes.forEach((langNode: { language: { name: string; }; }) => {
              languagesSet.add(langNode.language.name);
            });
          });

          this.languages = Array.from(languagesSet);
          console.log("Langues chargées:", this.languages); // Pour le débogage
          this.cdRef.detectChanges();
        }, error => {
          console.error("Erreur GraphQL:", error);
        });
    });
  }

  filterByPostalCode(event: Event) {
    console.log("Marins après filtrage par code postal:", this.filteredDataSource.data);
    const inputElement = event.target as HTMLInputElement;
    const zipCode = inputElement.value;
    this.applyFilters(zipCode, null, null);
  }

  filterByLanguage(event: Event) {
    console.log("Marins après filtrage par langue:", this.filteredDataSource.data);
    const selectElement = event.target as HTMLSelectElement;
    const selectedLanguage = selectElement.value;

    this.filteredDataSource.data = this.marins.filter(marin =>
      marin.sailorSpokenLanguages.nodes.some((langNode: { language: { name: string; }; }) =>
        langNode.language.name === selectedLanguage));

    // Si aucune langue n'est sélectionnée, réafficher tous les marins
    if (!selectedLanguage) {
      this.filteredDataSource.data = this.marins;
    }
  }

  filterByAvailability(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const availability = selectElement.value; // Peut être 'ALL', 'reserver' ou 'non reserver'

    this.filteredDataSource.data = this.marins.filter(marin => {
      const reservedStatus = marin.userDetailById.reserved;

      // Si 'availability' est vide (tous les marins), retournez tous les marins
      if (!availability || availability === 'ALL') {
        return true;
      }

      // Filtrez en fonction du statut de réservation
      return reservedStatus === availability; // Comparer avec 'reserver' ou 'non reserver'
    });

    this.cdRef.detectChanges();
  }



  applyFilters(zipCode: string | null, language: string | null, reserved: string | null) {
    console.log("Marins après application des filtres:", this.filteredDataSource.data);
    this.filteredDataSource.data = this.marins.filter((marin: any) => {
      const matchesZip = zipCode ? marin.userDetailById.personnalAddress?.zipcode.startsWith(zipCode) : true;
      const matchesReserved = reserved !== null ? marin.userDetailById.reserved.toString() === reserved : true;
      return matchesZip && matchesReserved;
      // Note: Le filtrage par langue est ignoré ici, ajoutez la logique de filtrage par langue si nécessaire.
    });
  }

  openConv(sailorId: string) {
    console.log("Ouverture de conversation pour le marin:", sailorId);
    this.apollo.mutate({
      mutation: OPEN_CONV,
      variables: {
        openConv: {
          pJobId: this.jobId,
          pSailorId: sailorId
        }
      }
    }).subscribe(({ data }: any) => {
      this.router.navigate(['/admin/chat'], { queryParams: { jobId: this.jobId } });
    });
  }
}
