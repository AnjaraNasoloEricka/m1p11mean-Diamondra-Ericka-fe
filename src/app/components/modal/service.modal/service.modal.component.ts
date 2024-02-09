import { Component, Input, OnInit } from '@angular/core';
import { ButtonType, buttonTypesData } from 'src/app/config/data/constant';

@Component({
  selector: 'app-service-modal',
  templateUrl: './service.modal.component.html',
  styleUrls: ['./service.modal.component.css']
})
export class ServiceModalComponent implements OnInit {

  showModal : boolean = false;

  @Input() buttonTypeValue : string = "create";

  buttonType : ButtonType;

  constructor() { }

  ngOnInit(): void {
    this.buttonType = buttonTypesData.find((data) => data.type === this.buttonTypeValue);
    console.log(this.buttonType)
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  onDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.handleFiles(files);
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDragLeave(event: any) {
    event.preventDefault();
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    this.handleFiles(files);
  }

  handleFiles(files: FileList) {
    // Handle the dropped or selected files here
    console.log(files);
  }
  

}
