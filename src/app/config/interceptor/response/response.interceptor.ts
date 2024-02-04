import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { tap } from "rxjs/operators";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { publicRoutes } from '../../data/constant';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      tap({
        error: (error) => {
          const isPublicRoutes = publicRoutes.some(route => request.url.includes(route));
          if (error instanceof HttpErrorResponse && !isPublicRoutes) {
            if (error.status === 401 || (error.status === 403) ) {
              this.router.navigate(['auth/login']);
              localStorage.clear();
            }
        }
      }
      })
    )
  }
}
