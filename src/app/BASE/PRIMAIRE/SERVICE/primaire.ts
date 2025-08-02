import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Eleve } from '../Model/Eleve';

export interface Tuteur {
  id: number;
  nom: string;
  prenom: string;
}

@Injectable({
  providedIn: 'root'
})
export class Primaire {
  private baseUrl = environment.primaireUrl; // ex: https://tonapi.com/api

  constructor(private http: HttpClient) {}

  enregistrerEtudiant(etudiant: Eleve): Observable<Eleve> {
    return this.http.post<Eleve>(`${this.baseUrl}/eleve`, etudiant);
  }

  // Nouvelle méthode pour récupérer tous les tuteurs
  getTuteurs(): Observable<Tuteur[]> {
    return this.http.get<Tuteur[]>(`${this.baseUrl}/tuteur`);
  }
}
