import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { ToastService } from './component/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loading = false;
  
  constructor(private router: Router, private toaster: ToastService) {
    this.router.events.subscribe({
      next: (event: Event) => {
        toaster.clear();
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }
  
          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      }
    });
  }
}
