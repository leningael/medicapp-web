import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAccountsPageComponent } from './pages/manage-accounts-page/manage-accounts-page.component';
import { AccountsRoutingModule } from './accounts-routing.module';



@NgModule({
  declarations: [
    ManageAccountsPageComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule
  ]
})
export class AccountsModule { }
