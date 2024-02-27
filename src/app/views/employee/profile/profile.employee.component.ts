import { Component, OnInit } from "@angular/core";
import { User } from "src/app/model/Type";

@Component({
  selector: 'app-employee-profile',
  templateUrl: './profile.employee.component.html',
})

export class ProfileEmployeeComponent implements OnInit {

  userData : User = JSON.parse(localStorage.getItem('user'));

  ngOnInit(): void {

  }
}
