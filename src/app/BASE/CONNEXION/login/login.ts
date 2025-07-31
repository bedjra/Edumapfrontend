import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../SERVICE/login-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  passwordVisible = false;

  constructor(private loginService: LoginService, private router: Router) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onLogin() {
    if (!this.credentials.email || !this.credentials.password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    this.loginService.login(this.credentials).subscribe({
      next: (response: any) => {
        alert('Connexion réussie !');
        this.router.navigateByUrl('/dashboard');
      },
      error: err => {
        alert('Erreur lors de la connexion. Vérifiez vos identifiants.');
        console.error(err);
      }
    });
  }
}
