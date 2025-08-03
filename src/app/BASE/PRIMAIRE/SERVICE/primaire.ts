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

export interface StatPrimaire {
  classe: string;
  total: number;
  garcons: number;
  filles: number;
}

@Injectable({
  providedIn: 'root'
})
export class Primaire {
  private baseUrl = environment.primaireUrl; 

  constructor(private http: HttpClient) {}

  enregistrerEleve(eleve: Eleve): Observable<Eleve> {
    return this.http.post<Eleve>(`${this.baseUrl}/eleve`, eleve);
  }

  getTuteurs(): Observable<Tuteur[]> {
    return this.http.get<Tuteur[]>(`${this.baseUrl}/tuteur`);
  }

  /** méthode pour récupérer les stats des élèves du primaire */
 getStats(): Observable<StatPrimaire[]> {
  return this.http.get<StatPrimaire[]>(`${this.baseUrl}/stats`);
}

}
