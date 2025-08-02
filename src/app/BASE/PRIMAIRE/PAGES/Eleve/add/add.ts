import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Eleve } from '../../../Model/Eleve';

@Component({
  selector: 'app-add',
  imports: [FormsModule, CommonModule],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add implements OnInit {
  ngOnInit(): void {}
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

  afficherFormTuteur = false;

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
}
