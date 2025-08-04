import { Routes } from '@angular/router';

import { DashboardComponent } from './BASE/PRIMAIRE/PAGES/dashboard/dashboard.component';
import { Add } from './BASE/PRIMAIRE/PAGES/Eleve/add/add';
import { Liste } from './BASE/PRIMAIRE/PAGES/Eleve/liste/liste';
import { Buletin } from './BASE/PRIMAIRE/PAGES/Note/buletin/buletin';
import { Note } from './BASE/PRIMAIRE/PAGES/Note/note/note';
import { Paiement } from './BASE/PRIMAIRE/PAGES/PAIE/paiement/paiement';
import { Parametres } from './BASE/PRIMAIRE/PAGES/parametres/parametres';
import { Configuration } from './CONNEXION/configuration/configuration';
import { Inscription } from './CONNEXION/inscription/inscription';
import { LoginComponent } from './CONNEXION/login/login';
import { Cp1 } from './BASE/PRIMAIRE/PAGES/Eleve/cp1/cp1';
import { Ce1 } from './BASE/PRIMAIRE/PAGES/Eleve/ce1/ce1';
import { Ce2 } from './BASE/PRIMAIRE/PAGES/Eleve/ce2/ce2';
import { Cm1 } from './BASE/PRIMAIRE/PAGES/Eleve/cm1/cm1';
import { Cm2 } from './BASE/PRIMAIRE/PAGES/Eleve/cm2/cm2';
import { Cp2 } from './BASE/PRIMAIRE/PAGES/Eleve/cp2/cp2';
import { Primaire } from './BASE/PRIMAIRE/primaire/primaire';
import { BaseComponent } from './BASE/PRIMAIRE/COMPOSANTS/base/base.component';
import { Prof } from './BASE/PRIMAIRE/PAGES/sous/prof/prof';
import { Scolarite } from './BASE/PRIMAIRE/PAGES/sous/scolarite/scolarite';
import { User } from './BASE/PRIMAIRE/PAGES/sous/user/user';

export const routes: Routes = [
  // Supprime cette ligne:
  // { path: 'Primaire', component: Primaire },

  { path: '', component: LoginComponent },
  { path: 'inscription', component: Inscription },
  { path: 'configuration', component: Configuration },

  {
    path: 'PRIMAIRE',
    component: BaseComponent, // Tous les autres passent par ici
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'parametre', component: Parametres },
      { path: 'paiement', component: Paiement },
      { path: 'ajouter', component: Add },
      { path: 'liste', component: Liste },
      { path: 'note', component: Note },
      { path: 'bulletin', component: Buletin },
      { path: 'CP1', component: Cp1 },
      { path: 'CP2', component: Cp2 },
      { path: 'CE1', component: Ce1 },
      { path: 'CE2', component: Ce2 },
      { path: 'CM1', component: Cm1 },
      { path: 'CM2', component: Cm2 },

      
      { path: 'utilisateur', component: User },
      { path: 'scolarite', component: Scolarite },
      { path: 'professeur', component: Prof },
    ],
  },



];
