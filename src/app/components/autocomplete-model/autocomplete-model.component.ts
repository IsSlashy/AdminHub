
import { Component, EventEmitter, Output } from "@angular/core";
import algoliasearch from "algoliasearch";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-autocomplete-model',
  templateUrl: './autocomplete-model.component.html',
  styleUrls: ['./autocomplete-model.component.css']
})
export class AutocompleteModelComponent {
  private readonly client = algoliasearch("RRJ3LLXC46", "f55797750da636098ac235e799838922");
  private readonly index = this.client.initIndex(environment.boats_algolia);
  searchTerm: any;
  suggestions: any;
  selectedSuggestion: string = "";


  @Output() onModelSelected = new EventEmitter<any>();


  fetchSuggestions(): void {
    if (this.searchTerm.length > 0) {
      this.index.search(this.searchTerm).then((response: { hits: any[]; }) => {
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
    this.onModelSelected.emit(suggestion);

  }

}
