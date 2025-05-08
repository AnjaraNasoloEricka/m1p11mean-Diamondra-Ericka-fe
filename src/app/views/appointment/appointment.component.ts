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
  startDate: string | null = null;
  endDate: string | null = null;
  selectedState: string | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private appointmentService : AppointmentService, private router: Router) { }

  ngOnInit(): void {
    this.filteredAppointments = this.appointments; // Initially show all appointments
    this.initAppointments()
  }

  filterAppointments() {
    this.currentPage = 1;
    this.filteredAppointments = this.appointments.filter(appointment => {
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      const dateInRange = !this.startDate || (appointment.startDateTime >= startDate && appointment.startDateTime <= endDate);
      const stateMatches = !this.selectedState || appointment.status === this.selectedState;
      return dateInRange && stateMatches;
    });
  }

  getCurrentPageAppointments(): Appointment[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredAppointments.slice(startIndex, endIndex);
  }

  nextPage() {
    this.currentPage++;
  }

  previousPage() {
    this.currentPage--;
  }

  isPreviousPageAvailable(): boolean {
    return this.currentPage > 1;
  }

  isNextPageAvailable(): boolean {
    return this.currentPage < Math.ceil(this.filteredAppointments.length / this.itemsPerPage);
  }


  onStartDateChange(event: any) {
    this.startDate = event.target.value ? event.target.value : null;
    this.filterAppointments();
  }

  onEndDateChange(event: any) {
    this.endDate = event.target.value ? event.target.value : null;
    this.filterAppointments();
  }

  onStateChange(event: any) {
    this.selectedState = event.target.value;
    this.filterAppointments();
  }

  initAppointments() {
    this.isLoading = true;
    let customerId = JSON.parse(localStorage.getItem("user"));
    if(customerId.role.label === "Employee"){
      this.appointmentService.getEmployeeAppointments().then(
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
    else{
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
  }

  showDetail(appointment:Appointment) {
    this.router.navigate(["/customer/appointments/"+appointment._id]);
  }
}
