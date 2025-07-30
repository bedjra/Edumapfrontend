import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../SERVICE/login-service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css'
})
export class Inscription {
  credentials = {
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  };

  roles = ['admin', 'secretaire', 'enseignant'];

  passwordVisible = false;

  constructor(private loginService: LoginService, private router: Router) {}

  onSignup() {
    const { email, password, confirmPassword, role } = this.credentials;

    if (!email.trim() || !password.trim() || !confirmPassword.trim() || !role.trim()) {
      alert('Tous les champs sont obligatoires.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    const data = {
      email: email.trim(),
      password: password.trim(),
      role: role.trim()
    };

    this.loginService.registerUser(data).subscribe({
      next: () => {
        alert('Inscription réussie !');
        this.router.navigateByUrl('/configuration');
      },
      error: (err) => {
        console.error(err);
        alert("Erreur lors de l'inscription.");
      }
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
