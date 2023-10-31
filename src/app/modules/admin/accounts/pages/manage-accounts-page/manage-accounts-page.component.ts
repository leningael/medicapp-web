import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountDialogComponent } from '../account-dialog/account-dialog.component';

@Component({
  selector: 'app-manage-accounts-page',
  templateUrl: './manage-accounts-page.component.html',
  styleUrls: ['./manage-accounts-page.component.css'],
})
export class ManageAccountsPageComponent {
  randomColor: string = this.getRandomColor();

  constructor(public dialog: MatDialog) {}

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  addAccount(): void {
    const dialogRef = this.dialog.open(AccountDialogComponent, {
      width: '250px', // Ajusta el ancho según tus necesidades
    });
  }
}
