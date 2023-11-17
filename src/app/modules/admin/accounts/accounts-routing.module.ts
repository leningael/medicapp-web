import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsPageComponent } from './pages/accounts-page/accounts-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'manage-accounts',
        component: AccountsPageComponent,
        data: { title: 'Administrar cuentas' }
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
