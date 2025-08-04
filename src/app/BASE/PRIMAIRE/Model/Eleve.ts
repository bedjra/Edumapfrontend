export interface Eleve {
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
  dateNaiss: string; // format ISO : 'YYYY-MM-DD'

  // Tuteur
  tuteurNom: string;
  tuteurPrenom: string;
  tuteurTelephone: string;
  tuteurProfession: string;
}

