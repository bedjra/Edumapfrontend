import {
  Component,
  OnInit,
  ChangeDetectorRef,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Eleve } from '../../../Model/Eleve';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NoteDto, Primaire } from '../../../SERVICE/primaire';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LoginService } from '../../../SERVICE/login-service';
@Component({
  selector: 'app-note3',
  imports: [CommonModule, FormsModule, NgbModule, HttpClientModule, RouterLink],
  templateUrl: './note3.html',
  styleUrl: './note3.css',
})
export class Note3 implements OnInit {
  eleves: Eleve[] = [];
  selectedEleve?: Eleve;
  isLoading = true;

  constructor(
    private primaireService: Primaire,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // ✅ Solution garantie pour l'hydration (comme dans votre exemple Liste)
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this.loadEleves();
      }, 200);
    }
    this.chargerMatieres();
  }

  private loadEleves(): void {
    this.primaireService.getElevesByClasse('CE1').subscribe({
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

  searchEleves(nom: string, prenom: string): void {
    // Filtrage local ou appel API selon votre implémentation
    console.log('Recherche élèves:', nom, prenom);
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
    'Octobre',
    'Novembre',
    'Trimestre 1',
    'Janvier',
    'Février',
    'Trimestre 2',
    'Avril',
    'Mai',
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
    const noteDto: NoteDto = {
      eleveId: this.eleveEnCours.id,
      classe: this.eleveEnCours.classe, // doit correspondre au nom exact de l'enum ClassePRIMAIRE
      evaluation: this.evaluationChoisie.toUpperCase().replace(/ /g, '_'),
      notes: Object.entries(this.notes).map(([matiere, valeur]) => ({
        // si c’est une matière dynamique => matiereId, sinon matierePrimaire
        matierePrimaire: isNaN(Number(matiere))
          ? matiere.toUpperCase()
          : undefined,
        matiereId: !isNaN(Number(matiere)) ? Number(matiere) : undefined,
        valeurNote: Number(valeur),
      })),
    };
    this.primaireService.ajouterNotes(noteDto).subscribe({
      next: (res) => {
        alert(res.message);
        modal.close();
      },
      error: (err) => {
        console.error(err);
        alert(err.error.message || '❌ Erreur lors de l’enregistrement.');
      },
    });
  }

  // Supprimer ou commenter si ce n’est plus utile
  formatMatiere(matiere: string): string {
    return matiere.charAt(0).toUpperCase() + matiere.slice(1);
  }

  voirNote(): void {}
}
