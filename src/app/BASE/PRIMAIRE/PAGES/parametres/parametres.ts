import { Component } from '@angular/core';
import { User } from '../sous/user/user';
import { Scolarite } from '../sous/scolarite/scolarite';
import { Prof } from '../sous/prof/prof';

@Component({
  selector: 'app-parametres',
  imports: [User,Scolarite,Prof],
  templateUrl: './parametres.html',
  styleUrl: './parametres.css'
})
export class Parametres {

}
