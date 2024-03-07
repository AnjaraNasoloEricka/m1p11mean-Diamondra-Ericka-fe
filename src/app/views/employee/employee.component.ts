import { Component, OnInit } from '@angular/core';
import { Employees } from 'src/app/model/Employees';
import { EmployeesService } from 'src/app/services/employee/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
  
  allEmployees : any = [];
  isLoading : boolean = false;
  
  constructor(private employeesService: EmployeesService) {}
  
  initEmployees(){
    this.isLoading = true;
    this.employeesService.getAll().then(
      (response : any) => {
        if(response.status !== 200) throw new Error(response);
        this.allEmployees = response.data;
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    ).finally(() => {
      this.isLoading = false;
    })
  }

  showDeleteConfirmation() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this employee!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Employee has been deleted.',
          'success'
        )
      }
    });
  }

  ngOnInit(): void {
    this.initEmployees();
  }
}
