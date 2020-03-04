import { HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) { }

  intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {

    const token = this.userService.getAuthToken();
    if (token) {
      req.headers.set('authorization', token);

      return next.handle(req.clone({headers: req.headers.append('Authorization', token)}))
      .pipe(catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status == 401) {
          }
          switch (error.status) {
            case 401:
              localStorage.removeItem('login');
              break;
            case 403:
              break;
            default:
              break;
          }
        }

        return throwError(error);
      }));
    } else {

      return next.handle(req);
    }
  }

}
