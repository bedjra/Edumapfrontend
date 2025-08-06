import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Primaire } from '../../../SERVICE/primaire';
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
  eleves: any[] = [];
  imageUrl?: SafeUrl;
  classe: string = '';
  isLoading = true;  // indicateur de chargement
isLoadingImage = true;

  constructor(
    private primaireService: Primaire,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    if (params['classe']) {
      this.classe = params['classe'];
      this.loadEleves();
    } else {
      console.warn('Aucune classe spécifiée dans les paramètres de requête. Aucun élève chargé.');
      this.eleves = [];
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  });

  this.loadLogoImage();
}


  loadEleves(): void {
  this.isLoading = true;
  console.log('✅ Classe reçue pour chargement :', this.classe); // <--- à ajouter

  this.primaireService.getElevesByClasse(this.classe).subscribe({
    next: (data) => {
      console.log('✅ Élèves reçus:', data);
      this.eleves = JSON.parse(JSON.stringify(data));
      this.isLoading = false;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('❌ Erreur chargement élèves:', err);
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  });
}


loadLogoImage(): void {
  const url = 'http://localhost:8060/api/ecole/image';
  this.isLoadingImage = true;
  this.http.get(url, { responseType: 'blob' }).subscribe({
    next: (blob: Blob) => {
      const objectURL = URL.createObjectURL(blob);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      this.isLoadingImage = false;
      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error('Erreur lors du chargement du logo:', error);
      this.isLoadingImage = false;
      this.cdr.detectChanges();
    }
  });
}


  print(): void {
    window.print();
  }
}
