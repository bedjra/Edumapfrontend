import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update',
  imports: [CommonModule, FormsModule],
  templateUrl: './update.html',
  styleUrl: './update.css',
})
export class Update {
  currentStep = 1;
formSoumis = false;
afficherFormTuteur = false;

eleve = {
  nom: '',
  prenom: '',
  dateNaiss: '',
  lieuNais: '',
  adresse: '',
  sexe: '',
  nationalite: '',
  classe: '',
  tuteurNom: '',
  tuteurPrenom: '',
  tuteurTelephone: '',
  tuteurProfession: '',
};

tuteurSelectionne: any = null;

tuteurs = [
  { id: 1, nom: 'Dupont', prenom: 'Jean' },
  { id: 2, nom: 'Martin', prenom: 'Claire' },
  // liste des tuteurs existants
];

nextStep() {
  this.formSoumis = true;

  // Par exemple, vérifier que les champs requis de l'étape sont valides
  if (this.currentStep === 1) {
    if (
      !this.eleve.nom ||
      !this.eleve.prenom ||
      !this.eleve.dateNaiss ||
      !this.eleve.lieuNais ||
      !this.eleve.adresse ||
      !this.eleve.sexe
    ) {
      return; // ne pas avancer si invalides
    }
  } else if (this.currentStep === 2) {
    if (
      !this.eleve.nationalite ||
      !this.eleve.classe ||
      (!this.tuteurSelectionne && !this.afficherFormTuteur)
    ) {
      return;
    }
  }

  this.formSoumis = false;
  this.currentStep++;
}

prevStep() {
  if (this.currentStep > 1) {
    this.currentStep--;
    this.formSoumis = false;
  }
}

basculerFormTuteur() {
  this.afficherFormTuteur = !this.afficherFormTuteur;
  if (this.afficherFormTuteur) {
    this.tuteurSelectionne = null;
  }
}

submitForm() {
  this.formSoumis = true;

  // Ici validation finale, puis traitement
  if (
    !this.eleve.nom ||
    !this.eleve.prenom ||
    !this.eleve.dateNaiss ||
    !this.eleve.lieuNais ||
    !this.eleve.adresse ||
    !this.eleve.sexe ||
    !this.eleve.nationalite ||
    !this.eleve.classe ||
    (!this.tuteurSelectionne && !this.afficherFormTuteur)
  ) {
    return;
  }

  // Envoi des données, affichage message, etc.
  alert('Formulaire soumis avec succès !');
}

}
