import { Injectable } from '@angular/core';
import { Employees } from 'src/app/model/Employees';
import { URL } from 'src/environments/environment';
import { CrudService } from '../crud/crud.service';
import { HttpClient } from '@angular/common/http';
import { employeesEndpoint } from 'src/app/config/data/api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends CrudService<Employees>{

  url = URL.baseUrl;

  constructor(http : HttpClient) {
    super(http, employeesEndpoint);
  }


}