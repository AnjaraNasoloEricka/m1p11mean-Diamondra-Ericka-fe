import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonType, buttonTypesData } from 'src/app/config/data/constant';
import { Services } from 'src/app/model/Services';
import { ServicesService } from 'src/app/services/service/services.service';
import { EmployeesService } from 'src/app/services/employee/employee.service';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { Employees } from 'src/app/model/Employees';

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

  @Input() buttonTypeValue : string = "create";

  buttonType : ButtonType;

  formbuilder : FormBuilder = new FormBuilder();
  appointmentform : FormGroup = this.formbuilder.group({
    startDateTime : ['', [Validators.required]],
    employeeId : ["", [Validators.required]]
  });

  constructor(private servicesService: ServicesService, private employeesSevice: EmployeesService, private appointmentsServices: AppointmentService ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.buttonType = buttonTypesData.find((data) => data.type === this.buttonTypeValue);
    console.log(this.buttonType);
    let user = JSON.parse(localStorage.getItem("user"));
    if (user.role.label === 'Employee') this.isEmployee = true;

    this.initServices();
    this.initEmployees();
  }

  checkFormValidity(){
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
    const data = this.appointmentform.value;
    Object.keys(data).forEach(key => this.formData.append(key, data[key]));
    this.formData.append("customerId", JSON.parse(localStorage.getItem("user")).id);
    this.appointmentsServices.insertAppointment(this.formData).then(
      (response : any) => {
        if(response.status !== 200) throw new Error(response);
        this.isLoading = false;
        this.toggleModal();
        //this.refreshData.emit();
      }
    ).catch(
      (error) => {
        Object.keys(data).forEach(key => this.formData.delete(key));
        this.error = error.error.message;
        this.isLoading = false;
      }
    )
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
