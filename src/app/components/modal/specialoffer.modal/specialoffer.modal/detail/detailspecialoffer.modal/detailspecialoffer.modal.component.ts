import { Component, Input, OnInit } from '@angular/core';
import { SpecialOffer } from 'src/app/model/Services';
import { ReductionType } from 'src/app/model/Type';

@Component({
  selector: 'app-detailspecialoffer-modal',
  templateUrl: './detailspecialoffer.modal.component.html',
  styleUrls: ['./detailspecialoffer.modal.component.css']
})
export class DetailspecialofferModalComponent implements OnInit {

  showModal : boolean = false;

  @Input() specialOffer : SpecialOffer;

  reductionTypes : ReductionType[] = Object.values(ReductionType);

  constructor() { }

  ngOnInit(): void {
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

}
