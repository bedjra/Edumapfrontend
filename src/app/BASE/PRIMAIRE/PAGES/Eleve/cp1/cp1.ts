import { Component, OnInit } from '@angular/core';  // ajout de OnInit
import { Eleve } from '../../../Model/Eleve';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Primaire } from '../../../SERVICE/primaire';

@Component({
  selector: 'app-cp1',
  standalone: true,                      // si tu utilises Angular standalone components
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
  templateUrl: './cp1.html',
  styleUrls: ['./cp1.css']               // correction: styleUrls (pas styleUrl)
})
export class Cp1 implements OnInit {

  eleves: Eleve[] = [];
  selectedEleve?: Eleve;

  // Injection du service dans le constructeur
  constructor(private primaireService: Primaire) {}


  // Appelé automatiquement au chargement du composant
  ngOnInit(): void {
    this.primaireService.getEleves().subscribe({
      next: (data) => {
        this.eleves = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des élèves :', err);
      }
    });
  }

  openDetails(modal: any, eleve: Eleve): void {
    this.selectedEleve = eleve;
    // Ouvrir la modale, par ex avec NgbModal (à adapter si tu utilises un autre modal)
    // this.modalService.open(modal);
  }

  editEleve(matricule: string): void {
    // Code d’édition (navigation, affichage formulaire, etc.)
    console.log('Modifier élève avec matricule:', matricule);
  }

  deleteEleve(matricule: string): void {
    // Code de suppression (appel API, confirmation, etc.)
    console.log('Supprimer élève avec matricule:', matricule);
  }

  searchEleves(nom: string, prenom: string): void {
    // Code de recherche si tu veux filtrer localement ou via API
    console.log('Recherche élèves:', nom, prenom);
  }

}
