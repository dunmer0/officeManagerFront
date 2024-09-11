import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable(
)
export class AuthInterceptor implements HttpInterceptor {
  constructor() {
    console.log("From interceptor")
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("From interceptor")
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Clone the request and add the token to the headers if it exists
    if (token) {

       request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    // If there's no token, just pass the original request
    return next.handle(request);
  }
}
