import { Component } from '@angular/core';
import { User } from '../sous/user/user';
import { Scolarite } from '../sous/scolarite/scolarite';
import { Prof } from '../sous/prof/prof';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parametres',
  imports: [CommonModule, RouterModule],
  templateUrl: './parametres.html',
  styleUrl: './parametres.css'
})
export class Parametres {

}
