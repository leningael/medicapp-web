import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { PermissionGuard } from './modules/auth/guards/permissions.guard';
import { SidebarLayoutComponent } from './shared/components/sidebar-layout/sidebar-layout.component';

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
    component: SidebarLayoutComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
        canLoad: [AuthGuard],
      },
      {
        path: 'accounts',
        loadChildren: () => import('./modules/admin/accounts/accounts.module').then(m => m.AccountsModule),
        canLoad: [AuthGuard],
        canActivate: [PermissionGuard],
        data: { permissions: ['admin'] }
      },
      {
        path: 'calendar',
        loadChildren: () => import('./modules/calendar/calendar.module').then(m => m.CalendarModule),
        canLoad: [AuthGuard],
        canActivate: [PermissionGuard],
        data: { permissions: ['doctor'] }
      },
      {
        path: 'patients',
        loadChildren: () => import('./modules/patient/patient.module').then(m => m.PatientModule),
        canLoad: [AuthGuard],
        canActivate: [PermissionGuard],
        data: { permissions: ['doctor'] }
      },
      {
        path: 'receptionists',
        loadChildren: () => import('./modules/receptionists/receptionists.module').then(m => m.ReceptionistsModule),
        canLoad: [AuthGuard],
        canActivate: [PermissionGuard],
        data: { permissions: ['doctor'] }
      },
      {
        path: 'notes',
        loadChildren: () => import('./modules/notes/notes.module').then(m => m.NotesModule),
        canLoad: [AuthGuard],
        canActivate: [PermissionGuard],
        data: { permissions: ['doctor'] }
      },
      {
        path: 'doctors',
        loadChildren: () => import('./modules/doctors/doctors.module').then(m => m.DoctorsModule),
        canLoad: [AuthGuard],
        canActivate: [PermissionGuard],
        data: { permissions: ['receptionist'] }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
