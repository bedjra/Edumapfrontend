import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.html',
  styleUrl: './board.css'
})
export class Board implements OnInit {
  totalStudents = 5000;
  totalBulletins = 573;
  totalPayments = 12234;
  totalRevenue = 15500000;
  totalEleves!: number;

  constructor() {}

  ngOnInit(): void {
    // Initialisation des données
  }
}
