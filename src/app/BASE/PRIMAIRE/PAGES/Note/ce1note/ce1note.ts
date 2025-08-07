import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from 'express';
import { Eleve } from '../../../Model/Eleve';
import { LoginService } from '../../../SERVICE/login-service';
import { Primaire } from '../../../SERVICE/primaire';

@Component({
  selector: 'app-ce1note',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule, HttpClientModule, RouterLink],
  templateUrl: './ce1note.html',
  styleUrl: './ce1note.css',
})
export class Ce1note implements OnInit {
  eleves: Eleve[] = [];
  selectedEleve?: Eleve;
  isLoading = true;

  constructor(
    private primaireService: Primaire,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private authService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
 
    this.chargerMatieres();
  }



  /***************** */
  /*************** */
  /*******NOTES */

  @ViewChild('modalNote', { static: true }) modalNote!: TemplateRef<any>; // <= CECI EST OBLIGATOIRE

  matieres: string[] = []; // Retiré si tu avais ça
  listeMatieres: any[] = [];
  enumMatieres: string[] = [];
  matieresFusionnees: string[] = [];

  evaluationChoisie: string = '';
  notes: { [key: string]: number } = {};
  etape = 1;
  eleveEnCours: any;

  evaluations = [
    'Mois 1',
    'Mois 2',
    'Trimestre 1',
    'Mois 4',
    'Mois 5',
    'Trimestre 2',
    'Mois 7',
    'Mois 8',
    'Trimestre 3',
  ];

  chargerMatieres() {
    this.primaireService.getMatieres().subscribe({
      next: (data) => {
        this.listeMatieres = data.dbMatieres.filter(
          (m) => m.nom && m.nom.trim() !== ''
        );
        this.enumMatieres = data.enumMatieres;

        const matieresDb = this.listeMatieres.map((m) => m.nom);
        const matieresEnum = this.enumMatieres;

        // Fusion des deux, sans doublons
        const fusion = [...new Set([...matieresDb, ...matieresEnum])];

        this.matieresFusionnees = fusion;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des matières', err);
      },
    });
  }

  ouvrirModalNote(eleve: any) {
    this.eleveEnCours = eleve;
    this.etape = 1;
    this.evaluationChoisie = '';
    this.notes = {};
    this.chargerMatieres();

    const modalRef = this.modalService.open(this.modalNote, { size: 'lg' });

    setTimeout(() => {
      const modalElement = document.querySelector('.modal-body select');
      if (modalElement) {
        (modalElement as HTMLElement).focus();
      }
    }, 100);
  }

  passerEtape2() {
    if (!this.evaluationChoisie) {
      alert('Veuillez choisir une évaluation.');
      return;
    }
    this.etape = 2;
  }

  enregistrerNotes(modal: any) {
    const noteDto = {
      eleveId: this.eleveEnCours.id,
      classe: this.eleveEnCours.classe,
      evaluation: this.evaluationChoisie.toUpperCase().replace(/ /g, '_'),
      notes: Object.entries(this.notes).map(
        ([matierePrimaire, valeurNote]) => ({
          matierePrimaire: matierePrimaire.toUpperCase(),
          valeurNote,
        })
      ),
    };

    this.primaireService.ajouterNotes(noteDto).subscribe({
      next: () => {
        alert('✅ Notes enregistrées avec succès.');
        modal.close();
      },
      error: (err) => {
        console.error(err);
        alert('❌ Erreur lors de l’enregistrement.');
      },
    });
  }

  // Supprimer ou commenter si ce n’est plus utile
  formatMatiere(matiere: string): string {
    return matiere.charAt(0).toUpperCase() + matiere.slice(1);
  }

  voirNote(): void {}
}
