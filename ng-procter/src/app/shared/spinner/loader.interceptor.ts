import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UIStateService } from './load-widget.service';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  public countRequest = 0;
  constructor(
    public loader: UIStateService
  ) {

  }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.show(1);
    return next.handle(request)
    .pipe(
      finalize(() => {
          this.loader.show(0)
        })
      );
  }
}
