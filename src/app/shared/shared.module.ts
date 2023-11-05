import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';

import { SidebarLayoutComponent } from './components/sidebar-layout/sidebar-layout.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ShortNamePipe } from './pipes/short-name.pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SelectPersonComponent } from './components/select-person/select-person.component';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    SidebarLayoutComponent,
    ConfirmDialogComponent,
    ShortNamePipe,
    LoadingSpinnerComponent,
    SearchBoxComponent,
    SelectPersonComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    // Material Modules
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
  ],
  exports: [
    SidebarLayoutComponent,
    ConfirmDialogComponent,
    ShortNamePipe,
    LoadingSpinnerComponent,
    SearchBoxComponent,
    SelectPersonComponent,
    // Material Modules
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDateFnsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTabsModule,
    MatPaginatorModule,
    
  ],
})
export class SharedModule {}
