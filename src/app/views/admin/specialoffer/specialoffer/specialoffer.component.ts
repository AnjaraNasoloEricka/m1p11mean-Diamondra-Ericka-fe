import { Component, OnInit } from '@angular/core';
import { Services, SpecialOffer } from 'src/app/model/Services';
import { EmployeesService } from 'src/app/services/employee/employee.service';
import { ServicesService } from 'src/app/services/service/services.service';
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
  allServices : Services[] = [];
  
  constructor(private specialofferService: SpecialofferService, private serviceService : ServicesService) {}

  initServices(){
    this.isLoading = true;
    this.serviceService.getAll().then(
      (response : any) => {
        if(response.status !== 200) throw new Error(response);
        this.allServices = response.data;
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    ).finally(() => {
      this.isLoading = false;
    })

  }
  
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


  showDeleteConfirmation(id : string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this special offer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.specialofferService.delete(id).then(
          (response : any) => {
            if(response.status !== 200) throw new Error(response);
            Swal.fire(
              'Deleted!',
              'Special has been deleted.',
              'success'
            )
            this.initSpecialOffer();
          }
        ).catch(
          (error) => {
            Swal.fire(
              'Error!',
              'Something went wrong.',
              'error'
            )
          }
        );
        
      }
    });
  }

  ngOnInit(): void {
    this.initServices();
    this.initSpecialOffer();
  }

}
