import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsRoutingModule } from './accounts-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountsPageComponent } from './pages/accounts-page/accounts-page.component';
import { PostAccountDialogComponent } from './components/post-account-dialog/post-account-dialog.component';

@NgModule({
  declarations: [
    AccountsPageComponent,
    PostAccountDialogComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
})
export class AccountsModule {}
