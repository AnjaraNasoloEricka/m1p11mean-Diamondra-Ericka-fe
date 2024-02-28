import { UTC_Value } from './../../config/data/constant';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  convertTimeToStringHour(time: number): string {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  }

  formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    const hours = (date.getHours() - UTC_Value).toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }


}
