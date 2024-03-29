import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(public auth: AuthService, public storage: StorageService, public router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = error.error.message
        } else {
          // server-side error
          if(error.status==401 || error.status==403) {
            this.storage.clean()
            window.location.reload()
          }
          else if(error.status==404 || error.status==400) {
            //this.router.navigate(['/404'])
          }
          errorMessage = error.message
        }
        return throwError(()=> new Error(errorMessage));
      })
    )
  }
}