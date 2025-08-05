import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-parametres',
  standalone: true, // ✅ OBLIGATOIRE pour les composants standalone
  imports: [CommonModule,FormsModule , RouterModule, ],
  templateUrl: './parametres.html',
  styleUrls: ['./parametres.css'] // ✅ c'était "styleUrl", la bonne clé est "styleUrls"
})
export class Parametres {
  ongletActif: string = 'utilisateur'; // onglet par défaut

// Partie Utilisateur
credentials = {
  email: '',
  password: '',
  confirmPassword: '',
  role: ''
};
roles = ['admin', 'secretaire', 'enseignant'];
passwordVisible = false;
utilisateurs: any[] = [];

// Partie Scolarité
inscription = {
  nom: '',
  filiere: ''
};
inscriptions: any[] = [];

ajouterUtilisateur() {
  if (!this.credentials.email.trim() || !this.credentials.password.trim() || !this.credentials.confirmPassword.trim() || !this.credentials.role.trim()) {
    alert('Tous les champs sont obligatoires.');
    return;
  }
  if (this.credentials.password !== this.credentials.confirmPassword) {
    alert('Les mots de passe ne correspondent pas.');
    return;
  }

  const user = {
    email: this.credentials.email.trim(),
    password: this.credentials.password.trim(),
    role: this.credentials.role.trim()
  };

  this.utilisateurs.push(user);

  // Réinitialiser le formulaire
  this.credentials = { email: '', password: '', confirmPassword: '', role: '' };
}

ajouterInscription() {
  if (!this.inscription.nom.trim() || !this.inscription.filiere.trim()) {
    alert('Tous les champs sont obligatoires.');
    return;
  }

  this.inscriptions.push({ nom: this.inscription.nom.trim(), filiere: this.inscription.filiere.trim() });

  // Réinitialiser le formulaire
  this.inscription = { nom: '', filiere: '' };
}
}
