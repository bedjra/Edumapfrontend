import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  PaiementDto,
  PaiementRequestDto,
  Primaire,
  ClassePRIMAIRE,
} from '../../../SERVICE/primaire';

import { LoginService } from '../../../SERVICE/login-service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-ce1paie',
  imports: [CommonModule, FormsModule, NgbModule, HttpClientModule, RouterLink],
  templateUrl: './ce1paie.html',
  styleUrl: './ce1paie.css',
})
export class Ce1paie implements OnInit {
  classe: string = 'CE1'; // ou dynamique selon ton contexte

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

     private sanitizer: DomSanitizer,
    private route: ActivatedRoute,

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

  redirectToImpression(): void {
    this.router.navigate(['/fiche'], {
      queryParams: { classe: this.classe }, // Assure-toi que this.classe est bien défini
    });
  }





  /******recu */

submitPaiement() {
  this.primaireService.enregistrerPaiement(this.newPaiement).subscribe({
    next: (res) => {
      this.chargerPaiements(ClassePRIMAIRE.CE1);

      if (!this.logoBase64) {
        // Charger le logo puis générer le PDF
        this.loadLogoImage();
        setTimeout(() => {
          this.genererRecuPDF(this.newPaiement);
        }, 500); // attendre un peu le temps du chargement
      } else {
        this.genererRecuPDF(this.newPaiement);
      }

      // Reset form
      this.newPaiement = {
        eleveNom: '',
        elevePrenom: '',
        montantActuel: 0,
        datePaiement: '',
        scolariteId: 0,
      };

      alert('✅ Paiement enregistré avec succès !');
    },
    error: (err) => {
      console.error('Erreur paiement:', err);
    },
  });
}
  isLoadingImage = true;


loadLogoImage(): void {
  const url = 'http://localhost:8060/api/ecole/image';
  this.isLoadingImage = true;

  this.http.get(url, { responseType: 'blob' }).subscribe({
    next: (blob: Blob) => {
      const objectURL = URL.createObjectURL(blob);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);

      // Convertir le blob en base64
      const reader = new FileReader();
      reader.onloadend = () => {
        this.logoBase64 = reader.result as string;
        this.isLoadingImage = false;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(blob);
    },
    error: (error) => {
      console.error('Erreur lors du chargement du logo:', error);
      this.isLoadingImage = false;
      this.cdr.detectChanges();
    }
  });
}


genererRecuPDF(paiement: any) {
  const doc = new jsPDF();

  // Ajouter le logo (s'il est chargé)
  if (this.logoBase64) {
    doc.addImage(this.logoBase64, 'PNG', 150, 5, 40, 20); 
  }

  // Numéro de reçu + Date en haut
  doc.setFontSize(10);
  doc.text(`N° Reçu: ${new Date().getTime()}`, 10, 10);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 160, 10);

  // Titre centré
  doc.setFontSize(18);
  doc.text('Reçu de Paiement - École Primaire', 105, 20, { align: 'center' });

  // Encadré infos élève
  doc.setFontSize(12);
  doc.rect(8, 25, 194, 30); 
  doc.text(`Nom: ${paiement.eleveNom}`, 12, 35);
  doc.text(`Prénom: ${paiement.elevePrenom}`, 12, 42);
  doc.text(`Date paiement: ${paiement.datePaiement}`, 12, 49);

  // Tableau du paiement
  autoTable(doc, {
    startY: 60,
    head: [['Description', 'Montant (FCFA)']],
    body: [
      ['Frais de scolarité', paiement.montantActuel.toLocaleString()],
    ],
  });

  // Signature
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(10);
  doc.text("Signature:", 150, pageHeight - 30);
  doc.line(170, pageHeight - 30, 200, pageHeight - 30);

  // Pied de page
  doc.text('Merci pour votre paiement', 10, pageHeight - 20);

  // Télécharger le PDF à la fin
  doc.save(`recu_${paiement.eleveNom}_${paiement.elevePrenom}.pdf`);
}







}
