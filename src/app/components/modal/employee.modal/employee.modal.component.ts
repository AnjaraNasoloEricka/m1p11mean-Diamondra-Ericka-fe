import { Component, Input, OnInit } from '@angular/core';
import { ButtonType, buttonTypesData } from 'src/app/config/data/constant';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmployeesService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee.modal.component.html',
  styleUrls: ['./employee.modal.component.css']
})
export class EmployeeModalComponent implements OnInit {

  formBuiled = new FormBuilder();
  createEmpForm: FormGroup = new FormGroup({
    name: this.formBuiled.control("", [Validators.required, Validators.minLength(1)]),
    email: this.formBuiled.control("", [Validators.required, Validators.email, Validators.minLength(1)]),
    password: this.formBuiled.control("", [Validators.required, Validators.minLength(1)]),
    phoneNumber: this.formBuiled.control("", [Validators.required, Validators.minLength(1), Validators.pattern("^[0-9]*$")]),
  });

  showModal : boolean = false;
  isLoading : boolean = false;
  error : string | undefined;

  @Input() buttonTypeValue : string = "create";

  buttonType : ButtonType;

  constructor(private employeesService: EmployeesService) {}

  ngOnInit(): void {
    this.buttonType = buttonTypesData.find((data) => data.type === this.buttonTypeValue);
    console.log(this.buttonType)
  }

  toggleModal(){
    this.showModal = !this.showModal;
    this.error = undefined;
  }

  checkFormValidity(){
    if(this.createEmpForm.invalid){
      if ((this.createEmpForm.controls.phoneNumber.errors) || (this.createEmpForm.controls.phoneNumber.errors?.minlength)) {
        this.error = "Invalid phone number format";
      }
      if ((this.createEmpForm.controls.phoneNumber.errors?.required) ) {
        this.error = "Phone number is required";
      }
      if ((this.createEmpForm.controls.password.errors?.required) || (this.createEmpForm.controls.password.errors?.minlength)) {
        this.error = "Password is required";
      }
      if (this.createEmpForm.controls.email.errors?.email) {
        this.error = "Invalid email format";
      }
      if ((this.createEmpForm.controls.email.errors?.required) || (this.createEmpForm.controls.password.errors?.minlength)) {
        this.error = "Email is required";
      }      
      if ((this.createEmpForm.controls.name.errors?.required) || (this.createEmpForm.controls.name.errors?.minlength)) {
        this.error = "Name is required";
      }
      return;
    }
    this.handleCreateEmployee();
  }

  handleCreateEmployee() {
    this.isLoading = true;
    const postData = {
      user: {
        name: this.createEmpForm.get('name').value,
        email: this.createEmpForm.get('email').value,
        password: this.createEmpForm.get('password').value,
        phoneNumber: this.createEmpForm.get('phoneNumber').value
      }
    };
    this.employeesService.insert(postData).then(
      (response : any) => {
        if(response.status !== 200) throw new Error(response);
        this.toggleModal();
      }
    ).catch(
      (error) => {
        this.error = error;
      }
    ).finally(() => {
      this.isLoading = false;
    })
  }

}
