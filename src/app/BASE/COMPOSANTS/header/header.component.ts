import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() currentPage = 'Tableau de bord';
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() searchQuery = new EventEmitter<string>();

  searchQuery_internal = '';
  userMenuOpen = false;
  notificationCount = 3;
  userName = 'Administrateur';
  userInitials = 'A';
  constructor(private router: Router) {}

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  onSearch(): void {
    if (this.searchQuery_internal.trim()) {
      this.searchQuery.emit(this.searchQuery_internal);
    }
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  toggleNotifications(): void {
    console.log('Notifications clicked');
  }

  logout(): void {
    console.log('Logout clicked');
    this.userMenuOpen = false;
    this.router.navigate(['/']); // Redirige vers la racine (http://localhost:4200/)
  }
}
