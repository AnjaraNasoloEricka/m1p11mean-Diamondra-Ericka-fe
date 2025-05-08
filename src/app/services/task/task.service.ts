import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/environments/environment';
import { DatePipe } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl = URL.baseUrl;
  http : HttpClient;

  constructor(http: HttpClient, private datepipe: DatePipe) {
    this.http = http;
  }

  getEmployeeTask(employeeId : string, date : Date) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/tasks/` + employeeId + `/` + this.datepipe.transform(date, 'yyyy-MM-dd')).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
