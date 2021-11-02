import { Routes } from '@angular/router';
import { AccessoriesComponent } from './accesory/accessories.component';
import { AccessoryComponent } from './accesory/accessory.component';
import { PlanningComponent } from './planning/planning.component';
import { RejectComponent } from './reject/reject.component';
import { RejectsComponent } from './reject/rejects.component';
import { DevolucionComponent } from './return/return.component';
import { ReturnsComponent } from './return/returns.component';




export const ComponentsRoutes: Routes = [

	{
		path: 'planning',
		component: PlanningComponent,
		data: {
			title: 'Planeación'
		}
	},

	{
		path: 'rejects',
		component: RejectsComponent,
		data: {
			title: 'Rechazos'
		}
	},
	{
		path: 'reject',
		component: RejectComponent,
		data: {
			title: 'Rechazo'
		},
	}, {
		path: 'return',
		component: DevolucionComponent,
		data: {
			title: 'Devolución'
		}
	}, {
		path: 'returns',
		component: ReturnsComponent,
		data: {
			title: 'Devoluciones'
		}
	}, {
		path: 'accessories',
		component: AccessoriesComponent,
		data: {
			title: 'Accesorio'
		}
	}, {
		path: 'accessory',
		component: AccessoryComponent,
		data: {
			title: 'Accesorio'
		}
	},
];
