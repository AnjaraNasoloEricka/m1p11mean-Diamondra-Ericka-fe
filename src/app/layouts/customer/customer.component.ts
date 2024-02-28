import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/model/Type';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {

  showNotification : boolean = false;
  notification : Notification = {
    title : "",
    body : ""
  }


  closeNotification(){
    this.showNotification = false;
  }

  defineData(data : Notification){
    (data) && (
      this.showNotification = true,
      this.notification = data
    );
  }

  constructor(private notificationService : NotificationService){}

  ngOnInit(): void {
    this.notificationService.listenForNotifications().subscribe((data) => {
      this.defineData(data);
    });
      
  }

}
