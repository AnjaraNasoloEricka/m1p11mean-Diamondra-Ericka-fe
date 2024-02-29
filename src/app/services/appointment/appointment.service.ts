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

  getCustomerAppointments(customerId) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/customers/appointments/`+customerId).subscribe(
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

  insertAppointment(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.baseUrl}/appointments`, data).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  } 

  getAppointmentById(id: String) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/appointments/` + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  savePayment(data: any, appointmentId: string) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.baseUrl}/appointments/`+appointmentId+`/payments`, data).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  updateAppointmentStatus(appointmentId : string, status : string) {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.baseUrl}/appointments/`+appointmentId, {"status" : status}).subscribe(
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