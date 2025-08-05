import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from "../sous/user/user";
import { Scolarite } from "../sous/scolarite/scolarite";
import { Prof } from "../sous/prof/prof";
import { Config } from "../sous/config/config";
import { UserCredentials } from '../../Model/UserCredentials';
import { LoginService } from '../../SERVICE/login-service';

@Component({
  selector: 'app-parametres',
  standalone: true, // ✅ OBLIGATOIRE pour les composants standalone
  imports: [CommonModule, RouterModule, ],
  templateUrl: './parametres.html',
  styleUrls: ['./parametres.css'] // ✅ c'était "styleUrl", la bonne clé est "styleUrls"
})
export class Parametres {
  ongletActif: string = 'utilisateur'; // onglet par défaut


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
