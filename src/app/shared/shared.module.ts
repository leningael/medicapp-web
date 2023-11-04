import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';

import { SidebarLayoutComponent } from './components/sidebar-layout/sidebar-layout.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ShortNamePipe } from './pipes/short-name.pipe';

@NgModule({
  declarations: [SidebarLayoutComponent, ConfirmDialogComponent, ShortNamePipe],
  imports: [
    CommonModule,
    RouterModule,
    // Material Modules
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  exports: [
    SidebarLayoutComponent,
    ConfirmDialogComponent,
    ShortNamePipe,
    // Material Modules
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDateFnsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
  ],
})
export class SharedModule {}
