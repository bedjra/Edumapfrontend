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

export interface Scolarite {
  id?: number;
  classe: string;
  montant: number;
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

  getElevesByClasse(classe: string): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(`${this.baseUrl}/${classe}`);
  }

  getEleveById(id: string): Observable<Eleve> {
  return this.http.get<Eleve>(`${this.baseUrl}/eleve/${id}`);
}

  // Récupérer un élève par matricule (DTO)
  getEleveByMatricule(matricule: string): Observable<Eleve> {
    return this.http.get<Eleve>(`${this.baseUrl}/eleve/matricule/${matricule}`);
  }

 private eleves: Eleve[] = [];

  setEleves(eleves: Eleve[]) {
    this.eleves = eleves;
  }

  getEleves(): Eleve[] {
    return this.eleves;
  }

  clear() {
    this.eleves = [];
  }

  updateEleve(eleve: Eleve): Observable<Eleve> {
    return this.http.put<Eleve>(`${this.baseUrl}/eleve/${eleve.id}`, eleve);
  }



  private selectedEleve: Eleve | null = null;

setSelectedEleve(eleve: Eleve) {
  this.selectedEleve = eleve;
}

getSelectedEleve(): Eleve | null {
  return this.selectedEleve;
}

supprimerEleve(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/eleve/${id}`);
}



/////////scolarite
ajouterScolarite(scolarite: Scolarite): Observable<Scolarite> {
  return this.http.post<Scolarite>(`${this.baseUrl}/scolarite`, scolarite);
}

getScolarites(): Observable<Scolarite[]> {
  return this.http.get<Scolarite[]>(`${this.baseUrl}/scolarite`);
}

updateScolarite(id: number, montant: number): Observable<Scolarite> {
  return this.http.put<Scolarite>(`${this.baseUrl}/scolarite/${id}?montant=${montant}`, {});
}


}
