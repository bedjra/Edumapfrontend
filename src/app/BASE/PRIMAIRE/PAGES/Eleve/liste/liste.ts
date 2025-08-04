import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatPrimaire, Primaire } from '../../../SERVICE/primaire';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './liste.html',
  styleUrls: ['./liste.css']
})
export class Liste implements OnInit {
  statsPrimaire: StatPrimaire[] = [];
  isLoading = true;
  
  constructor(
    private primaireService: Primaire,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // ✅ Solution garantie pour l'hydration
    if (typeof window !== 'undefined') {
      // On est côté client
      setTimeout(() => {
        this.loadStats();
      }, 200);
    }
  }

  private loadStats(): void {
    console.log('🔄 Chargement des statistiques...');
    
    this.primaireService.getStats().subscribe({
      next: (data) => {
        console.log('✅ Données reçues du serveur:', data);
        
        // ✅ Assignation avec copie complète
        this.statsPrimaire = JSON.parse(JSON.stringify(data));
        this.isLoading = false;
        
        // ✅ Force la mise à jour de la vue
        this.cdr.detectChanges();
        
        console.log('✅ statsPrimaire final:', this.statsPrimaire);
        console.log('✅ Longueur du tableau:', this.statsPrimaire.length);
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}