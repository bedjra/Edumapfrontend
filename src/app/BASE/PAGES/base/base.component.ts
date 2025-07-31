import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../COMPOSANTS/menu/menu.component';
import { HeaderComponent } from '../../COMPOSANTS/header/header.component';

@Component({
  selector: 'app-base',
  imports: [RouterOutlet, MenuComponent, HeaderComponent],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css',
})
export class BaseComponent {
  sidebarCollapsed = false;

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
}
