import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastsContainer } from '../component/toast/toast-container';
import { ToastComponent } from '../component/toast/toast.component';
import { UIStateService } from './spinner/load-widget.service';
import { LoaderWidgetComponent } from './spinner/loader.component';
import { LoaderInterceptor } from './spinner/loader.interceptor';

@NgModule({
  declarations: [
    LoaderWidgetComponent,
    ToastComponent,
    ToastsContainer,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    LoaderWidgetComponent,
    ToastsContainer,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    UIStateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
  ]
})
export class SharedModule { }
