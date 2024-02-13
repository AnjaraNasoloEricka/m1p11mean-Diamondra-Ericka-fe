import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonType, buttonTypesData } from 'src/app/config/data/constant';

@Component({
  selector: 'app-service-modal',
  templateUrl: './service.modal.component.html',
  styleUrls: ['./service.modal.component.css']
})
export class ServiceModalComponent implements OnInit {

  formBuilder = new FormBuilder();

  showModal : boolean = false;

  @Input() buttonTypeValue : string = "create";

  buttonType : ButtonType;

  error : string | undefined;

  selectedFile: string | null = null;

  serviceForm : FormGroup = new FormGroup({
    name : this.formBuilder.control("", [Validators.required, Validators.minLength(1)]),
    price : this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
    description : this.formBuilder.control("", [Validators.required, Validators.minLength(1)]),
    duration : this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
    commissionRate : this.formBuilder.control(0, [Validators.required, Validators.min(1)])
  });


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFile = reader.result as string;
      };
    }
  }

  checkFormValidity(){
    if(this.serviceForm.invalid){
      if ((this.serviceForm.controls.commissionRate.errors) || (this.serviceForm.controls.commissionRate.errors?.min)) {
        this.error = "Commission rate must be greater than 0";
      }
      if ((this.serviceForm.controls.duration.errors) || (this.serviceForm.controls.duration.errors?.min)) {
        this.error = "Duration must be greater than 0";
      }
      if ((this.serviceForm.controls.description.errors) || (this.serviceForm.controls.description.errors?.minlength)) {
        this.error = "Description is required";
      }
      if ((this.serviceForm.controls.price.errors) || (this.serviceForm.controls.price.errors?.min)) {
        this.error = "Price must be greater than 0";
      }
      if ((this.serviceForm.controls.name.errors) || (this.serviceForm.controls.name.errors?.minlength)) {
        this.error = "Name is required";
      }
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.buttonType = buttonTypesData.find((data) => data.type === this.buttonTypeValue);
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  onDrop(event: any) {
    event.preventDefault();
    this.onFileSelected(event);
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDragLeave(event: any) {
    event.preventDefault();
  }


}
