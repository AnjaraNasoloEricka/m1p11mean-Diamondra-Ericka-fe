import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonType, buttonTypesData } from 'src/app/config/data/constant';
import { Services } from 'src/app/model/Services';
import { ReductionType } from 'src/app/model/Type';
import { SpecialofferService } from 'src/app/services/specialoffer/specialoffer.service';

@Component({
  selector: 'app-specialoffer-modal',
  templateUrl: './specialoffer.modal.component.html',
  styleUrls: ['./specialoffer.modal.component.css']
})
export class SpecialofferModalComponent implements OnInit {

  showModal : boolean = false;
  isLoading : boolean = false;
  error : string | undefined;

  reductionTypes : ReductionType[] = Object.values(ReductionType);

  formBuilder = new FormBuilder();

  specialOfferForm : FormGroup = new FormGroup({
    startDate : this.formBuilder.control("", [Validators.required]),
    endDate : this.formBuilder.control("", [Validators.required]),
    reductionType : this.formBuilder.control("", [Validators.required]),
    reductionValue : this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
    commissionRate : this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
    commissionValue : this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
  });

  @Input() buttonTypeValue : string = "create";

  @Output() refreshData: EventEmitter<void> = new EventEmitter<void>();

  @Input() allServices : Services[] = [];

  selectedServices : any[] = [];

  buttonType : ButtonType;

  showServices : boolean = false;

  constructor(private specialOfferService : SpecialofferService) { }

  checkFormValidity(){
    if(!this.specialOfferForm.valid){
      if(this.specialOfferForm.controls.startDate.invalid){
        this.error = "Start date is required";
      }
      if(this.specialOfferForm.controls.endDate.invalid){
        this.error = "End date is required";
      }
      if(this.specialOfferForm.controls.reductionType.invalid){
        this.error = "Reduction type is required";
      }
      if(this.specialOfferForm.controls.reductionValue.invalid){
        this.error = "Reduction value is required";
      }
      if(this.specialOfferForm.controls.commissionRate.invalid){
        this.error = "Commission rate is required";
      }
      if(this.specialOfferForm.controls.commissionValue.invalid){
        this.error = "Commission value is required";
      }
      if(this.specialOfferForm.controls.reductionValue.value < 1){
        this.error = "Reduction value must be greater than 0";
      }
      if(this.specialOfferForm.controls.commissionRate.value < 1){
        this.error = "Commission rate must be greater than 0";
      }
      return;
    }
    if(this.selectedServices.length === 0){
      this.error = "You must select at least one service";
      return;
    }
    if(new Date(this.specialOfferForm.controls.startDate.value) > new Date(this.specialOfferForm.controls.endDate.value)){
      this.error = "Start date must be before end date";
      return;
    }
    this.isLoading = true;
    this.error = undefined;
    this.saveSpecialOffer();
  }

  isSelectedService(_id: string){
    return this.selectedServices.includes(_id);
  }

  saveSpecialOffer(){
    const specialOffer = {
      ...this.specialOfferForm.value,
      services : this.selectedServices
    };
    this.specialOfferService.insert(specialOffer).then(
      (response : any) => {
        if(response.status !== 200) throw new Error(response);
        this.refreshData.emit();
        this.toggleModal();
      }
    ).catch(
      (error) => {
        this.error = error.error.message;
      }
    ).finally(() => {
      this.isLoading = false;
    })
  }

  ngOnInit(): void {
    this.buttonType = buttonTypesData.find((data) => data.type === this.buttonTypeValue);
  }

  toogleServices() {
    this.showServices = !this.showServices;
  }

  toggleModal(){
    this.showModal = !this.showModal;
    this.error = undefined;
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
