import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ClassePRIMAIRE, PaiementDto, Primaire } from '../../../SERVICE/primaire';

@Component({
  selector: 'app-fiche',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.css'],
})
export class FicheComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  previousYear: number = this.currentYear - 1;

  paiements: PaiementDto[] = [];
  imageUrl?: SafeUrl;
  classe: string = '';
  isLoading = true;
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
        this.loadPaiements();
      } else {
        console.warn('Aucune classe spécifiée dans les paramètres de requête.');
        this.paiements = [];
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });

    this.loadLogoImage();
  }

  loadPaiements(): void {
    this.isLoading = true;
    const classeEnum = this.classe as ClassePRIMAIRE; // conversion en enum

    this.primaireService.getPaiementsParClasse(classeEnum).subscribe({
      next: (data) => {
        this.paiements = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur chargement paiements:', err);
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
