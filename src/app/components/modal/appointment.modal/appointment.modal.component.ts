import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonType, buttonTypesData } from 'src/app/config/data/constant';
import { Services, SpecialOffer } from 'src/app/model/Services';
import { ServicesService } from 'src/app/services/service/services.service';
import { EmployeesService } from 'src/app/services/employee/employee.service';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { Employees } from 'src/app/model/Employees';
import { SpecialofferService } from 'src/app/services/specialoffer/specialoffer.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment.modal.component.html',
})
export class AppointmentModalComponent implements OnInit {
  formData : FormData = new FormData();
  showModal : boolean = false;
  isLoading : boolean = false;
  isEmployee : boolean = false;
  services : Services[] = [];
  employees : Employees[] = [];
  error : string | undefined;
  appointmentList : any = [];
  showService : boolean = false;
  selectedServices : Services[] = [];
  specialOffers : SpecialOffer[] = [];
  @Input() buttonTypeValue : string = "create";
  @Output() refreshData: EventEmitter<void> = new EventEmitter<void>();

  buttonType : ButtonType;

  formbuilder : FormBuilder = new FormBuilder();
  appointmentform : FormGroup = this.formbuilder.group({
    startDateTime : [Date, [Validators.required]],
    employeeId : ["", [Validators.required]]
  });

  constructor(private datePipe : DatePipe, private servicesService: ServicesService, private specialOffresService: SpecialofferService, private employeesSevice: EmployeesService, private appointmentsServices: AppointmentService ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.buttonType = buttonTypesData.find((data) => data.type === this.buttonTypeValue);
    let user = JSON.parse(localStorage.getItem("user"));
    if (user.role.label === 'Employee') this.isEmployee = true;

    this.initServices();
    this.initSpecialOffers();
    this.initEmployees();
  }

  checkFormValidity(){
    this.isLoading = true;
    if (this.appointmentform.invalid) {
      if ((this.appointmentform.controls.date.errors?.required) ) {
        this.error = "Date is required";
      }
      if ((this.selectedServices.length==0)) {
        this.error = "Select at least one Service";
      }
      if ((this.appointmentform.controls.employeeId.errors?.required)) {
        this.error = "Employee is required"
      }
      return;
    }
    this.saveAppointment()
  }

  saveAppointment(){
    const customerId =  JSON.parse(localStorage.getItem("user")).id;
    const postData = {
      customerId : customerId,
      employeeId : this.appointmentform.controls["employeeId"].value,
      startDateTime : this.appointmentform.controls["startDateTime"].value,
      services : this.selectedServices
    }
    this.appointmentsServices.insertAppointment(postData).then(
      (response : any) => {
        if(response.status !== 200) throw new Error(response);
        this.isLoading = false;
        this.toggleModal();
        this.refreshData.emit();
      }
    ).catch(
      (error) => {
        console.log(error);
        this.error = error.error.message;
        this.isLoading = false;
      }
    ).finally(() => {
      this.isLoading = false;
    })
  }

  initServices() {
    this.servicesService.getAll().then(
      (response : any) => {
        if(response.status !== 200) throw new Error(response);
        this.services = response.data;
      }
    ).catch(
      (error) => {}
    ).finally(() => {
      this.isLoading = false;
    })
  }

  initEmployees(){
    this.employeesSevice.getAll().then(
      (response : any) => {
        if(response.status !== 200) throw new Error(response);
        this.employees = response.data;
      }
    ).catch(
      (error) => {}
    ).finally(() => {
      this.isLoading = false;
    })
  }

  initSpecialOffers() {
    this.specialOffresService.getAll().then(
      (response : any) => {
        if(response.status !== 200) throw new Error(response);
        this.specialOffers = response.data;
      }
    ).catch(
      (error) => {}
    ).finally(() => {
      this.isLoading = false;
    })  }
  
  toggleModal(){
    this.showModal = !this.showModal;
    this.error = undefined;
  }

  toogleService() {
    this.showService = !this.showService;
  }

  toogleCheckboxService(event : any){
    const selectedService = event.target.value;
    if (event.target.checked) {
      this.selectedServices.push(selectedService);
    } else {
      const index = this.selectedServices.indexOf(selectedService);
      if (index > -1) {
        this.selectedServices.splice(index, 1);
      }
    }
  }

  onDateTimeChange(event: any){

  }
}
