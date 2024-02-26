import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  hourToSecond(hour : string) : number{
    let time = hour.split(":");
    return (parseInt(time[0]) * 3600) + (parseInt(time[1]) * 60);
  }
}
