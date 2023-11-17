import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { addHours, format, isEqual, startOfDay } from 'date-fns';
import {
  Appointment,
  BuissinessHours,
  CalendarSlot,
} from '../../models/calendar';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SetBusinessHoursDialogComponent } from '../../components/set-business-hours-dialog/set-business-hours-dialog.component';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarPageComponent implements OnInit, OnDestroy {
  selectedDate: Date = startOfDay(new Date());
  doctorId: string = this.credentialsService.user_credentials._id;
  businessHours: BuissinessHours = new BuissinessHours();
  appointments: Appointment[] = [];
  calendarSlots: CalendarSlot[] = [];
  isLoading: boolean = false;
  subs!: Subscription;

  constructor(
    private calendarService: CalendarService,
    private credentialsService: CredentialsService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.requestDayAppointments();
  }

  ngOnDestroy(): void {
    this.subs && this.subs.unsubscribe();
  }

  requestDayAppointments() {
    this.subs && this.subs.unsubscribe();
    this.isLoading = true;
    const date: string = format(this.selectedDate, 'yyyy-MM-dd');
    this.subs = this.calendarService
      .getDayAppointments(this.doctorId, date)
      .subscribe({
        next: ({ business_hours, appointments }) => {
          this.businessHours = Object.assign(
            this.businessHours,
            business_hours
          );
          this.appointments = appointments;          
          this.generateCalendarSlots();
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.toastr.error(
            'No se pudieron obtener las citas del día',
            'Error'
          );
        },
      });
  }

  generateCalendarSlots() {
    this.calendarSlots = [];
    const startTime = this.createDateByDayAndTime(
      this.selectedDate,
      this.businessHours.start_time
    );
    const endTime = this.createDateByDayAndTime(
      this.selectedDate,
      this.businessHours.end_time
    );
    let currentTime = startTime;
    while (currentTime < endTime) {
      const slot: CalendarSlot = {
        start_datetime: currentTime,
        end_datetime: addHours(currentTime, 1),
        appointment:
          this.appointments.find(({ start_datetime }) =>
            isEqual(currentTime, new Date(start_datetime))
          ) || false,
      };
      this.calendarSlots.push(slot);
      currentTime = addHours(currentTime, 1);
    }
  }

  createDateByDayAndTime(day: Date, time: string): Date {
    const date = new Date(day);
    const [hours, minutes] = time.split(':');
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    return date;
  }

  setBusinessHours() {
    const dialogRef = this.dialog.open(SetBusinessHoursDialogComponent, {
      width: '400px',
      data: this.businessHours,
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.businessHours = Object.assign(this.businessHours, result);
      this.generateCalendarSlots();
    });
  }
}
