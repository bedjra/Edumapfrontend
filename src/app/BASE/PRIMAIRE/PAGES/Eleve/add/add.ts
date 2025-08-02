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

  tuteurSelectionne: string = '';
  nouveauTuteur: any = {};
  afficherFormTuteur = false;

  getTuteurNomComplet(idStr: string): string | null {
    const id = Number(idStr); // conversion string -> number
    if (isNaN(id)) return null; // pas un id valide
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
