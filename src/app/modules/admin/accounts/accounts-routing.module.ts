import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAccountsPageComponent } from './pages/manage-accounts-page/manage-accounts-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'manage-accounts',
        component: ManageAccountsPageComponent,
        data: { title: 'Manage Accounts' }
      },
      {
        path: '**',
        redirectTo: 'manage-accounts'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
