import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { th } from 'date-fns/locale';
import { ButtonType, buttonTypesData } from 'src/app/config/data/constant';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment.modal.component.html',
  styleUrls: ['./payment.modal.component.css']
})
export class PaymentModalComponent implements OnInit {

  showModal : boolean = false;
  isLoading : boolean = false;
  buttonType : ButtonType;
  @Input() buttonTypeValue : string = "create";
  @Input() appointmentId : string | undefined = undefined;
  @Output() refreshData: EventEmitter<void> = new EventEmitter<void>();

  error : string | undefined;

  formBuilder = new FormBuilder();
  formData : FormData = new FormData();
  paymentForm : FormGroup = new FormGroup({
    date : this.formBuilder.control(Date, [Validators.required]),
    amount : this.formBuilder.control(0, [Validators.required, Validators.min(0)])
  });

  constructor(private appointmentService : AppointmentService) { }

  ngOnInit(): void {
    this.buttonType = buttonTypesData.find((data) => data.type === this.buttonTypeValue);
  }

  checkFormValidity() {
    if(this.paymentForm.invalid) {
      if (this.paymentForm.controls.date.errors) {
        this.error = "Date is required";
      }
      if (this.paymentForm.controls.amount.errors?.min) {
        this.error = "Amount must be greater than 0";
      }
      if (this.paymentForm.controls.amount.errors?.required) {
        this.error = "Amount is required";
      }
      return;
    }
    this.savePayment();
  }

  savePayment() {
    const data = this.paymentForm.value;
    Object.keys(data).forEach(key => this.formData.append(key, data[key]));
    this.appointmentService.savePayment(data, this.appointmentId).then(
      (response : any) => {
        if(response.status !== 200) throw new Error(response);
        this.isLoading = false;
        this.toggleModal();
        this.refreshData.emit();
      }
    ).catch(
      (error) => {
        Object.keys(data).forEach(key => this.formData.delete(key));
        this.error = error.message;
        this.isLoading = false;
      }
    )
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

}
