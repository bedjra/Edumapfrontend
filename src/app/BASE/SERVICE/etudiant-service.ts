import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Eleve } from '../COMPOSANTS/Model/Eleve';

@Injectable({
  providedIn: 'root',
})


export class EtudiantService {
private baseUrl = `${environment.apiUrl}/eleve`;

  constructor(private http: HttpClient) {}

  enregistrerEtudiant(etudiant: Eleve): Observable<Eleve> {
    return this.http.post<Eleve>(this.baseUrl, etudiant);
  }
}
