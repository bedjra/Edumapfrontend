import { Routes } from '@angular/router';

import { DashboardComponent } from './BASE/PRIMAIRE/PAGES/dashboard/dashboard.component';
import { Add } from './BASE/PRIMAIRE/PAGES/Eleve/add/add';
import { Liste } from './BASE/PRIMAIRE/PAGES/Eleve/liste/liste';
import { Buletin } from './BASE/PRIMAIRE/PAGES/Note/buletin/buletin';
import { Note } from './BASE/PRIMAIRE/PAGES/Note/note/note';
import { Paiement } from './BASE/PRIMAIRE/PAGES/PAIE/paiement/paiement';
import { Configuration } from './CONNEXION/configuration/configuration';
import { Inscription } from './CONNEXION/inscription/inscription';
import { Cp1 } from './BASE/PRIMAIRE/PAGES/Eleve/cp1/cp1';
import { Ce1 } from './BASE/PRIMAIRE/PAGES/Eleve/ce1/ce1';
import { Ce2 } from './BASE/PRIMAIRE/PAGES/Eleve/ce2/ce2';
import { Cm1 } from './BASE/PRIMAIRE/PAGES/Eleve/cm1/cm1';
import { Cm2 } from './BASE/PRIMAIRE/PAGES/Eleve/cm2/cm2';
import { Cp2 } from './BASE/PRIMAIRE/PAGES/Eleve/cp2/cp2';
import { BaseComponent } from './BASE/PRIMAIRE/COMPOSANTS/base/base.component';
import { Cp1paie } from './BASE/PRIMAIRE/PAGES/PAIE/cp1paie/cp1paie';
import { Cp2paie } from './BASE/PRIMAIRE/PAGES/PAIE/cp2paie/cp2paie';
import { Cm1paie } from './BASE/PRIMAIRE/PAGES/PAIE/cm1paie/cm1paie';
import { Cm2paie } from './BASE/PRIMAIRE/PAGES/PAIE/cm2paie/cm2paie';
import { Ce2paie } from './BASE/PRIMAIRE/PAGES/PAIE/ce2paie/ce2paie';
import { Ce1paie } from './BASE/PRIMAIRE/PAGES/PAIE/ce1paie/ce1paie';
import { DefitechComponent } from './BASE/PRIMAIRE/PAGES/IMPRESS/defitech/defitech.component';
import { UpdateComponent } from './BASE/PRIMAIRE/PAGES/Eleve/update/update';
import { Parametres } from './BASE/PRIMAIRE/PAGES/parametres/parametres';
import { FicheComponent } from './BASE/PRIMAIRE/PAGES/IMPRESS/fiche/fiche.component';
import { Log } from './CONNEXION/log/log';
import { Cp1note } from './BASE/PRIMAIRE/PAGES/Note/cp1note/cp1note';
import { Cp2note } from './BASE/PRIMAIRE/PAGES/Note/cp2note/cp2note';
import { Ce1note } from './BASE/PRIMAIRE/PAGES/Note/ce1note/ce1note';
import { Ce2note } from './BASE/PRIMAIRE/PAGES/Note/ce2note/ce2note';
import { Cm1note } from './BASE/PRIMAIRE/PAGES/Note/cm1note/cm1note';
import { Cm2note } from './BASE/PRIMAIRE/PAGES/Note/cm2note/cm2note';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Log },
  { path: 'inscription', component: Inscription },
  { path: 'configuration', component: Configuration },
  { path: 'print/classe', component: DefitechComponent },
  { path: 'fiche', component: FicheComponent },

  {
    path: 'PRIMAIRE',
    component: BaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'ajouter', component: Add },
      { path: 'modifier/:id', component: UpdateComponent },
      { path: 'liste', component: Liste },
      { path: 'bulletin', component: Buletin },

      // Classes
      { path: 'CP1', component: Cp1 },
      { path: 'CP2', component: Cp2 },
      { path: 'CE1', component: Ce1 },
      { path: 'CE2', component: Ce2 },
      { path: 'CM1', component: Cm1 },
      { path: 'CM2', component: Cm2 },

      // Paiement
      { path: 'paiement', component: Paiement },
      { path: 'paiement/CP1', component: Cp1paie },
      { path: 'paiement/CP2', component: Cp2paie },
      { path: 'paiement/CE1', component: Ce1paie },
      { path: 'paiement/CE2', component: Ce2paie },
      { path: 'paiement/CM1', component: Cm1paie },
      { path: 'paiement/CM2', component: Cm2paie },

      // Notes avec sous-routes
      {
        path: 'note',
        component: Note,
        children: [
          { path: 'CP1', component: Cp1note },
          { path: 'CP2', component: Cp2note },
          { path: 'CE1', component: Ce1note },
          { path: 'CE2', component: Ce2note },
          { path: 'CM1', component: Cm1note },
          { path: 'CM2', component: Cm2note },
        ],
      },

      { path: 'parametre', component: Parametres },
    ],
  },
];
