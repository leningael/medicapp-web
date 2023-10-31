import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAccountsPageComponent } from './pages/manage-accounts-page/manage-accounts-page.component';
import { AccountsRoutingModule } from './accounts-routing.module';
// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [ManageAccountsPageComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
  ],
})
export class AccountsModule {}
