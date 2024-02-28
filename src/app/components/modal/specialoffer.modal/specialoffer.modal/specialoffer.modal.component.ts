import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonType, buttonTypesData } from 'src/app/config/data/constant';
import { ReductionType } from 'src/app/model/Type';

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

  @Input() buttonTypeValue : string = "create";

  @Output() refreshData: EventEmitter<void> = new EventEmitter<void>();

  buttonType : ButtonType;

  constructor() { }

  ngOnInit(): void {
    this.buttonType = buttonTypesData.find((data) => data.type === this.buttonTypeValue);

  }

  toggleModal(){
    this.showModal = !this.showModal;
    this.error = undefined;
  }

}
