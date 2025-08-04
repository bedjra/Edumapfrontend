import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StatPrimaire, Primaire } from '../../../SERVICE/primaire';

@Component({
  selector: 'app-paiement',
  imports: [CommonModule,FormsModule  , RouterLink],
  templateUrl: './paiement.html',
  styleUrl: './paiement.css'
})
export class Paiement implements OnInit {


 
eleve = {
    classe: ''
  };
 onSearch() {
    console.log('Classe recherchée:', this.eleve.classe);
    // ici tu peux lancer ta recherche par classe
  }

  printEtudiant() {
    // ta fonction d'impression
  }

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
}
