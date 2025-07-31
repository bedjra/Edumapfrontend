import { Routes } from '@angular/router';
import { Inscription } from './BASE/CONNEXION/inscription/inscription';
import { Configuration } from './BASE/CONNEXION/configuration/configuration';
import { LoginComponent } from './BASE/CONNEXION/login/login';
import { BaseComponent } from './BASE/PAGES/base/base.component';
import { DashboardComponent } from './BASE/PAGES/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'inscription', component: Inscription },
  { path: 'configuration', component: Configuration },

  {
    path: '',
    component: BaseComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      
    ],
  },
];
