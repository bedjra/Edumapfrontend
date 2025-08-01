import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export interface EleveDto {
  id?: number;
  nom: string;
  prenom: string;
  adresse: string;
  matricule: string;
  classe: 'CP1' | 'CP2' | 'CE1' | 'CE2' | 'CM1' | 'CM2'; // adapte selon ton enum Java
  sexe: 'Masculin' | 'Féminin';
  lieuNais: string;
  etblProv: string;
  nationnalite: string;
  dateNaiss: string; // LocalDate → string en ISO format "YYYY-MM-DD"
  photo?: string | ArrayBuffer | null; // base64 ou FileReader result

  // Tuteur
  tuteurNom: string;
  tuteurPrenom: string;
  tuteurTelephone: string;
  tuteurProfession: string;
}

export class EtudiantService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

    enregistrerEtudiant(etudiant: EleveDto): Observable<EleveDto> {
    return this.http.post<EleveDto>(this.baseUrl, etudiant);
  }

}
