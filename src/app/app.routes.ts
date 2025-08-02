import { Routes } from '@angular/router';

import { DashboardComponent } from './BASE/PRIMAIRE/PAGES/dashboard/dashboard.component';
import { Add } from './BASE/PRIMAIRE/PAGES/Eleve/add/add';
import { Liste } from './BASE/PRIMAIRE/PAGES/Eleve/liste/liste';
import { Buletin } from './BASE/PRIMAIRE/PAGES/Note/buletin/buletin';
import { Note } from './BASE/PRIMAIRE/PAGES/Note/note/note';
import { Paiement } from './BASE/PRIMAIRE/PAGES/paiement/paiement';
import { Parametres } from './BASE/PRIMAIRE/PAGES/parametres/parametres';
import { BaseComponent } from './COMPOSANTS/base/base.component';
import { Configuration } from './CONNEXION/configuration/configuration';
import { Inscription } from './CONNEXION/inscription/inscription';
import { LoginComponent } from './CONNEXION/login/login';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'inscription', component: Inscription },
  { path: 'configuration', component: Configuration },

  {
    path: '',
    component: BaseComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'parametre', component: Parametres },
      { path: 'paiement', component: Paiement },
      { path: 'ajouter', component: Add },
      { path: 'liste', component: Liste },
       { path: 'note', component: Note },
      { path: 'bulletin', component: Buletin },
      
      
    ],
  },
];
