import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonType, buttonTypesData } from 'src/app/config/data/constant';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmployeesService } from 'src/app/services/employee/employee.service';
import { ServicesService } from 'src/app/services/service/services.service';
import { Employees } from 'src/app/model/Employees';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee.modal.component.html',
  styleUrls: ['./employee.modal.component.css']
})
export class EmployeeModalComponent implements OnInit {
  formData : FormData = new FormData();
  formBuiled = new FormBuilder();
  createEmpForm: FormGroup = new FormGroup({
    name: this.formBuiled.control("", [Validators.required, Validators.minLength(1)]),
    email: this.formBuiled.control("", [Validators.required, Validators.email, Validators.minLength(1)]),
    password: this.formBuiled.control("",[Validators.required, Validators.minLength(1)]),
    phoneNumber: this.formBuiled.control("", [Validators.required, Validators.minLength(1), Validators.pattern("^[0-9]*$")]),
  });

  updateEmpForm : FormGroup = new FormGroup({
    name: this.formBuiled.control("", [Validators.required, Validators.minLength(1)]),
    email: this.formBuiled.control("", [Validators.required, Validators.email, Validators.minLength(1)]),
    phoneNumber: this.formBuiled.control("", [Validators.required, Validators.minLength(1), Validators.pattern("^[0-9]*$")]),
    serviceIds: this.formBuiled.control("", []),
  });

  showModal : boolean = false;
  showServicetypes : boolean = false;
  isLoading : boolean = false;
  error : string | undefined;
  serviceTypes :  any = [];
  selectedServices : any[] = [];

  @Input() buttonTypeValue : string = "create";
  @Input() employee : Employees | undefined = undefined;
  @Output() refreshData: EventEmitter<void> = new EventEmitter<void>();

  buttonType : ButtonType;

  constructor(private employeesService: EmployeesService, private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.buttonType = buttonTypesData.find((data) => data.type === this.buttonTypeValue);
    this.initDataForUpdate();
    this.serviceTypes = this.servicesService.getAllTypes().then(
      (response : any) => {
        if(response.status !== 200) throw new Error(response);
        this.serviceTypes = response.data;
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    ).finally(() => {
      this.isLoading = false;
    });

  }

  toggleModal(){
    this.showModal = !this.showModal;
    this.error = undefined;
  }

  checkFormValidity(){
    if(this.createEmpForm.invalid){
      if ((this.createEmpForm.controls.phoneNumber.errors) || (this.createEmpForm.controls.phoneNumber.errors?.minlength)) {
        this.error = "Invalid phone number format";
        return;
      }
      if ((this.createEmpForm.controls.phoneNumber.errors?.required) ) {
        this.error = "Phone number is required";
        return;
      }
      if (!this.employee) {
        if ((this.createEmpForm.controls.password.errors?.required) || (this.createEmpForm.controls.password.errors?.minlength)) {
          this.error = "Password is required";
          return;
        }
      }
      if (this.createEmpForm.controls.email.errors?.email) {
        this.error = "Invalid email format";
        return;
      }
      if ((this.createEmpForm.controls.email.errors?.required) || (this.createEmpForm.controls.password.errors?.minlength)) {
        this.error = "Email is required";
        return;
      }      
      if ((this.createEmpForm.controls.name.errors?.required) || (this.createEmpForm.controls.name.errors?.minlength)) {
        this.error = "Name is required";
        return;
      }
    }
    (this.employee) ? this.updateEmployee() : this.saveEmployee();
  }

  initDataForUpdate(){
    if(this.employee){
      this.createEmpForm.controls.name.setValue(this.employee.user.name);
      this.createEmpForm.controls.email.setValue(this.employee.user.email);
      this.createEmpForm.controls.phoneNumber.setValue(this.employee.user.phoneNumber);
    }
  }

  saveEmployee() {
    const postData = {
      user: {
        name: this.createEmpForm.get('name').value,
        email: this.createEmpForm.get('email').value,
        password: this.createEmpForm.get('password').value,
        phoneNumber: this.createEmpForm.get('phoneNumber').value
      },
    };
    this.employeesService.insert(postData).then(
      (response : any) => {
        if(response.status !== 200) throw new Error(response);
        this.isLoading = false;
        this.toggleModal();
        this.refreshData.emit();
      }
    ).catch(
      (error) => {
        this.error = error.message;
        this.isLoading = false;
      }
    )
  }

  updateEmployee(){
    const postData = {
      user: {
        name: this.createEmpForm.get('name').value,
        email: this.createEmpForm.get('email').value,
        password: this.createEmpForm.get('password').value,
        phoneNumber: this.createEmpForm.get('phoneNumber').value
      }
    };
    this.employeesService.update(postData,this.employee._id).then(
      (response : any) => {
        if(response.status !== 200) throw new Error(response);
        this.isLoading = false;
        this.toggleModal();
        this.refreshData.emit();
      }
    ).catch(
      (error) => {
        this.error = error.message;
        this.isLoading = false;

      }
    )
  }

  toogleServiceTypes() {
    this.showServicetypes = !this.showServicetypes;
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
}
