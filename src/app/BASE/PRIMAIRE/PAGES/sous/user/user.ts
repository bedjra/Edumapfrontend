import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserCredentials } from '../../../Model/UserCredentials';
import { LoginService } from '../../../SERVICE/login-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [CommonModule, RouterLink ],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {
  utilisateurs: UserCredentials[] = []; // S'assurer que c'est bien un tableau
  credentials: UserCredentials = {
    email: '',
    password: '',
    role: ''
  };
  roles: string[] = []; // Liste des rôles récupérée du backend

  

  constructor(
    private loginService: LoginService,

  ) { }
   ngOnInit(): void {
    this.reset();
    this.fetchRoles();
    this.getAllUtilisateur();

  }


  ajouterUtilisateur(): void {
   
  }
  

  fetchRoles() {
    this.loginService.getRoles().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des rôles', error);
      }
    );
  }

  getAllUtilisateur(): void {
   
  }
  

  reset(): void {
    this.credentials = {
      email: '',
      password: '',
      role: ''
    };
  }
}
