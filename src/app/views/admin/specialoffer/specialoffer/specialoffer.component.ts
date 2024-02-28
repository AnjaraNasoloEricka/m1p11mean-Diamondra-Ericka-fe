import { Component, OnInit } from '@angular/core';
import { SpecialOffer } from 'src/app/model/Services';
import { EmployeesService } from 'src/app/services/employee/employee.service';
import { SpecialofferService } from 'src/app/services/specialoffer/specialoffer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-specialoffer',
  templateUrl: './specialoffer.component.html',
  styleUrls: ['./specialoffer.component.css']
})
export class SpecialofferComponent implements OnInit {

  allSpecialOffer : SpecialOffer[] = [];
  isLoading : boolean = false;
  
  constructor(private specialofferService: SpecialofferService) {}
  
  initSpecialOffer(){
    this.isLoading = true;
    this.specialofferService.getAll().then(
      (response : any) => {
        if(response.status !== 200) throw new Error(response);
        this.allSpecialOffer = response.data;
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
    this.initSpecialOffer();
  }

}
