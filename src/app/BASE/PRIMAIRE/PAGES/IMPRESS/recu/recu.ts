import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recu',
  imports: [CommonModule],
  templateUrl: './recu.html',
  styleUrl: './recu.css',
})
export class Recu {
  @Input() recuData: any; // Contient uniquement les infos de paiement
  @Input() config: any;


  
}
