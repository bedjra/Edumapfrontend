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

 onLogin(): void {
  if (!this.credentials.email || !this.credentials.password) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  this.loginService.login(this.credentials).subscribe({
    next: (response: any) => {
      alert('Connexion réussie !');

      const user = {
        email: this.credentials.email,
        role: response.role,
        systeme: response.systeme, // Ajout du système
      };

      // Sauvegarder l'utilisateur avec le système dans le localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('systeme', response.systeme); // Important

      console.log('Système récupéré:', response.systeme);

      if (response.systeme) {
        this.router.navigate([`/${response.systeme.toLowerCase()}/dashboard`]);
      } else {
        alert("Système introuvable. Veuillez reconfigurer l'application.");
        this.router.navigate(['/configuration']);
      }
    },
    error: (err) => {
      const errorMessage = err?.error?.message || 'Erreur inconnue';
      if (errorMessage.includes('licence est expirée')) {
        alert('Votre licence est expirée. Veuillez contacter l’administrateur.');
      } else {
        alert('Erreur lors de la connexion. Vérifiez vos identifiants.');
      }
      console.error(err);
    },
  });
}





}
