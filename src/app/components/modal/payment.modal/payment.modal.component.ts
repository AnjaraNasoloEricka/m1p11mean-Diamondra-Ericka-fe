import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonType, buttonTypesData } from 'src/app/config/data/constant';

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
  error : string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.buttonType = buttonTypesData.find((data) => data.type === this.buttonTypeValue);
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

}
