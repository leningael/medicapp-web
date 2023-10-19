import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  constructor(private credentialsService: CredentialsService, private router:Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.includes('auth')) {
      const token = this.credentialsService.token;
      const nHeaders: any = {
        'Authorization': `Bearer ${token}`,
      };
      request.headers
        .keys()
        .forEach((key) => (nHeaders[key] = request.headers.get(key)));
      request = request.clone({ setHeaders: nHeaders });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 403) {
          this.credentialsService.clearCredentials();
          this.router.navigate(['/auth/login']);
        }
        return throwError(err);
      })
    );
  }
}
