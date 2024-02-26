import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonType, buttonTypesData } from 'src/app/config/data/constant';
import { ServiceType } from 'src/app/model/Type';
import { ServicesService } from 'src/app/services/service/services.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-service-modal',
  templateUrl: './service.modal.component.html',
  styleUrls: ['./service.modal.component.css']
})
export class ServiceModalComponent implements OnInit {

  formBuilder = new FormBuilder();

  showModal : boolean = false;

  @Input() buttonTypeValue : string = "create";

  @Output() refreshData: EventEmitter<void> = new EventEmitter<void>();

  buttonType : ButtonType;

  error : string | undefined;

  imageUrl: string | undefined = undefined;

  formData : FormData = new FormData();

  serviceForm : FormGroup = new FormGroup({
    name : this.formBuilder.control("", [Validators.required, Validators.minLength(1)]),
    price : this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
    description : this.formBuilder.control("", [Validators.required, Validators.minLength(1)]),
    duration : this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
    commissionRate : this.formBuilder.control(0, [Validators.required, Validators.min(1)]),
    serviceType : this.formBuilder.control("", [Validators.required])
  });

  serviceType : ServiceType[] = [];
  isLoading : boolean = false;

  constructor(private servicesService : ServicesService, private utilsService : UtilsService) { }

  initServiceType(){
    this.servicesService.getServicesType().then(
      (response : any) => {
        if(response.status !== 200) throw new Error(response);
        this.serviceType = response.data;
        (this.serviceType.length > 0) && this.serviceForm.controls.serviceType.setValue(this.serviceType[0]._id);
      }
    ).catch(
      (error) => {
        this.error = error;
      }
    )
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
      return;
    }
    if(!this.imageUrl){
      this.error = "Image is required";
      return;
    }
    this.error = undefined;
    this.isLoading = true;
    this.saveService();
  }

  saveService(){
    const data = this.serviceForm.value;
    Object.keys(data).forEach(key => this.formData.append(key, data[key]));
    this.servicesService.insertService(this.formData).then(
      (response : any) => {
        if(response.status !== 200) throw new Error(response);
        this.isLoading = false;
        this.toggleModal();
        this.refreshData.emit();
      }
    ).catch(
      (error) => {
        Object.keys(data).forEach(key => this.formData.delete(key));
        this.error = error;
        this.isLoading = false;

      }
    )
  }

  ngOnInit(): void {
    this.buttonType = buttonTypesData.find((data) => data.type === this.buttonTypeValue);
    this.initServiceType();
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  onDragStart(event: DragEvent) {
    event.dataTransfer?.setData('text/plain', 'image');
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain');
    const file = event.dataTransfer?.files[0];
    this.handleFile(file);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.handleFile(file);
  }

  handleFile(file: File | undefined) {
    if (file && file.type.startsWith('image/')) {
      (this.formData.has('file')) && this.formData.delete('file');
      (file) && this.formData.append('file', file);
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  clearImage() {
    this.imageUrl = undefined;
  }



}
