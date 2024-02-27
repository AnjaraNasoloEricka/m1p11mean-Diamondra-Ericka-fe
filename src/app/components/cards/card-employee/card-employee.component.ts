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
  filteredSchedules : Schedule[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5;

  ngOnInit(): void {
    this.initAllSchedules();
  }

  getCurrentPageSchedules(): Schedule[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredSchedules.slice(startIndex, endIndex);
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
    return this.currentPage < Math.ceil(this.filteredSchedules.length / this.itemsPerPage);
  }


  initAllSchedules(){
    this.scheduleService.getAll().then((response : any)=> {
       let scheduleList = (response?.data[0].employeeSchedule);
       scheduleList.forEach(schedule => {
        schedule.day.forEach(day => {
          const unwindedSchedule: Schedule = {
            ...schedule,
            day: [day]
          };
          this.allSchedules.push(unwindedSchedule);
        })
       });
       this.filteredSchedules = this.allSchedules;
    });
  }

  constructor(private scheduleService : ScheduleService) {}

}
