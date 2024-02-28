import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonType, buttonTypesData } from 'src/app/config/data/constant';
import { Schedule } from 'src/app/model/Employees';
import { Day } from 'src/app/model/Type';
import { ScheduleService } from 'src/app/services/employee/schedule/schedule.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-schedule-modal',
  templateUrl: './schedule.modal.component.html',
  styleUrls: ['./schedule.modal.component.css']
})
export class ScheduleModalComponent implements OnInit {

  @Input() buttonTypeValue : string = "create";
  buttonType : ButtonType;

  @Input() schedule : Schedule;


  allDays: Day[] = Object.values(Day);

  formbuilder : FormBuilder = new FormBuilder();

  scheduleForm : FormGroup = this.formbuilder.group({
    startDate : ['', [Validators.required]],
    endDate : ['', [Validators.required]],
    startHour : ['', [Validators.required]],
    endHour : ['', [Validators.required]],
  });

  selectedDays : Day[] = [];

  @Output() refreshData: EventEmitter<void> = new EventEmitter<void>();

  isLoading : boolean = false;
  showDayDropdown : boolean = false;
  error : string | undefined;
  showModal : boolean = false;


  constructor(private scheduleService : ScheduleService, private utilsService : UtilsService) {}

  initDateForUpdate(){
    if(this.schedule){
      this.scheduleForm.patchValue({
        startDate: new Date(this.schedule.startDate).toISOString().split('T')[0],
        endDate : new Date(this.schedule.endDate).toISOString().split('T')[0],
        startHour : this.utilsService.convertTimeToStringHour(this.schedule.startHour),
        endHour : this.utilsService.convertTimeToStringHour(this.schedule.endHour),
      });
      this.selectedDays = this.schedule.day;
    }
  }

  toogleCheckboxDay(event : any){
    const selectedDay = event.target.value;
    if (event.target.checked) {
      this.selectedDays.push(selectedDay);
    } else {
      const index = this.selectedDays.indexOf(selectedDay);
      if (index > -1) {
        this.selectedDays.splice(index, 1);
      }
    }
  }


  checkFormValidity(){
    (this.selectedDays.length === 0) ? this.error = "Please select at least one day" : this.error = undefined;
    if (this.scheduleForm.invalid) {
      switch (true) {
        case this.scheduleForm.controls.startDate.invalid:
          this.error = "Please select a start date";
          break;
        case this.scheduleForm.controls.endDate.invalid:
          this.error = "Please select an end date";
          break;
        case this.scheduleForm.controls.startHour.invalid:
          this.error = "Please select a start hour";
          break;
        case this.scheduleForm.controls.endHour.invalid:
          this.error = "Please select an end hour";
          break;
        default:
          break;
      }
      return;
    }

    if (this.scheduleForm.controls.startDate.value > this.scheduleForm.controls.endDate.value) {
      this.error = "Start date should be less than end date";
      return;
    }

    if (this.scheduleForm.controls.startHour.value > this.scheduleForm.controls.endHour.value) {
      this.error = "Start hour should be less than end hour";
      return;
    }
    this.isLoading = true;
    this.error = undefined;
    (!this.schedule) ? this.saveSchedule() : this.updateSchedule();
  }

  isSelectedDay(dayLabel: Day): boolean {
    return this.selectedDays.includes(dayLabel);
  }

  updateSchedule(){
    this.scheduleService.updateSchedule({
      _id : this.schedule._id,
      ...this.scheduleForm.value,
      day : this.selectedDays
    }).then((data) => {
      this.refreshData.emit();
      this.toggleModal();
    }).catch((error) => {
      this.error = error.error.message;
    }).finally(() => {
      this.isLoading = false;
    });
  }

  saveSchedule(){
    this.scheduleService.insert({
      ...this.scheduleForm.value,
      day : this.selectedDays
    }).then((data) => {
      this.refreshData.emit();
      this.toggleModal();
    }).catch((error) => {
      this.error = error.error.message;
    }).finally(() => {
      this.isLoading = false;
    });
  }

  toogleDayDropdown(){
    this.showDayDropdown = !this.showDayDropdown;
  }

  ngOnInit(): void {
    this.buttonType = buttonTypesData.find((data) => data.type === this.buttonTypeValue);
    this.initDateForUpdate();
  }


  toggleModal(){
    this.showModal = !this.showModal;
    this.error = undefined;
  }

}
