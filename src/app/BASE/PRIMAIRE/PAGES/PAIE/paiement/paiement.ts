import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StatPaiementPrimaireDTO, Primaire } from '../../../SERVICE/primaire';

@Component({
  selector: 'app-paiement',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './paiement.html',
  styleUrls: ['./paiement.css']
})
export class Paiement implements OnInit {

  statsPrimaire: StatPaiementPrimaireDTO[] = [];
  isLoading = true;

  constructor(
    private primaireService: Primaire,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  private loadStats(): void {
    console.log('🔄 Chargement des statistiques...');

    this.primaireService.getStats().subscribe({
      next: (data) => {
        console.log('✅ Données reçues du serveur:', data);

        this.isLoading = false;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  printEtudiant() {
    window.print(); // Impression simple
  }
}
