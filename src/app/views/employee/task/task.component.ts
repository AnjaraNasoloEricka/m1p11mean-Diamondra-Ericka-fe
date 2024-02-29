import { Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Appointment } from 'src/app/model/Appointment';
import { TaskService } from 'src/app/services/task/task.service';
import { EmployeesService } from 'src/app/services/employee/employee.service';

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
  taskDate : Date | null;
  
  toCome = [];

  done = [];

  inProgress = [];

  constructor(private taskService : TaskService, private employeeService : EmployeesService) {}

  ngOnInit() {
    this.employeeUserId = JSON.parse(localStorage.getItem("user")).id;
    this.loadData(new Date);
  }

  onTaskDateChange(event) {
    this.taskDate = event.target.value ? new Date(event.target.value) : null;
    this.loadData(this.taskDate);
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
      event.container
      
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
}
