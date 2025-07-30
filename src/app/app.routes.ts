import { Routes } from '@angular/router';
import { Inscription } from './BASE/CONNEXION/inscription/inscription';
import { Configuration } from './BASE/CONNEXION/configuration/configuration';
import { LoginComponent } from './BASE/CONNEXION/login/login';

export const routes: Routes = [
          { path: '', component: LoginComponent },
          { path: 'inscription', component: Inscription },
          { path: 'configuration', component: Configuration },

];
