import { Injectable } from '@angular/core';
import { SpecialOffer } from 'src/app/model/Services';
import { CrudService } from '../crud/crud.service';
import { URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { specialOffersEndpoint } from 'src/app/config/data/api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class SpecialofferService extends CrudService<SpecialOffer>{

  url = URL.baseUrl;

  constructor(http : HttpClient) {
    super(http, specialOffersEndpoint);
  }
}
