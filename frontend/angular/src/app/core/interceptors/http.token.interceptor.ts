import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service'

import { JwtService } from '../services';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Username': 'application/json'
    };
    const user = this.userService.getCurrentUser();
    const token = this.jwtService.getToken();

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
      headersConfig['Username'] = `${user.username}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
