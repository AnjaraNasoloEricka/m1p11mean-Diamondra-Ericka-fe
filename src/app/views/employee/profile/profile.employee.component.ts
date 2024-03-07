import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/model/Type";
import { EmployeesService } from "src/app/services/employee/employee.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-employee-profile',
  templateUrl: './profile.employee.component.html',
})

export class ProfileEmployeeComponent implements OnInit {

  userData : User = JSON.parse(localStorage.getItem('user'));

  formBuilder : FormBuilder = new FormBuilder();

  userForm : FormGroup = this.formBuilder.group({
    "name" : ['', Validators.required],
    "email" : ["", Validators.required],
    "phoneNumber" : ["", Validators.required]
  })

  constructor(private employeesService : EmployeesService){}

  updateEmployeeInfo(){
    this.employeesService.updateProfile(this.userForm.value)
    .then((resp) => {
      localStorage.setItem('user', JSON.stringify({ ...this.userForm.value }));
      Swal.fire("Success!", "Employee information updated successfully.", "success");
    }).catch((error) => {
      Swal.fire("Error!", error.message, "error");
    })
  }

  ngOnInit(): void {
    this.userForm.patchValue({
      "name" : this.userData.name,
      "email" : this.userData.email,
      "phoneNumber" : this.userData.phoneNumber
    })

  }
}
