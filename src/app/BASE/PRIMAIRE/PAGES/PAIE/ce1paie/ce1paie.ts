import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  PaiementDto,
  PaiementRequestDto,
  Primaire,
  ClassePRIMAIRE,
} from '../../../SERVICE/primaire';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../SERVICE/login-service';

@Component({
  selector: 'app-ce1paie',
  imports: [CommonModule, FormsModule, NgbModule, HttpClientModule, RouterLink],
  templateUrl: './ce1paie.html',
  styleUrl: './ce1paie.css',
})
export class Ce1paie implements OnInit {
  paiements: PaiementDto[] = [];
  selectedPaiement: PaiementDto | null = null;
  isLoading = false;
  logoBase64: string = '';

  newPaiement: PaiementRequestDto = {
    eleveNom: '',
    elevePrenom: '',
    montantActuel: 0,
    datePaiement: '',
    scolariteId: 0,
  };

  constructor(
    private primaireService: Primaire,
    private modalService: NgbModal,
    private router: Router,
    private loginService: LoginService,
    private cdr: ChangeDetectorRef // <-- à ajouter
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      // Charger les paiements avec un léger délai
      setTimeout(() => {
        this.chargerPaiements(ClassePRIMAIRE.CE1);
      }, 200);

      // Charger le logo
      this.loginService.getLogo().subscribe({
        next: (data: string) => {
          this.logoBase64 = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('❌ Erreur lors du chargement du logo :', err);
        },
      });
    }
  }

  chargerPaiements(classe: ClassePRIMAIRE) {
    this.isLoading = true;
    this.primaireService.getPaiementsParClasse(classe).subscribe({
      next: (data) => {
        this.paiements = data;
        this.isLoading = false;
        this.cdr.detectChanges(); // <-- Important ici aussi
      },
      error: (err) => {
        console.error('❌ Erreur chargement paiements:', err);
        this.isLoading = false;
        this.cdr.detectChanges(); // <-- Important ici aussi
      },
    });
  }

  openDetails(paiement: PaiementDto, modal: any) {
    this.selectedPaiement = paiement;
    this.modalService.open(modal, { size: 'lg', centered: true });
  }

  openPaiementForm(paiement: PaiementDto) {
    this.newPaiement = {
      eleveNom: paiement.eleveNom,
      elevePrenom: paiement.elevePrenom,
      montantActuel: 0,
      datePaiement: new Date().toISOString().substring(0, 10),
      scolariteId: 0,
    };
  }

  submitPaiement() {
    this.primaireService.enregistrerPaiement(this.newPaiement).subscribe({
      next: (res) => {
        this.chargerPaiements(ClassePRIMAIRE.CE1);
        this.newPaiement = {
          eleveNom: '',
          elevePrenom: '',
          montantActuel: 0,
          datePaiement: '',
          scolariteId: 0,
        };
        document.getElementById('paiementFormModal')?.click();
      },
      error: (err) => {
        console.error('Erreur paiement:', err);
      },
    });
  }

  redirectToImpression(): void {
    this.router.navigate(['/print']);
  }
}
