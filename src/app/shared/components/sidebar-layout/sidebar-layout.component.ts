import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.css']
})
export class SidebarLayoutComponent {

  constructor() { }

  logout() {
    console.log('logout');
  }
}
