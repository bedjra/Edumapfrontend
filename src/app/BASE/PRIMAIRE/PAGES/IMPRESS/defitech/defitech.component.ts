import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Primaire } from '../../../SERVICE/primaire';
import { LoginService } from '../../../SERVICE/login-service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-defitech',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './defitech.component.html',
  styleUrls: ['./defitech.component.css'],
})
export class DefitechComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  previousYear: number = this.currentYear - 1;
  eleves: any[] = [];  // à remplacer par Eleve[] si possible
  imageUrl?: SafeUrl;
  classe: string = 'CP1'; // valeur par défaut

  constructor(
    private eleveService: Primaire,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Si tu souhaites récupérer la classe depuis un paramètre de requête URL
    this.route.queryParams.subscribe(params => {
      if (params['classe']) {
        this.classe = params['classe'];
      }
      this.loadEleves(); // charger après récupération de la classe
    });

    this.loadLogoImage();
  }

  loadEleves(): void {
    this.eleveService.getElevesByClasse(this.classe).subscribe({
      next: (data) => {
        this.eleves = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des élèves:', err);
      },
    });
  }

  loadLogoImage(): void {
  const url = 'http://localhost:8060/api/ecole/image';
  this.http.get(url, { responseType: 'blob' }).subscribe({
    next: (blob: Blob) => {
      const objectURL = URL.createObjectURL(blob);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    },
    error: (error) => {
      console.error('Erreur lors du chargement du logo:', error);
    }
  });
}


  print(): void {
    window.print();
  }
}
