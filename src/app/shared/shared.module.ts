import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select'; 

import { SidebarLayoutComponent } from './components/sidebar-layout/sidebar-layout.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ShortNamePipe } from './pipes/short-name.pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { FilterDataComponent } from './components/filter-data/filter-data.component';

@NgModule({
  declarations: [SidebarLayoutComponent, ConfirmDialogComponent, ShortNamePipe, LoadingSpinnerComponent, SearchBoxComponent, FilterDataComponent],
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
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule 
  ],
  exports: [
    SidebarLayoutComponent,
    ConfirmDialogComponent,
    ShortNamePipe,
    LoadingSpinnerComponent,
    SearchBoxComponent,
    FilterDataComponent,
    // Material Modules
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    
  ],
})
export class SharedModule {}
