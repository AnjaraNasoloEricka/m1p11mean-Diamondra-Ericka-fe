import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private socket: Socket) {}

  listenForNotifications(): Observable<any> {
    return new Observable((observer) => {
      const handler = (data: any) => observer.next(data);
      this.socket.on('notification', handler);
      return () => this.socket.on('notification', handler);
    });
  }
  
}