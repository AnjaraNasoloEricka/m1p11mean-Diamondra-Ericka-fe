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

}
