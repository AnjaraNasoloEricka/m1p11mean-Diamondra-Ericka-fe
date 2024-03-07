import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/environments/environment';


export class CrudService<T> {

  baseUrl = URL.baseUrl;
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
  insert(data : T | FormData) {
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
  update(data : T | FormData, id : String) {
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

  // delete
  delete(id : string) {
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
