import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Appointment,
  AppointmentMove,
  CalendarSlot,
  PatientInfo,
} from '../../models/calendar';
import { MatDialog } from '@angular/material/dialog';
import { CalendarService } from '../../services/calendar.service';
import { AddAppointmentDialogComponent } from '../add-appointment-dialog/add-appointment-dialog.component';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { ToastrService } from 'ngx-toastr';
import { format } from 'date-fns';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AddNoteComponent } from 'src/app/modules/notes/components/add-note/add-note.component';

@Component({
  selector: 'appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css'],
})
export class AppointmentsListComponent {
  @Input() calendarSlots: CalendarSlot[] = [];
  @Input() doctorId: string = this.credentialsService.user_credentials._id;
  @Output() onChanges: EventEmitter<any> = new EventEmitter();
  deleting: string | false = false;
  moving: string | false = false;
  loadingMoving: boolean = false;

  constructor(
    private calendarService: CalendarService,
    private credentialsService: CredentialsService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  addAppointment(slot: CalendarSlot) {
    const { start_datetime, end_datetime } = slot;
    const dialogRef = this.dialog.open(AddAppointmentDialogComponent, {
      width: '400px',
      height: '500px',
      data: {
        doctorId: this.doctorId,
        start_datetime,
        end_datetime,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.onChanges.emit();
    });
  }

  getCompleteName(patient: PatientInfo): string {
    return `${patient.name} ${patient.lastname}`;
  }

  addNoteToAppointment(appointment: Appointment) {
    
  }

  deleteAppointment(appointment_id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Eliminar cita',
        message: '¿Está seguro que desea eliminar esta cita?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.deleting = appointment_id;
      this.calendarService.deleteAppointment(appointment_id).subscribe({
        next: () => {
          this.toastr.success('Cita eliminada', 'Éxito');
          this.onChanges.emit();
          this.deleting = false;
        },
        error: () => {
          this.deleting = false;
          this.toastr.error('Error al eliminar la cita', 'Error');
        },
      });
    });
  }

  onClickMoveOption(appointment_id: string) {
    this.moving = appointment_id;
  }

  onSelectSlotToMove(slot: CalendarSlot) {
    if (!slot.appointment) {
      this.moveAppointment(slot);
      return;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Mover cita',
        message:
          'La casilla seleccionada ya tiene una cita, ¿Desea intercambiarlas?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.moveAppointment(slot);
    });
  }

  moveAppointment(slot: CalendarSlot) {
    const { start_datetime, end_datetime } = slot;
    const args: AppointmentMove = {
      appointment_id: this.moving as string,
      start_datetime: format(start_datetime, 'yyyy-MM-dd HH:mm'),
      end_datetime: format(end_datetime, 'yyyy-MM-dd HH:mm'),
    };
    this.loadingMoving = true;
    this.calendarService.moveAppointment(args).subscribe({
      next: () => {
        this.toastr.success('Cita movida', 'Éxito');
        this.moving = false;
        this.loadingMoving = false;
        this.onChanges.emit();
      },
      error: () => {
        this.toastr.error('Error al mover la cita', 'Error');
        this.moving = false;
        this.loadingMoving = false;
      },
    });
  }

  onCancelMoveOption() {
    this.moving = false;
  }
}
