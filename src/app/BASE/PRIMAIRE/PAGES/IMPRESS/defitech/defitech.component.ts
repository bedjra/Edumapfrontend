import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Primaire } from '../../../SERVICE/primaire';

@Component({
  selector: 'app-defitech',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './defitech.component.html',
  styleUrl: './defitech.component.css'
})
export class DefitechComponent implements OnInit {
  currentYear: number = new Date().getFullYear(); // Année actuelle
  previousYear: number = this.currentYear - 1; // Année précédente
 eleves: any[] = [];
  imageUrl: string = 'assets/img/logo.png';

  classe: string = 'CE1'; // ou récupérer dynamiquement via route ou service

  constructor(private eleveService: Primaire) {}

  ngOnInit(): void {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
    this.previousYear = this.currentYear - 1;

    this.eleveService.getElevesByClasse(this.classe).subscribe(data => {
      this.eleves = data;
    });
  }

  print(): void {
    window.print(); // Fonction d'impression
  }


  
}