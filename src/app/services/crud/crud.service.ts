import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/environments/environment';


export class CrudService<T> {

  private baseUrl = URL.baseUrl;
  crudEndpoint : string;
  http : HttpClient;

  constructor(http: HttpClient, crudEndpoint : string) {
    this.http = http;
    this.crudEndpoint = crudEndpoint;
  }

  // Get all
  getAll() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.baseUrl}/${this.crudEndpoint}`).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  // Insert
  insert(data : T) {
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
  update(data : T) {
    return new Promise((resolve, reject) => {
      this.http.put(`${this.baseUrl}/${this.crudEndpoint}`, data).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  // delete
  delete(id : number) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.baseUrl}/${this.crudEndpoint}/${id}`).subscribe(
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
