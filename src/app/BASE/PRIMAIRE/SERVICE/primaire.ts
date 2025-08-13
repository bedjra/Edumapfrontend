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

export interface Professeur {
  id?: number;
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  diplome: string;
  classe: string;
}

export interface Matiere {
  id?: number;
  nom: string;
}

export interface MatiereResponse {
  dbMatieres: Matiere[];
  enumMatieres: string[];
}

export interface PaiementDto {
  id:number;
  eleveId: number;
  eleveNom: string;
  elevePrenom: string;
  classe?: string;
  datePaiement: string;
  montantActuel: number;
  resteEcolage: number;
  montantDejaPaye: number;
  statut: 'EN_COURS' | 'SOLDE';
  montantScolarite: number;
}

export interface PaiementRequestDto {
  eleveNom: string;
  elevePrenom: string;
  montantActuel: number;
  datePaiement: string;
  scolariteId: number;
}

export interface StatPaiementPrimaireDTO {
  classe: string;
  total: number;
  nombreSolde: number;
  nombreEnCours: number;
}

export enum ClassePRIMAIRE {
  CP1 = 'CP1',
  CP2 = 'CP2',
  CE1 = 'CE1',
  CE2 = 'CE2',
  CM1 = 'CM1',
  CM2 = 'CM2',
}

export interface NoteDto {
  eleveId: number;
  evaluation: string; // Doit être en majuscules et sans espaces (Enum)
  classe: string; // Enum ClassePRIMAIRE → envoyer la valeur exacte
  notes: MatiereNote[];
}

export interface MatiereNote {
  matiereId?: number; // Optionnel
  valeurNote: number;
  matierePrimaire?: string; // Optionnel
}

export interface NoteResponse {
  id: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class Primaire {
  private baseUrl = environment.primaireUrl;

  constructor(private http: HttpClient) {}

  // Appel du backend pour récupérer le nombre total d'élèves
  getNombreTotalEleves(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  getTotauxPaiement(): Observable<{ totalPaye: number; totalReste: number }> {
    return this.http.get<{ totalPaye: number; totalReste: number }>(
      `${this.baseUrl}/totaux`
    );
  }

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
    return this.http.put<Scolarite>(
      `${this.baseUrl}/scolarite/${id}?montant=${montant}`,
      {}
    );
  }

  /////////Prof
  getProfesseurs(): Observable<Professeur[]> {
    return this.http.get<Professeur[]>(`${this.baseUrl}/profs`);
  }

  ajouterProfesseur(prof: Professeur): Observable<Professeur> {
    return this.http.post<Professeur>(`${this.baseUrl}/prof`, prof);
  }

  // --------------------- MATIÈRES ------------------------
  getMatieres(): Observable<MatiereResponse> {
    return this.http.get<MatiereResponse>(`${this.baseUrl}/matiere`);
  }

  ajouterMatiere(matiere: Matiere): Observable<Matiere> {
    return this.http.post<Matiere>(`${this.baseUrl}/matiere`, matiere);
  }

  // --------------------- PAIEMENTS ------------------------

  enregistrerPaiement(paiement: PaiementRequestDto): Observable<PaiementDto> {
    return this.http.post<PaiementDto>(`${this.baseUrl}/paiement`, paiement);
  }

  getRecuPaiement(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/paiement/recu/${id}`, {
      responseType: 'blob',
    });
  }

  getPaiementParEleveId(eleveId: number): Observable<PaiementDto> {
    return this.http.get<PaiementDto>(`${this.baseUrl}/paiement/${eleveId}`);
  }

  getPaiementsParClasse(classe: ClassePRIMAIRE): Observable<PaiementDto[]> {
    return this.http.get<PaiementDto[]>(`${this.baseUrl}/paie/eleve/${classe}`);
  }

  getStatPai(): Observable<StatPaiementPrimaireDTO[]> {
    return this.http.get<StatPaiementPrimaireDTO[]>(
      `${this.baseUrl}/paiement/stat`
    );
  }

  getHistoriquePaiementParEleveId(
    eleveId: number
  ): Observable<StatPaiementPrimaireDTO[]> {
    return this.http.get<StatPaiementPrimaireDTO[]>(
      `${this.baseUrl}/paiement/his/${eleveId}`
    );
  }

  getPaiementsPrimaire(): Observable<PaiementDto[]> {
    return this.http.get<PaiementDto[]>(`${this.baseUrl}/paiement`);
  }

  getRenvoi(classe: string): Observable<PaiementDto[]> {
    return this.http.get<PaiementDto[]>(
      `${this.baseUrl}/paiement/renvoi/${classe}`
    );
  }

  ajouterNotes(noteDto: NoteDto): Observable<NoteResponse> {
    return this.http.post<NoteResponse>(`${this.baseUrl}/note`, noteDto);
  }
}
