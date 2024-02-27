import { Component, OnInit } from '@angular/core';

interface Appointment {
  name: string;
  date: Date;
  time: string;
  state: string;
}

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',  
})
export class AppointmentComponent implements OnInit {

  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;
  selectedState: string | null = null;

  constructor() { }

  ngOnInit(): void {
    this.appointments = [
      { name: 'John Doe', date: new Date('2024-03-01'), time: '10:00 AM', state: 'CA' },
      { name: 'Jane Smith', date: new Date('2024-03-05'), time: '2:00 PM', state: 'NY' },
      { name: 'Mike Lee', date: new Date('2024-02-20'), time: '11:00 AM', state: 'CA' },
    ];
    this.filteredAppointments = this.appointments; // Initially show all appointments
  }

  filterAppointments() {
    this.filteredAppointments = this.appointments.filter(appointment => {
      const dateInRange = !this.startDate || (appointment.date >= this.startDate && appointment.date <= this.endDate);
      const stateMatches = !this.selectedState || appointment.state === this.selectedState;
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
}
