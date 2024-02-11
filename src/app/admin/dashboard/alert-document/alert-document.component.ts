import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_VALID_DOCUMENTS } from 'src/graphql/expired';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-document',
  templateUrl: './alert-document.component.html',
  styleUrls: ['./alert-document.component.css'],
})
export class AlertDocumentComponent implements OnInit {
  expiredDocuments: any[] = [];
  soonToExpireDocuments: any[] = [];
  showingExpired = true;
  currentPage = 1;
  itemsPerPage = 10;

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: GET_VALID_DOCUMENTS,
      })
      .valueChanges.subscribe(({ data }: { data: any }) => {
        this.expiredDocuments = data?.Expired?.nodes ?? [];
        this.classifyValidDocuments(data?.Valid?.nodes ?? []);
      });
  }

  classifyValidDocuments(validDocuments: any[]) {
    const today = new Date();
    const soonExpireThreshold = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 365
    );

    this.soonToExpireDocuments = validDocuments.filter((doc) => {
      const expirationDate = new Date(doc.expirationDate);
      return expirationDate >= today && expirationDate < soonExpireThreshold;
    });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get paginatedDocuments() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.showingExpired
      ? this.expiredDocuments.slice(startIndex, endIndex)
      : this.soonToExpireDocuments.slice(startIndex, endIndex);
  }

  get totalDocuments() {
    return this.showingExpired
      ? this.expiredDocuments.length
      : this.soonToExpireDocuments.length;
  }

  get totalPages() {
    return Math.ceil(this.totalDocuments / this.itemsPerPage);
  }

  toggleDisplay() {
    this.showingExpired = !this.showingExpired;
    this.currentPage = 1;
  }

  redirectToSailorProfile(userId: string) {
    this.router.navigate(['/admin/sailor', userId, 'profil']);
  }
}
