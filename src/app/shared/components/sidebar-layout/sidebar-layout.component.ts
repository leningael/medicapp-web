import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { CredentialsService } from '../../services/credentials.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { filter, map } from 'rxjs';
import { UserData } from '../../interfaces/credentials.interfaces';
import { NAV_ITEMS, NavItem } from './nav-items'

@Component({
  selector: 'app-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.css'],
})
export class SidebarLayoutComponent implements OnInit {
  navItems: NavItem[] = NAV_ITEMS;
  routeTitle: string = '';
  userData: UserData;
  userName: string = '';

  constructor(
    private authService: AuthService,
    private credentialsService: CredentialsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userData = this.credentialsService.user_credentials;
    console.log(this.userData);
    this.userName = `${this.userData.name} ${this.userData.lastname}`;
  }

  ngOnInit(): void {
    this.routeTitle = this.getDeepestActiveRouteTitle();
    // Subscribe to router events to get the title of the current route
    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        map(() => this.getDeepestActiveRouteTitle())
      )
      .subscribe((title) => {
        this.routeTitle = title;
      });
  }

  getDeepestActiveRouteTitle(): string {
    let child = this.route.firstChild;
    while (child?.firstChild) {
      child = child.firstChild;
    }
    if (child?.snapshot.data['title']) {
      return child.snapshot.data['title'];
    }
    return '';
  }

  checkPermission(permissions: string[]): boolean {
    return this.credentialsService.checkPermission(permissions);
  }

  logout() {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Cerrar sesión',
          message: '¿Estás seguro de que quieres cerrar sesión?',
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.authService.logout();
        }
      });
  }
}
