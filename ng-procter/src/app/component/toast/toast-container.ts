import { Component, TemplateRef } from '@angular/core';

import { ToastService } from './toast.service';


@Component({
  selector: 'app-toasts',
  template: `
    <div
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </div>
  `,
  host: {'[class.toast-container]': 'true'}
})
export class ToastsContainer {
  constructor(public toastService: ToastService) {}
  
  isTemplate(toast:{title:string}) { 
    return toast.title;
   }
}
