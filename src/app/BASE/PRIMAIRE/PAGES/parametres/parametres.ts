import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../SERVICE/login-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './parametres.html',
  styleUrls: ['./parametres.css'],
})
export class Parametres implements OnInit {
  ongletActif: string = 'utilisateur';

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

  isEditMode = false;
  editIndex = -1;

  // Partie Scolarité
  inscription = {
    nom: '',
    filiere: '',
  };
  inscriptions: any[] = [];

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.chargerUtilisateurs();
  }

  chargerUtilisateurs(): void {
    this.loginService.getAllUsers().subscribe({
      next: (data) => {
        console.log('Utilisateurs récupérés :', data);
        this.utilisateurs = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs :', err);
      },
    });
  }

  ajouterUtilisateur() {
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
      role: role.trim(),
    };

    this.loginService.registerUser(data).subscribe({
      next: () => {
        alert('Inscription réussie !');
        this.resetForm();
        this.chargerUtilisateurs();
      },
      error: (err) => {
        console.error(err);
        alert("Erreur lors de l'inscription.");
      },
    });
  }

  // ✅ Préparer les données pour modification
  remplirFormulairePourModification(user: any, index: number): void {
    this.credentials = {
      email: user.email,
      password: user.password,
      confirmPassword: user.password,
      role: user.role,
    };
    this.isEditMode = true;
    this.editIndex = index;
  }

  // ✅ Modifier l'utilisateur existant
  modifierUtilisateur(): void {
    if (this.editIndex === -1) return;

    const { email, password, confirmPassword, role } = this.credentials;

    if (!email.trim() || !password.trim() || !confirmPassword.trim() || !role.trim()) {
      alert('Tous les champs sont obligatoires.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    const updatedUser = {
      email: email.trim(),
      password: password.trim(),
      role: role.trim(),
    };

    const userId = this.utilisateurs[this.editIndex].id;

    this.loginService.updateUser(userId, updatedUser).subscribe({
      next: () => {
        alert('Utilisateur modifié avec succès !');
        this.resetForm();
        this.chargerUtilisateurs();
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la modification.');
      },
    });
  }

  // ✅ Supprimer un utilisateur
  supprimerUtilisateur(index: number): void {
    const userId = this.utilisateurs[index].id;

    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.loginService.deleteUser(userId).subscribe({
        next: () => {
          alert('Utilisateur supprimé.');
          this.chargerUtilisateurs();

          if (this.editIndex === index) {
            this.resetForm();
          }
        },
        error: (err) => {
          console.error(err);
          alert('Erreur lors de la suppression.');
        },
      });
    }
  }

  // ✅ Réinitialiser le formulaire
  resetForm(): void {
    this.credentials = {
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
    };
    this.isEditMode = false;
    this.editIndex = -1;
    this.passwordVisible = false;
  }
}
