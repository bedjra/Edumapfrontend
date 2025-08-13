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
import { Note1 } from './BASE/PRIMAIRE/PAGES/Note/note1/note1';
import { Note3 } from './BASE/PRIMAIRE/PAGES/Note/note3/note3';
import { Note2 } from './BASE/PRIMAIRE/PAGES/Note/note2/note2';
import { Note4 } from './BASE/PRIMAIRE/PAGES/Note/note4/note4';
import { Note5 } from './BASE/PRIMAIRE/PAGES/Note/note5/note5';
import { Note6 } from './BASE/PRIMAIRE/PAGES/Note/note6/note6';
import { Board } from './BASE/COLLEGE/PAGES/board/board';
import { Basecol } from './BASE/COLLEGE/COMPOSANTS/basecol/basecol';
import { Para } from './BASE/COLLEGE/PAGES/para/para';
import { Recu } from './BASE/PRIMAIRE/PAGES/IMPRESS/recu/recu';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // 🔁 redirection claire
  { path: 'login', component: Log },
  { path: 'inscription', component: Inscription },
  { path: 'configuration', component: Configuration },
  { path: 'print/classe', component: DefitechComponent },
  { path: 'fiche', component: FicheComponent },
  { path: 'recu', component: Recu },

  {
    path: 'PRIMAIRE',
    component: BaseComponent,

    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'ajouter', component: Add },
      { path: 'modifier/:id', component: UpdateComponent },
      { path: 'liste', component: Liste },
      { path: 'bulletin', component: Buletin },
      { path: 'CP1', component: Cp1 },
      { path: 'CP2', component: Cp2 },
      { path: 'CE1', component: Ce1 },
      { path: 'CE2', component: Ce2 },
      { path: 'CM1', component: Cm1 },
      { path: 'CM2', component: Cm2 },

      { path: 'paiement', component: Paiement },
      { path: 'paiement/CP1', component: Cp1paie },
      { path: 'paiement/CP2', component: Cp2paie },
      { path: 'paiement/CE1', component: Ce1paie },
      { path: 'paiement/CE2', component: Ce2paie },
      { path: 'paiement/CM1', component: Cm1paie },
      { path: 'paiement/CM2', component: Cm2paie },

      { path: 'note', component: Note },
      { path: 'note/CP1', component: Note1 },
      { path: 'note/CE1', component: Note3 },
      { path: 'note/CP2', component: Note2 },
      { path: 'note/CE2', component: Note4 },
      { path: 'note/CM1', component: Note5 },
      { path: 'note/CM2', component: Note6 },
      {
        path: 'parametre',
        component: Parametres,
      },

    ],
  },

  {
    path: 'COLLEGE',
    component: Basecol,

    children: [
      { path: 'dashboard', component: Board },
      { path: 'parametre', component: Para },
      /*  { path: 'ajouter', component: Add },
      { path: 'modifier/:id', component: UpdateComponent },
      { path: 'liste', component: Liste },
      { path: 'bulletin', component: Buletin },
      { path: 'CP1', component: Cp1 },
      { path: 'CP2', component: Cp2 },
      { path: 'CE1', component: Ce1 },
      { path: 'CE2', component: Ce2 },
      { path: 'CM1', component: Cm1 },
      { path: 'CM2', component: Cm2 },

      { path: 'paiement', component: Paiement },
      { path: 'paiement/CP1', component: Cp1paie },
      { path: 'paiement/CP2', component: Cp2paie },
      { path: 'paiement/CE1', component: Ce1paie },
      { path: 'paiement/CE2', component: Ce2paie },
      { path: 'paiement/CM1', component: Cm1paie },
      { path: 'paiement/CM2', component: Cm2paie },

      { path: 'note', component: Note },
      { path: 'note/CP1', component: Note1 },
      { path: 'note/CE1', component: Note3 },    
      { path: 'note/CP2', component:Note2  },
      { path: 'note/CE2', component: Note4 },
      { path: 'note/CM1', component: Note5 },
      { path: 'note/CM2', component: Note6 },
      */
    ],
  },
];
