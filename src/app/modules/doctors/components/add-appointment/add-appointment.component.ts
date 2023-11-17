import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DoctorOverview } from '../../interfaces/doctors.interfaces';
import { addHours, format, isEqual, startOfDay } from 'date-fns';
import { Subscription } from 'rxjs';
import { Appointment, BuissinessHours, CalendarSlot } from 'src/app/modules/calendar/models/calendar';
import { CalendarService } from 'src/app/modules/calendar/services/calendar.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddAppointmentComponent implements OnInit, OnDestroy {
  selectedDate: Date = startOfDay(new Date());
  businessHours: BuissinessHours = new BuissinessHours();
  appointments: Appointment[] = [];
  calendarSlots: CalendarSlot[] = [];
  isLoading: boolean = false;
  subs!: Subscription;
  constructor(
    private calendarService: CalendarService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public doctor: DoctorOverview,
  ) { }

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
      .getDayAppointments(this.doctor._id, date)
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
    while (currentTime <= endTime) {
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
}
