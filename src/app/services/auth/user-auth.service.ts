import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { auth } from '../../config/data/api-endpoint';
import { URL } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  url = URL.baseUrl;
  message : string | undefined;
  
  constructor(private http: HttpClient) { }

  public signIn(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + auth.signIn , data).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public signUp(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + auth.signUp , data).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public confirmRegister(token: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + auth.registerConfirmed + "/" + token).subscribe(
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

