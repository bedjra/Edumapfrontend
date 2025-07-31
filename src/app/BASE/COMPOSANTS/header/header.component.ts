/*
import { Component } from '@angular/core';
import { LoginService } from '../../SERVICE/login.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  userRole: string = 'Utilisateur';

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      this.loginService.getUserRole(userEmail).subscribe((role) => {
        this.userRole = role;
      });
    } else {
      console.error("Aucun utilisateur connecté");
    }
  }
}
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../SERVICE/login.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userRole: string = 'Utilisateur'; // Valeur par défaut
  private unsubscribe$ = new Subject<void>(); // Permet de nettoyer les subscriptions

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {  // Vérifie qu'on est côté client
      const userEmail = localStorage.getItem('userEmail');

      if (userEmail) {
        this.loginService.getUserRole(userEmail)
          .pipe(takeUntil(this.unsubscribe$)) // Évite les fuites de mémoire
          .subscribe({
            next: (role) => this.userRole = role || 'Utilisateur',
            error: (err) => console.error("Erreur lors de la récupération du rôle :", err)
          });
      } else {
        console.warn("Aucun utilisateur connecté");
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete(); // Nettoie les subscriptions pour éviter les erreurs
  }
}
