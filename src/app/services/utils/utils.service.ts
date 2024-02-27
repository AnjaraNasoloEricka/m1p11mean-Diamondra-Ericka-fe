import { Injectable } from "@angular/core";
import { UTC_Value } from "src/app/config/data/constant";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  convertTimeToStringHour(time: number): string {
    const hours = Math.floor(time / 3600) + UTC_Value;
    const minutes = Math.floor((time % 3600) / 60);
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  }

}
