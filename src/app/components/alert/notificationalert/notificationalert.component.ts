import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-notificationalert',
  templateUrl: './notificationalert.component.html',
  styleUrls: ['./notificationalert.component.css']
})
export class NotificationalertComponent {
  @Input() title: string = 'Title';
  @Input() body: string = 'body';
  @Input() showNotification: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeNotification() {
    this.close.emit();

  }
}

