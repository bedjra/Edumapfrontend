import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-paiement',
  imports: [CommonModule,FormsModule  , RouterLink],
  templateUrl: './paiement.html',
  styleUrl: './paiement.css'
})
export class Paiement {
 
eleve = {
    classe: ''
  };
 onSearch() {
    console.log('Classe recherchée:', this.eleve.classe);
    // ici tu peux lancer ta recherche par classe
  }

  printEtudiant() {
    // ta fonction d'impression
  }
}
