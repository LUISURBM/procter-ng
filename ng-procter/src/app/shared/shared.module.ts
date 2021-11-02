import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastsContainer } from '../component/toast/toast-container';
import { ToastComponent } from '../component/toast/toast.component';
import { LoaderWidgetComponent } from './spinner/loader.component';

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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderWidgetComponent,
      multi: true
    },
  ]
})
export class SharedModule { }
