import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AccessoriesComponent } from './accesory/accessories.component';
import { AccessoryComponent as AccessoryComponent } from './accesory/accessory.component';
import { ComponentsRoutes } from './component.routing';
import { PlanningComponent } from './planning/planning.component';
import { WebDataRocksPivot } from './reject/pivot/webdatarocks';
import { RejectComponent } from './reject/reject.component';
import { RejectsComponent } from './reject/rejects.component';
import { DevolucionComponent as ReturnComponent } from './return/return.component';
import { ReturnsComponent } from './return/returns.component';

@NgModule({
  imports: [
    RouterModule.forChild(ComponentsRoutes),
    SharedModule,
  ],
  declarations: [
    PlanningComponent,
    RejectComponent,
    RejectsComponent,
    AccessoryComponent,
    AccessoriesComponent,
    ReturnComponent,
    ReturnsComponent,
    WebDataRocksPivot
  ]
})
export class ComponentsModule { }
