import { Injectable } from '@angular/core';
import { Services } from 'src/app/model/Services';
import { URL } from 'src/environments/environment';
import { CrudService } from '../crud/crud.service';
import { HttpClient } from '@angular/common/http';
import { servicesEndpoint } from 'src/app/config/data/api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class ServicesService extends CrudService<Services>{

  url = URL.baseUrl;

  constructor(http : HttpClient) {
    super(http, servicesEndpoint);
  }


}
