import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../SERVICE/login-service';

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
        role: response.role
      };
      localStorage.setItem('user', JSON.stringify(user));

      this.router.navigateByUrl('/dashboard');
    },
    error: (err) => {
      if (err?.error?.message?.includes('licence est expirée')) {
        alert('Votre licence est expirée. Veuillez contacter l’administrateur.');
      } else {
        alert('Erreur lors de la connexion. Vérifiez vos identifiants.');
      }
      console.error(err);
    },
  });
}

}
