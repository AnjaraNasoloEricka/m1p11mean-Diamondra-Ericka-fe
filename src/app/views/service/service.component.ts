import { Component, OnInit } from '@angular/core';
import { Services } from 'src/app/model/Services';
import { ServiceType } from 'src/app/model/Type';
import { ServicesService } from 'src/app/services/service/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
})
export class ServiceComponent implements OnInit {

  allServices : Services[] = [];
  isLoading : boolean = false;
  serviceType : ServiceType[] = [];
  filteredServices: Services[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;

  search(keyword: string) {
    this.filteredServices = this.allServices.filter(service =>
      service.name.toLowerCase().includes(keyword.toLowerCase())
    );
    this.currentPage = 1;
  }

  getCurrentPageServices(): Services[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredServices.slice(startIndex, endIndex);
  }

  nextPage() {
    this.currentPage++;
  }

  previousPage() {
    this.currentPage--;
  }

  isPreviousPageAvailable(): boolean {
    return this.currentPage > 1;
  }

  isNextPageAvailable(): boolean {
    return this.currentPage < Math.ceil(this.filteredServices.length / this.itemsPerPage);
  }

  getServiceTypeLabel(_id: string){
    return this.serviceType.find((serviceType) => serviceType._id === _id)?.label || "";
  }

  initServiceType(){
    this.servicesService.getServicesType().then(
      (response : any) => {
        if(response.status !== 200) throw new Error(response);
        this.serviceType = response.data;
      }
    ).catch(
      (error) => {
        Swal.fire(
          'Error!',
          error.message,
          'error'
        );
      }
    )
  }

  constructor(private servicesService : ServicesService) {}

  initServices(){
    this.isLoading = true;
    this.servicesService.getAll().then(
      (response : any) => {
        if(response.status !== 200) throw new Error(response);
        this.allServices = response.data;
        this.filteredServices = this.allServices;
      }
    ).catch(
      (error) => {}
    ).finally(() => {
      this.isLoading = false;
    })
  }

  showDeleteConfirmation(id : string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this service!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicesService.delete(id).then(
          (response : any) => {
            if(response.status !== 200) throw new Error(response);
            this.initServices();
            Swal.fire(
              'Deleted!',
              'Your service has been deleted.',
              'success'
            );
          }
        ).catch(
          (error) => {
            Swal.fire(
              'Error!',
              error.message,
              'error'
            );
          }
        );

      }
    });
  }




  ngOnInit(): void {
    this.initServiceType();
    this.initServices();
  }

}
