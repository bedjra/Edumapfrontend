import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Eleve } from '../../../Model/Eleve';
import { LoginService } from '../../../SERVICE/login-service';
import { Primaire } from '../../../SERVICE/primaire';

@Component({
  selector: 'app-note1',
  imports: [CommonModule, FormsModule, NgbModule, HttpClientModule, RouterLink],
  templateUrl: './note1.html',
  styleUrl: './note1.css'
})
export class Note1 {

}
