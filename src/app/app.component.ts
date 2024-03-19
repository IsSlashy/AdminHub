import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser'; // Importez le service Title

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Supprimez la propriété title si elle n'est pas utilisée ailleurs dans le template
  // title = 'Admin';

  constructor(private titleService: Title) {
    this.titleService.setTitle('Captnboat Control Panel'); // Définissez le titre du document
  }

  // Le reste de votre code...
}
