import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parametres',
  standalone: true, // ✅ OBLIGATOIRE pour les composants standalone
  imports: [CommonModule, RouterModule],
  templateUrl: './parametres.html',
  styleUrls: ['./parametres.css'] // ✅ c'était "styleUrl", la bonne clé est "styleUrls"
})
export class Parametres { }
