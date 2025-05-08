import { Injectable } from '@angular/core';
import { CrudService } from '../../crud/crud.service';
import { statEndpoint } from 'src/app/config/data/api-endpoint';
import { HttpClient } from '@angular/common/http';
import { URL } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EarningstatService extends CrudService<any>{

  url = URL.baseUrl;


  constructor(http : HttpClient) {
    super(http, statEndpoint.baseApi + "/" + statEndpoint.earnings.baseApi);
  }

  getDayEarning(date : Date){
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/${this.crudEndpoint}/${statEndpoint.earnings.day}/${date}`).subscribe(
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
