import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from "../sous/user/user";
import { Scolarite } from "../sous/scolarite/scolarite";
import { Prof } from "../sous/prof/prof";
import { Config } from "../sous/config/config";

@Component({
  selector: 'app-parametres',
  standalone: true, // ✅ OBLIGATOIRE pour les composants standalone
  imports: [CommonModule, RouterModule, User, Scolarite, Prof, Config],
  templateUrl: './parametres.html',
  styleUrls: ['./parametres.css'] // ✅ c'était "styleUrl", la bonne clé est "styleUrls"
})
export class Parametres {
    ongletActif: string = 'utilisateur'; // Onglet par défaut

 }
