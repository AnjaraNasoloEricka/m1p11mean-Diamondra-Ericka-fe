import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/model/Appointment';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',  
})
export class AppointmentComponent implements OnInit {

  isLoading : boolean = false;
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;
  selectedState: string | null = null;

  constructor(private appointmentService : AppointmentService, private router: Router) { }

  ngOnInit(): void {
    this.filteredAppointments = this.appointments; // Initially show all appointments
    this.initAppointments()
  }

  filterAppointments() {
    this.filteredAppointments = this.appointments.filter(appointment => {
      const dateInRange = !this.startDate || (appointment.startDateTime >= this.startDate && appointment.startDateTime <= this.endDate);
      const stateMatches = !this.selectedState || appointment.startDateTime === this.selectedState;
      return dateInRange && stateMatches;
    });
  }

  onStartDateChange(event: any) {
    this.startDate = event.target.value ? new Date(event.target.value) : null;
    this.filterAppointments();
  }

  onEndDateChange(event: any) {
    this.endDate = event.target.value ? new Date(event.target.value) : null;
    this.filterAppointments();
  }

  onStateChange(event: any) {
    this.selectedState = event.target.value;
    this.filterAppointments();
  }

  initAppointments() {
    let customerId = JSON.parse(localStorage.getItem("user"));
    this.appointmentService.getCustomerAppointments(customerId.id).then(
      (response: any) => {
        if (response.status !== 200) throw new Error(response);
        this.appointments = response.data;
        this.filteredAppointments = this.appointments;
      }
    ).catch(
      (error) => {
        // Handle error
      }
    ).finally(() => {
      this.isLoading = false;
    });
  }

  showDetail(appointment:Appointment) {
    this.router.navigate(["/customer/appointments/"+appointment._id]);
  }
}
