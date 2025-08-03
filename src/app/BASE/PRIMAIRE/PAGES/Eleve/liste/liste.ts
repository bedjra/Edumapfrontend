import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatPrimaire, Primaire } from '../../../SERVICE/primaire';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './liste.html',
  styleUrls: ['./liste.css'] // ✅ au pluriel
})
export class Liste implements OnInit {
  statsPrimaire: StatPrimaire[] = [];
  dataLoaded: boolean = true
  constructor(private primaireService: Primaire) {}

  ngOnInit(): void {
    this.primaireService.getStats().subscribe({
      next: (data) => {
        console.log('✅ Statistiques récupérées :', data);
        this.statsPrimaire = data;
        this.dataLoaded = true;
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement des statistiques:', err);
        this.dataLoaded = true; // même en cas d’erreur pour ne pas bloquer
      }
    });
  }
}
