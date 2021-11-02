import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
	{
		path: '',
		data: {
			title: 'Dashboard',
			urls: [
				{ title: 'Dashboard', url: '/dashboard' },
				{ title: 'Dashboard' }
			]
		},
		component: DashboardComponent
	}
];

@NgModule({
	imports: [SharedModule, RouterModule.forChild(routes)],
	declarations: [DashboardComponent]
})
export class DashboardModule { }
