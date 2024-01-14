import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from "@angular/core";
import algoliasearch from "algoliasearch";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-autocomplete-harbor',
  templateUrl: './autocomplete-harbor.component.html',
  styleUrls: ['./autocomplete-harbor.component.css']
})
export class AutocompleteHarborComponent {
  private readonly client = algoliasearch("RRJ3LLXC46", "f55797750da636098ac235e799838922");
  private readonly index = this.client.initIndex(environment.harbors_algolia);
  searchTerm: any;
  suggestions: any;
  selectedSuggestion: string = "";

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(target: any) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.suggestions = [];
    }
  }
  @Output() onPortSelected = new EventEmitter<any>();
  @Input() whichHarbor : string = '';
  fetchSuggestions(): void {
    if (this.searchTerm.length > 0) {
      this.index.search(this.searchTerm).then((response) => {
        this.suggestions = response.hits.map((hit: any) => hit);
      });
    } else {
      this.suggestions = [];
    }
  }
  selectSuggestion(suggestion: any): void {
    this.selectedSuggestion = suggestion;
    this.searchTerm = suggestion.name;
    this.suggestions = []; // Réinitialiser la liste des suggestions
    this.onPortSelected.emit(suggestion);

  }
}
