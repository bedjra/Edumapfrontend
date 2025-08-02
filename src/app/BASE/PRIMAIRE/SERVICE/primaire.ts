import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Eleve } from '../Model/Eleve';

@Injectable({
  providedIn: 'root'
})
export class Primaire {
  private baseUrl = `${environment.apiUrl}/eleve`;

  constructor(private http: HttpClient) {}

  enregistrerEtudiant(etudiant: Eleve): Observable<Eleve> {
    return this.http.post<Eleve>(this.baseUrl, etudiant);
  }
}
