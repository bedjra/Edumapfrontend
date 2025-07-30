import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuration',
 standalone: true, // ✅ important
  imports: [FormsModule, CommonModule, HttpClientModule],
   templateUrl: './configuration.html',
  styleUrl: './configuration.css'
})
export class Configuration {

  configuration = {
    nom: '',
    adresse: '',
    tel: '',
    cel: '',
    bp: '',
    devise: '',
    systeme: '',
    image: null as File | null
  };

  imagePreview: string | ArrayBuffer | null = null;

  systemes = ['PRIMAIRE', 'COLLEGE', 'LYCEE'];

  constructor(private http: HttpClient) {}

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

    this.http.post('http://localhost:8080/api/configuration', formData).subscribe({
      next: () => alert("Configuration enregistrée avec succès."),
      error: (err) => console.error("Erreur lors de l'enregistrement", err)
    });
  }
}
