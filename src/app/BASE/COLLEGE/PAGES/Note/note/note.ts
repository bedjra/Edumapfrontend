import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StatPrimaire, Primaire } from '../../../SERVICE/primaire';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-note',
  imports: [CommonModule,RouterLink],
  templateUrl: './note.html',
  styleUrl: './note.css'
})
export class Note implements OnInit {
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
    this.primaireService.getStats().subscribe({
      next: (data) => {
        // ✅ Assignation avec copie complète
        this.statsPrimaire = JSON.parse(JSON.stringify(data));
        this.isLoading = false;

        // ✅ Force la mise à jour de la vue
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
{

}
