import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-add',
  imports: [FormsModule,CommonModule],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add implements OnInit {
  ngOnInit(): void {
  }
currentStep: number = 1;
totalSteps: number = 3;
formSoumis: boolean = false;
loadingVisible: boolean = false;

  // Valeurs de l’étudiant et du tuteur
  etudiant: any = {};
  tuteurSelectionne: string = '';
  nouveauTuteur: any = {};
  afficherFormTuteur = false;

  // Pour démonstration, initialiser avec une liste fictive
  tuteurs = [
    { id: '1', nom: 'Koffi', prenom: 'Jean' },
    { id: '2', nom: 'Doe', prenom: 'Marie' },
  ];

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