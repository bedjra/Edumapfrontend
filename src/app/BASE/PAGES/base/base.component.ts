import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../COMPOSANTS/menu/menu.component';
import { HeaderComponent } from '../../COMPOSANTS/header/header.component';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, HeaderComponent],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css',
})
export class BaseComponent implements OnInit {
  sidebarCollapsed = false;
  currentPage: string = '';

  // 🗺️ Définition de la correspondance entre route et titre/numéro
  pageMap: { [key: string]: { label: string; number: number } } = {
    '/dashboard': { label: 'Tableau de bord', number: 1 },
    '/paiement': { label: 'Paiements', number: 2 },
    '/note': { label: 'Saisie des notes', number: 3 },
    '/bulletin': { label: 'Bulletins', number: 4 },
    '/ajouter': { label: 'Ajouter un élève', number: 5 },
    '/liste': { label: 'Liste des élèves', number: 6 },
    '/parametre': { label: 'Paramètres', number: 7 },
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        const matchedKey = Object.keys(this.pageMap).find((key) =>
          url.includes(key)
        );

        if (matchedKey) {
          this.currentPage = this.pageMap[matchedKey].label;
        } else {
          this.currentPage = 'EDUMAP';
        }
      });
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  onMenuItemClick(menuItem: string): void {
    console.log('Menu item clicked:', menuItem);
  }

  onSearch(query: string): void {
    console.log('Search query:', query);
  }
}
