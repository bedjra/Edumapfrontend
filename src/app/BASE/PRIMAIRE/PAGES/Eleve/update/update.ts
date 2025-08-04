import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Eleve } from '../../../Model/Eleve';
import { Primaire } from '../../../SERVICE/primaire';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update.html',
  styleUrls: ['./update.css'],
})
export class UpdateComponent implements OnInit {

  eleve: Eleve = {
    id: 0,
    nom: '',
    prenom: '',
    adresse: '',
    matricule: '',
    classe: '' as any, 
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

  formSoumis = false;
  currentStep = 1;
  totalSteps = 3;
  loadingVisible = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private primaireService: Primaire
  ) {}

  ngOnInit(): void {
    const eleveFromService = this.primaireService.getSelectedEleve();
    if (eleveFromService) {
      this.eleve = { ...eleveFromService }; // ✅ on copie les données
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadEleve(id);
      }
    }
  }

  loadEleve(id: string) {
    this.primaireService.getEleveById(id).subscribe({
      next: (data) => {
        this.eleve = data;
      },
      error: (err) => {
        alert('Erreur lors du chargement de l\'élève');
        console.error(err);
      }
    });
  }

  submitUpdate() {
    this.formSoumis = true;
    if (!this.validateCurrentStep()) {
      return;
    }

    this.loadingVisible = true;
    this.primaireService.updateEleve(this.eleve).subscribe({
      next: () => {
        this.loadingVisible = false;
        alert('Élève mis à jour avec succès');
      this.router.navigate(['/PRIMAIRE/liste']);
      },
      error: () => {
        this.loadingVisible = false;
        alert('Erreur lors de la mise à jour');
      }
    });
  }

  goToNextStep() {
    if (this.validateCurrentStep() && this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  validateCurrentStep(): boolean {
    if (this.currentStep === 1) {
      return !!(
        this.eleve.nom &&
        this.eleve.prenom &&
        this.eleve.dateNaiss &&
        this.eleve.lieuNais &&
        this.eleve.adresse &&
        this.eleve.sexe
      );
    }
    if (this.currentStep === 2) {
      return !!(
        this.eleve.nationnalite &&
        this.eleve.classe &&
        this.eleve.tuteurNom &&
        this.eleve.tuteurPrenom &&
        this.eleve.tuteurTelephone &&
        this.eleve.tuteurProfession
      );
    }
    return true;
  }
}
