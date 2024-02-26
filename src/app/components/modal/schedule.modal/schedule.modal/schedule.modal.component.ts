import { Component, Input, OnInit } from '@angular/core';
import { ButtonType, buttonTypesData } from 'src/app/config/data/constant';
import { Day } from 'src/app/model/Type';

@Component({
  selector: 'app-schedule-modal',
  templateUrl: './schedule.modal.component.html',
  styleUrls: ['./schedule.modal.component.css']
})
export class ScheduleModalComponent implements OnInit {

  @Input() buttonTypeValue : string = "create";
  showModal : boolean = false;

  buttonType : ButtonType;
  error : string | undefined;
  showDayDropdown : boolean = false;

  allDays: Day[] = Object.values(Day);

  constructor() {}

  toogleDayDropdown(){
    this.showDayDropdown = !this.showDayDropdown; 
  }

  ngOnInit(): void {
    this.buttonType = buttonTypesData.find((data) => data.type === this.buttonTypeValue);
  }

  toggleModal(){
    this.showModal = !this.showModal;
    this.error = undefined;
  }

}
