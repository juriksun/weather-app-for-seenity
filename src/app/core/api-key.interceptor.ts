import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'GET') {
      const modifiedUrl = request.urlWithParams.replace(
        request.urlWithParams,
        `${request.urlWithParams}${environment.apiKey}`
      );
      const modifiedRequest = request.clone({ url: modifiedUrl });
      return next.handle(modifiedRequest);
    }

    return next.handle(request);
  }
}