import { Injectable } from "@angular/core";
import { Services } from "src/app/model/Services";
import { URL } from "src/environments/environment";
import { CrudService } from "../crud/crud.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { servicesEndpoint } from "src/app/config/data/api-endpoint";

@Injectable({
  providedIn: "root",
})
export class ServicesService extends CrudService<Services> {
  url = URL.baseUrl;

  constructor(http: HttpClient) {
    super(http, servicesEndpoint);
  }

  // Get all types
  getAllTypes() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/${this.crudEndpoint}`+'/:types').subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getServicesType() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/${servicesEndpoint}/types`).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  insertService(formData: FormData) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      this.http.post(`${this.url}/${servicesEndpoint}`, formData, { headers }).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  updateService(formData: FormData, id: string) {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      this.http.put(`${this.url}/${servicesEndpoint}/${id}`, formData, { headers }).subscribe(
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
