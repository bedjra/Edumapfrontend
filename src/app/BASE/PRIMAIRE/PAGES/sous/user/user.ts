import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserCredentials } from '../../../Model/UserCredentials';
import { LoginService } from '../../../SERVICE/login-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [CommonModule ],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {
 
}
