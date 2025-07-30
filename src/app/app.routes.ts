import { Routes } from '@angular/router';
import { Login } from './BASE/CONNEXION/login/login';
import { Inscription } from './BASE/CONNEXION/inscription/inscription';
import { Configuration } from './BASE/CONNEXION/configuration/configuration';

export const routes: Routes = [
          { path: 'inscription', component: Inscription },
          { path: 'configuration', component: Configuration },

];
