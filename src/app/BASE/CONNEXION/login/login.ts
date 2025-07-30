import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // ✅ CORRECT import

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'] // ✅ Pluriel
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  passwordVisible = false;

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post('http://localhost:8080/api/login', this.credentials)
      .subscribe({
        next: (response: any) => {
          alert('Connexion réussie !');
          this.router.navigateByUrl('/dashboard'); // ou une autre route comme /
        },
        error: err => {
          alert('Erreur lors de la connexion. Vérifiez vos identifiants.');
          console.error(err);
        }
      });
  }
}
