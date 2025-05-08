import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/model/Appointment';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {

  appointment : Appointment;
  isLoading : boolean = false;
  notPaid : boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private appointmentService : AppointmentService) {}
  
  ngOnInit(): void {
    this.isLoading = true;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadAppointment(id);
  }

  loadAppointment(id: string) {
    this.appointmentService.getAppointmentById(id).then(
      (response: any) => {
        if (response.status !== 200) throw new Error(response);
        this.appointment = response.data;
        if (this.appointment.leftToPay === 0) {
          this.notPaid = false;
        }
      }
    ).catch(
      (error) => {
        // Handle error
      }
    ).finally(() => {
      this.isLoading = false;
    });
  }
}
