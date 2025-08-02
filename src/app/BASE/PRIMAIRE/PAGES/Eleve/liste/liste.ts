import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-liste',
  imports: [RouterLink,CommonModule],
  templateUrl: './liste.html',
  styleUrl: './liste.css'
})
export class Liste {

}
