import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
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

togglePasswordVisibility() {
  this.passwordVisible = !this.passwordVisible;
}

onSignup() {
  if (this.credentials.password !== this.credentials.confirmPassword) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  // ici tu appelles ton service pour l’inscription
  console.log("Inscription avec : ", this.credentials);
}

}
