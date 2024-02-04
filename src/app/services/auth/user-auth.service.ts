import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  constructor(private http: HttpClient) { }

  // Method to make a POST request and return a promise
  public callApi(data: any): Promise<any> {
    const url = 'https://api.example.com/endpoint'; // Replace with your API endpoint

    return new Promise((resolve, reject) => {
      this.http.post(url, data).subscribe(
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

