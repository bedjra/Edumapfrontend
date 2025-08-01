import { Routes } from '@angular/router';
import { Inscription } from './BASE/CONNEXION/inscription/inscription';
import { Configuration } from './BASE/CONNEXION/configuration/configuration';
import { LoginComponent } from './BASE/CONNEXION/login/login';
import { BaseComponent } from './BASE/PAGES/base/base.component';
import { DashboardComponent } from './BASE/PAGES/dashboard/dashboard.component';
import { Parametres } from './BASE/PAGES/parametres/parametres';
import { Paiement } from './BASE/PAGES/paiement/paiement';
import { Add } from './BASE/PAGES/Eleve/add/add';
import { Liste } from './BASE/PAGES/Eleve/liste/liste';
import { Note } from './BASE/PAGES/Note/note/note';
import { Buletin } from './BASE/PAGES/Note/buletin/buletin';

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
