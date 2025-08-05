import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Eleve } from '../../../Model/Eleve';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Primaire } from '../../../SERVICE/primaire';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cp1',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule, HttpClientModule, RouterLink],
  templateUrl: './cm1.html',
  styleUrls: ['./cm1.css'],
})
export class Cm1 implements OnInit {
  eleves: Eleve[] = [];
  selectedEleve?: Eleve;
  isLoading = true;

  constructor(
    private primaireService: Primaire,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ✅ Solution garantie pour l'hydration (comme dans votre exemple Liste)
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.loadEleves();
      }, 200);
    }
  }

  private loadEleves(): void {
    console.log('🔄 Chargement des élèves CM1...');

    this.primaireService.getElevesByClasse('CM1').subscribe({
      next: (data) => {
        console.log('✅ Données reçues du serveur:', data);

       
        // Stockage dans le service pour partage entre composants
        this.primaireService.setEleves(data);

        // Assignation locale (copie profonde si tu veux vraiment, mais pas obligatoire)
        this.eleves = JSON.parse(JSON.stringify(data));

        this.isLoading = false;

        // Forcer la détection des changements si besoin
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement des élèves :', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  openEleveModal(id: string | number, content: any) {
    const idString = id.toString(); // Convertir en string toujours
    this.primaireService.getEleveById(idString).subscribe({
      next: (eleve) => {
        console.log('Élève récupéré:', eleve); // <-- Affiche dans la console l'élève reçu
        this.selectedEleve = eleve;
        this.modalService.open(content, { size: 'lg' });
      },
      error: (err) => {
        alert("Impossible de charger les détails de l'élève");
      },
    });
  }

  editEleve(matricule: string) {
    this.primaireService.getEleveByMatricule(matricule).subscribe({
      next: (eleve) => {
        this.selectedEleve = eleve;
        this.primaireService.setSelectedEleve(eleve);
        this.router.navigate(['PRIMAIRE', 'modifier', matricule]);
      },
      error: (err) => {
        alert('Erreur lors de la récupération de l’élève pour modification');
        console.error(err);
      },
    });
  }
  

  searchEleves(nom: string, prenom: string): void {
    // Filtrage local ou appel API selon votre implémentation
    console.log('Recherche élèves:', nom, prenom);
  }
}
