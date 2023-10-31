import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-accounts-page',
  templateUrl: './manage-accounts-page.component.html',
  styleUrls: ['./manage-accounts-page.component.css'],
})
export class ManageAccountsPageComponent {
  randomColor: string = this.getRandomColor();
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
