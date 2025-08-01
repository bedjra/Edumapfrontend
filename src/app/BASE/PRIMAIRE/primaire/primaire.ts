import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MenuComponent } from '../COMPOSANTS/menu/menu.component';
import { HeaderComponent } from '../COMPOSANTS/header/header.component';

@Component({
  selector: 'app-primaire',
  imports: [RouterOutlet, MenuComponent, HeaderComponent],
  templateUrl: './primaire.html',
  styleUrl: './primaire.css'
})
export class Primaire implements OnInit {
  sidebarCollapsed = false;
  currentPage: string = 'Tableau de bord'; // ou une autre valeur par défaut

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  onMenuItemClick(menuItem: string): void {
    console.log('Menu item clicked:', menuItem);
    // Logique de navigation
  }

  onSearch(query: string): void {
    console.log('Search query:', query);
    // Logique de recherche
  }

  constructor(private router: Router) {}

    ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;

        if (url.includes('/dashboard')) this.currentPage = 'Tableau de bord';
        else if (url.includes('/paiement')) this.currentPage = 'Paiements';
        else if (url.includes('/note')) this.currentPage = 'Saisie des notes';
        else if (url.includes('/bulletin')) this.currentPage = 'Bulletins';
        else if (url.includes('/ajouter')) this.currentPage = 'Ajouter un élève';
        else if (url.includes('/liste')) this.currentPage = 'Liste des élèves';
        else if (url.includes('/parametre')) this.currentPage = 'Paramètres';
      });
  }

  
}
