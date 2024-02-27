import { Component, OnInit } from "@angular/core";
import { Schedule } from "src/app/model/Employees";
import { CrudService } from "src/app/services/crud/crud.service";
import { ScheduleService } from "src/app/services/employee/schedule/schedule.service";

@Component({
  selector: "app-card-employee",
  templateUrl: "./card-employee.component.html",
})
export class CardEmployeeComponent implements OnInit {

  allSchedules : Schedule[] = [];

  ngOnInit(): void {
    this.initAllSchedules();
  }

  initAllSchedules(){
    this.scheduleService.getAll().then((response : any)=> {
       this.allSchedules = (response?.data[0].employeeSchedule);
    });
  }

  constructor(private scheduleService : ScheduleService) {}

}
