import {
  Component,
  Input,
  OnDestroy,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { UIStateService } from './load-widget.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoaderWidgetComponent implements HttpInterceptor {
  get isSpinnerVisible() {
    return this.countRequest > 0;
  };

  public countRequest = 0;
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    public loader: UIStateService
  ) {

  }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.show(this.countRequest);
    return next.handle(request)
      .pipe(
        finalize(() => {
          this.countRequest--;
          this.loader.show(this.countRequest)
        })
      );
  }
}
