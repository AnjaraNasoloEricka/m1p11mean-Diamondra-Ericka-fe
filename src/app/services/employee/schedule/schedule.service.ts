import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { schedulesEndpoint } from 'src/app/config/data/api-endpoint';
import { URL } from 'src/environments/environment';
import { CrudService } from '../../crud/crud.service';
import { Schedule } from 'src/app/model/Employees';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService extends CrudService<Schedule>{

  url = URL.baseUrl;

  constructor(http : HttpClient) {
    super(http, schedulesEndpoint);
  }
}
