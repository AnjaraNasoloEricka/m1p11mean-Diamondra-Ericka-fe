import { Component, Input, OnInit } from '@angular/core';
import { ButtonType, buttonTypesData } from 'src/app/config/data/constant';

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

  constructor() { }

  ngOnInit(): void {
    this.buttonType = buttonTypesData.find((data) => data.type === this.buttonTypeValue);
    console.log(this.buttonType)
  }

  toggleModal(){
    this.showModal = !this.showModal;
    this.error = undefined;
  }

}
