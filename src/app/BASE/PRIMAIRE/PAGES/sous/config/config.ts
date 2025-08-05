import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from 'express';
import { LoginService } from '../../../SERVICE/login-service';

@Component({
  selector: 'app-config',
  standalone: true, // ✅ OBLIGATOIRE pour les composants standalone
  imports: [CommonModule, FormsModule],
  templateUrl: './config.html',
  styleUrl: './config.css',
})
export class Config {
  configuration = {
    nom: '',
    adresse: '',
    tel: '',
    cel: '',
    bp: '',
    devise: '',
    systeme: '',
    image: null as File | null,
  };

  imagePreview: string | ArrayBuffer | null = null;
  systemes = ['PRIMAIRE', 'COLLEGE', 'LYCEE'];

  constructor(private configService: LoginService, private router: Router) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.configuration.image = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    // Validation
    if (!this.configuration.systeme) {
      alert('Veuillez sélectionner un système.');
      return;
    }

    const formData = new FormData();
    formData.append('nom', this.configuration.nom);
    formData.append('adresse', this.configuration.adresse);
    formData.append('tel', this.configuration.tel);
    formData.append('cel', this.configuration.cel);
    formData.append('bp', this.configuration.bp);
    formData.append('devise', this.configuration.devise);
    formData.append('systeme', this.configuration.systeme);

    if (this.configuration.image) {
      formData.append('image', this.configuration.image);
    }

    this.configService.saveConfiguration(formData).subscribe({
      next: () => {
        alert('Configuration enregistrée avec succès.');

        const chemin = this.configuration.systeme.toLowerCase();
        localStorage.setItem('systeme', chemin); // ✅ On stocke le système
      },
      error: (err) => {
        console.error("Erreur lors de l'enregistrement", err);
        alert("Erreur lors de l'enregistrement, veuillez réessayer.");
      },
    });
  }
}
