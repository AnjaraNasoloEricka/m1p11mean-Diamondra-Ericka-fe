import { Injectable } from '@angular/core';
import { Employees } from 'src/app/model/Employees';
import { URL } from 'src/environments/environment';
import { CrudService } from '../crud/crud.service';
import { HttpClient } from '@angular/common/http';
import { employeesEndpoint } from 'src/app/config/data/api-endpoint';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends CrudService<Employees>{

  url = URL.baseUrl;

  constructor(http : HttpClient, private datepipe : DatePipe) {
    super(http, employeesEndpoint);
  }

  updateProfile(employeeData : any){
    return new Promise((resolve, reject) => {
      return this.http.put(`${this.url}/${employeesEndpoint}/profile`, employeeData).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    })
  }

  // Insert
  insert(data : any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.baseUrl}/${this.crudEndpoint}`, data).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  // update
  update(data : any, id : String) {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.baseUrl}/${this.crudEndpoint}/${id}`, data).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  // get free Employee
  getFreeEmployees(date : Date, data : any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.baseUrl}/${this.crudEndpoint}/free/`+ this.datepipe.transform(date, 'yyyy-MM-ddTHH:mm:ss'), data).subscribe(
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
