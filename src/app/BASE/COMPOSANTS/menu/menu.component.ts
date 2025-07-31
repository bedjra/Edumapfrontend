import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../SERVICE/login.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../PAGES/NOTES/dialog/dialog.component';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink,
    
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  activeLink: string = '/base/statistique'; // Par défaut, aucun lien n'est actif
  constructor(public dialog: MatDialog) { }


logout() {
  localStorage.removeItem('userEmail');
  alert('Déconnexion réussie');
}

setActive(link: string) {
  console.log("Lien actif:", link);
  this.activeLink = link;
}


openDialog() {
  this.dialog.open(DialogComponent, {
    maxWidth: '50vw',
    maxHeight: '80vh',
    height: '75vh',
    width: '50vw',
    panelClass: 'blue-dialog'
  });
}


isSemestreModalOpen = false;

openSemestreModal() {
  this.isSemestreModalOpen = true;
}

closeSemestreModal() {
  this.isSemestreModalOpen = false;
}


}
