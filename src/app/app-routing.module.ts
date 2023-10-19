import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { PermissionGuard } from './modules/auth/guards/permissions.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profile'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'accounts',
        loadChildren: () => import('./modules/admin/accounts/accounts.module').then(m => m.AccountsModule),
        canLoad: [AuthGuard],
        canActivate: [PermissionGuard],
        data: { permissions: ['admin'] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
