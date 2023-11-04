import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { addHours, format, isEqual } from 'date-fns';
import { Appointment, BuissinessHours, CalendarSlot } from '../../models/calendar';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarPageComponent implements OnInit, OnDestroy {
  selectedDate: Date = new Date();
  doctorId: string = this.credentialsService.user_credentials._id;
  businessHours: BuissinessHours = new BuissinessHours();
  appointments: Appointment[] = [];
  calendarSlots: CalendarSlot[] = [];
  isLoading: boolean = false;
  subs!: Subscription;

  constructor(
    private calendarService: CalendarService,
    private credentialsService: CredentialsService,
    private toastr: ToastrService
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
    const date:string = format(this.selectedDate, 'yyyy-MM-dd')
    this.subs = this.calendarService.getDayAppointments(this.doctorId, date).subscribe({
      next: ({business_hours, appointments}) => {
        this.businessHours = Object.assign(this.businessHours, business_hours)
        this.appointments = appointments;
        this.generateCalendarSlots();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error("No se pudieron obtener las citas del día", "Error");
      },
    });
  }

  generateCalendarSlots() {
    this.calendarSlots = [];
    const startTime = this.createDateByDayAndTime(this.selectedDate, this.businessHours.start_time);
    const endTime = this.createDateByDayAndTime(this.selectedDate, this.businessHours.end_time);
    let currentTime = startTime;
    while (currentTime <= endTime) {
      const slot: CalendarSlot = {
        time: format(currentTime, 'HH:mm'),
        appointment: this.appointments.find(({start_datetime}) => isEqual(currentTime, new Date(start_datetime))) || false,
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
