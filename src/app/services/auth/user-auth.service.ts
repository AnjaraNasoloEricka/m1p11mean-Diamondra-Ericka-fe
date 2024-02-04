import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { auth } from '../../config/data/api-endpoint';
import { URL } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  url = URL.baseUrl;

  constructor(private http: HttpClient) { }

  public signIn(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url, data).subscribe(
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

