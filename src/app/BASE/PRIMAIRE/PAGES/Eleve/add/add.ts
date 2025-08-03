import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Eleve } from '../../../Model/Eleve';
import { HttpClientModule } from '@angular/common/http';
import { Primaire } from '../../../SERVICE/primaire';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add implements OnInit {
  currentStep: number = 1;
  totalSteps: number = 3;
  formSoumis: boolean = false;
  loadingVisible: boolean = false;

  // Valeurs de l’étudiant et du tuteur

  eleve: Eleve = {
    nom: '',
    prenom: '',
    adresse: '',
    matricule: '',
    classe: '' as any, // initialement vide
    sexe: '' as any,
    lieuNais: '',
    etblProv: '',
    nationnalite: '',
    dateNaiss: '',

    tuteurNom: '',
    tuteurPrenom: '',
    tuteurTelephone: '',
    tuteurProfession: '',
  };

  tuteurSelectionne: number | null = null;
  nouveauTuteur: any = {};
  tuteurs: Array<{ id: number; nom: string; prenom: string }> = [];
  tuteurNomComplet: string = 'Non renseigné';

  afficherFormTuteur = false;

  ngOnInit(): void {
    this.loadTuteurs();
  }

  constructor(private primaireService: Primaire,
    private router: Router
  ) {}

  loadTuteurs() {
    this.primaireService.getTuteurs().subscribe({
      next: (data) => {
        this.tuteurs = data;
        this.updateTuteurNom(); // ← ici
      },
      error: (err) => {
        console.error('Erreur lors du chargement des tuteurs', err);
      },
    });
  }

  getTuteurNomComplet(id: number | null): string | null {
    if (id === null) return null;
    const tuteur = this.tuteurs.find((t) => t.id === id);
    return tuteur ? `${tuteur.nom} ${tuteur.prenom}` : null;
  }

  goToNextStep() {
    if (this.validateCurrentStep()) {
      this.currentStep++;
    }
  }

  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  validateCurrentStep(): boolean {
    return true;
  }

  basculerFormTuteur() {
    this.afficherFormTuteur = !this.afficherFormTuteur;

    if (this.afficherFormTuteur) {
      // Réinitialiser la sélection d’un tuteur existant si on veut en créer un nouveau
      this.tuteurSelectionne = null;
    } else {
      // Réinitialiser le formulaire de création si on revient à la sélection
      this.nouveauTuteur = {};
    }
  }

  updateTuteurNom() {
    if (this.tuteurSelectionne !== null) {
      const tuteur = this.tuteurs.find((t) => t.id === this.tuteurSelectionne);
      this.tuteurNomComplet = tuteur
        ? `${tuteur.nom} ${tuteur.prenom}`
        : 'Non renseigné';
    } else if (this.nouveauTuteur?.nom) {
      this.tuteurNomComplet = `${this.nouveauTuteur.nom} ${
        this.nouveauTuteur.prenom || ''
      }`.trim();
    } else {
      this.tuteurNomComplet = 'Non renseigné';
    }
  }
  onTuteurSelectionChange() {
    this.updateTuteurNom();
  }

 submitForm(): void {
  this.loadingVisible = true;

  this.primaireService.enregistrerEleve(this.eleve).subscribe({
    next: (data) => {
      this.loadingVisible = false;
      alert('Élève enregistré avec succès !');
      this.router.navigate(['/liste']);
    },
    error: (error) => {
      this.loadingVisible = false;
      console.error("Erreur lors de l'enregistrement de l'élève :", error);
      alert("Une erreur s'est produite lors de l'enregistrement. Veuillez réessayer.");
    }
  });
}

}
