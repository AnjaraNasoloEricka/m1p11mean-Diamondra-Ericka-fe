import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  baseUrl = URL.baseUrl;
  http : HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getCustomerAppointments (data) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/customers/appointments`, data).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getEmployeeAppointments (data) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/customers/appointments`, data).subscribe(
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
