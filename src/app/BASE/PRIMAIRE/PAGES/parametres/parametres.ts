import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../SERVICE/login-service';

@Component({
  selector: 'app-parametres',
  standalone: true, // ✅ OBLIGATOIRE pour les composants standalone
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './parametres.html',
  styleUrls: ['./parametres.css'], // ✅ c'était "styleUrl", la bonne clé est "styleUrls"
})
export class Parametres {
  ongletActif: string = 'utilisateur'; // onglet par défaut

  // Partie Utilisateur
  credentials = {
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  };
  roles = ['admin', 'secretaire'];
  passwordVisible = false;
  utilisateurs: any[] = [];

  // Partie Scolarité
  inscription = {
    nom: '',
    filiere: '',
  };
  inscriptions: any[] = [];


    constructor(private loginService: LoginService, private router: Router) {}
  

  ajouterUtilisateur() {
    const { email, password, confirmPassword, role } = this.credentials;

    if (
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !role.trim()
    ) {
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
      role: role.trim(),
    };

    this.loginService.registerUser(data).subscribe({
      next: () => {
        alert('Inscription réussie !');
        this.credentials = {
          email: '',
          password: '',
          confirmPassword: '',
          role: '',
        };
      },
      error: (err) => {
        console.error(err);
        alert("Erreur lors de l'inscription.");
      },
    });
  }

  ajouterInscription() {
    if (!this.inscription.nom.trim() || !this.inscription.filiere.trim()) {
      alert('Tous les champs sont obligatoires.');
      return;
    }

    this.inscriptions.push({
      nom: this.inscription.nom.trim(),
      filiere: this.inscription.filiere.trim(),
    });

    // Réinitialiser le formulaire
    this.inscription = { nom: '', filiere: '' };
  }
}
