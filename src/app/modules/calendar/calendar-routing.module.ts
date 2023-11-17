import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'my-calendar',
        component: CalendarPageComponent,
        data: { title: 'Agenda' },
      },
      {
        path: '**',
        redirectTo: 'my-calendar',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
