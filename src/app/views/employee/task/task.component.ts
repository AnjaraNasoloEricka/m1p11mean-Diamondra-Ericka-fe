import { Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Appointment } from 'src/app/model/Appointment';
import { TaskService } from 'src/app/services/task/task.service';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  isLoading : boolean = false;
  error : string | undefined;
  commission : number = 0;
  employeeUserId : string | undefined = undefined;
  taskDate : string | null;
  
  toCome = [];

  done = [];

  inProgress = [];

  constructor(private taskService : TaskService, private appointmentService : AppointmentService, private datePipe : DatePipe, private router: Router) {}

  ngOnInit() {
    this.employeeUserId = JSON.parse(localStorage.getItem("user")).id;
    this.taskDate = this.datePipe.transform(new Date, "yyyy-MM-dd");
    this.loadData(new Date);
  }

  onTaskDateChange(event) {
    this.taskDate = event.target.value ? event.target.value : null;
    this.loadData(new Date(this.taskDate));
  }
    

  // The key function to handle drag and drop events
  drop(event: CdkDragDrop<Appointment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      
      const droppedAppointment = event.item.data as Appointment;
      console.log(event.item.data);
      switch (event.container.id) {
        case 'cdk-drop-list-0':
          this.appointmentService.updateAppointmentStatus(droppedAppointment._id, "toCome")
          break;
        case 'cdk-drop-list-1':
          this.appointmentService.updateAppointmentStatus(droppedAppointment._id, "inProgress")
          break;
        case 'cdk-drop-list-2':
          this.appointmentService.updateAppointmentStatus(droppedAppointment._id, "done")
          break;
      }
      this.loadData(new Date(this.taskDate));
    }
  }

  /** Prevents dragging items when they're not supposed to be moved */
  shouldDrag(appointment: Appointment): boolean {
    // Example: you could add conditions here, like disabling drag for completed tasks
    return true; 
  }

  loadData(date : Date) {
    this.taskService.getEmployeeTask(this.employeeUserId, date).then(
      (response : any) => {
        if(response.status !== 200) throw new Error(response);
        this.commission = response.data.commission;
        this.toCome = response.data.toCome;
        this.inProgress = response.data.inProgress;
        this.done = response.data.done;
      }
    ).catch(
      (error) => {
        this.error = error.error.message;
      }
    )
  }

  showDetail(appointment:Appointment) {
    this.router.navigate(["/employee/appointments/"+appointment._id]);
  }
}
