// Create a copy of the original Array:
const originalArray = monTableauDobjet.slice();
/////////////////////////////////////////////////////
const reconstructedArray: MyObject[] = [];

for (const sortedObject of celuiQuimInterresse) {
  const originalIndex = originalArray.findIndex(obj => obj.id === sortedObject.id);
  if (originalIndex !== -1) {
    reconstructedArray.push(originalArray[originalIndex]);
  }
}

/////////////////////////////////////////////////////

// Réassignez le tableau trié à l'index approprié dans monTableauDobjet
monTableauDobjet[0] = celuiQuimInteresse;

///////////

for (let i = 0; i < celuiQuimInteresse.length; i++) {
  monTableauDobjet[i] = celuiQuimInteresse[i];
}

/*<------------------------------------------------------------------------------------------>*/

// HTML
<textarea id="myTextarea" [(ngModel)]="description"></textarea>

//TypeScript
@Component({
  selector: 'app-my-component',
  template: `
    <textarea id="myTextarea" [(ngModel)]="description"></textarea>
    <button (click)="getValue()">Get Value</button>
  `,
})
export class MyComponent {
  description: string = '';

  @ViewChild('myTextarea') textarea: ElementRef<HTMLTextAreaElement>;

  getValue() {
    const value = this.textarea.nativeElement.value;
    console.log('Textarea value:', value);
  }
}

/*<------------------------------------------------------------------------------------------>*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ma-page',
  templateUrl: './ma-page.component.html',
  styleUrls: ['./ma-page.component.css']
})
export class MaPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // Vérifier si la page a été ouverte par le formulaire de recherche
      const estOuvertParRecherche = params['source'] === 'recherche';

      // Vérifier si le formulaire a été soumis avec succès
      const formulaireSoumis = params['submitted'] === 'true';

      // Si la page a été ouverte par le formulaire de recherche et que le formulaire a été soumis avec succès, fermer l'onglet
      if (estOuvertParRecherche && formulaireSoumis) {
        window.close();
      }
    });
  }

}

          /*<------------------------------------------>*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mon-component-recherche',
  templateUrl: './mon-component-recherche.component.html',
  styleUrls: ['./mon-component-recherche.component.css']
})
export class MonComponentRechercheComponent {

  constructor(private router: Router) { }

  onSubmit() {
    // Logique de soumission du formulaire

    // Naviguer vers une nouvelle URL avec le paramètre "submitted=true"
    this.router.navigate(['/nouvelle-page'], { queryParams: { submitted: 'true' } });
  }
}

            /*<------------------------------------------>*/

            import { Component, OnInit } from '@angular/core';
            import { ActivatedRoute } from '@angular/router';
            
            @Component({
              selector: 'app-nouvelle-page',
              templateUrl: './nouvelle-page.component.html',
              styleUrls: ['./nouvelle-page.component.css']
            })
            export class NouvellePageComponent implements OnInit {
            
              constructor(private route: ActivatedRoute) { }
            
              ngOnInit(): void {
                this.route.queryParams.subscribe(params => {
                  // Vérifie si le formulaire a été soumis avec succès
                  const formulaireSoumis = params['submitted'] === 'true';
                  if (formulaireSoumis) {
                    // Logique à exécuter après la soumission réussie du formulaire
                    console.log('Le formulaire a été soumis avec succès.');
                  }
                });
              }
            }            