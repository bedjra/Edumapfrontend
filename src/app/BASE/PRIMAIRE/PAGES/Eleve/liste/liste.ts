import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  
  constructor(private primaireService: Primaire) {}

  ngOnInit(): void {
    // ✅ Attendre que l'hydration soit terminée
    setTimeout(() => {
      this.primaireService.getStats().subscribe({
        next: (data) => {
          console.log('✅ Données chargées après hydration:', data);
          this.statsPrimaire = data;
        },
        error: (err) => {
          console.error('❌ Erreur:', err);
        }
      });
    }, 100); // Petit délai pour laisser l'hydration se terminer
  }
}