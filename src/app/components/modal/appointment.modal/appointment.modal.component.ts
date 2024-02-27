import { Component, Input, OnInit } from '@angular/core';
import { th } from 'date-fns/locale';
import { ButtonType, buttonTypesData } from 'src/app/config/data/constant';
import { ServicesService } from 'src/app/services/service/services.service';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment.modal.component.html',
})
export class AppointmentModalComponent implements OnInit {

  showModal : boolean = false;
  isLoading : boolean = false;
  isEmployee : boolean = false;
  services : any = [];
  error : string | undefined;
  appointmentList : any = [];

  @Input() buttonTypeValue : string = "create";

  buttonType : ButtonType;

  constructor(private servicesService: ServicesService ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.buttonType = buttonTypesData.find((data) => data.type === this.buttonTypeValue);
    console.log(this.buttonType);
    let user = JSON.parse(localStorage.getItem("user"));
    if (user.role.label === 'Employee') this.isEmployee = true;

    this.services = this.servicesService.getAll().then(
      (response : any) => {
        if(response.status !== 200) throw new Error(response);
        this.services = response.data;
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
}
