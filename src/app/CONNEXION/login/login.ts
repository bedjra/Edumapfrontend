import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService, Systeme } from '../../BASE/PRIMAIRE/SERVICE/login-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };

  passwordVisible = false;
  // Exemple dans ton `onSignup()` ou `onLogin()`

  constructor(private loginService: LoginService, private router: Router) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

 onLogin() {
  if (!this.credentials.email || !this.credentials.password) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  this.loginService.login(this.credentials).subscribe({
    next: (response: any) => {
      alert('Connexion réussie !');

      // Stocker les infos dans le localStorage
      const user = {
        email: response.email,
        role: response.role,
      };
      localStorage.setItem('user', JSON.stringify(user));

      // Après login, récupérer le système courant et rediriger vers son dashboard
      this.loginService.getCurrentSystem().subscribe({
        next: (systeme: Systeme) => {
          switch(systeme) {
            case 'PRIMAIRE':
              this.router.navigate(['/Primaire/dashboard']);
              break;
            case 'COLLEGE':
              this.router.navigate(['/College/dashboard']);
              break;
            case 'LYCEE':
              this.router.navigate(['/Lycee/dashboard']);
              break;
            default:
              this.router.navigate(['/']); // fallback vers login ou page par défaut
          }
        },
        error: (err) => {
          console.error('Erreur récupération système:', err);
          this.router.navigate(['/']); // fallback aussi en cas d’erreur
        },
      });
    },
    error: (err) => {
      if (err?.error?.message?.includes('licence est expirée')) {
        alert(
          'Votre licence est expirée. Veuillez contacter l’administrateur.'
        );
      } else {
        alert('Erreur lors de la connexion. Vérifiez vos identifiants.');
      }
      console.error(err);
    },
  });

  next: (systeme: Systeme) => {
  console.log('Système reçu:', systeme);
  switch(systeme) {
  }
}

}

}
