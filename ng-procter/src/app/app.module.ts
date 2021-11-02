// import * as $ from 'jquery';
import { CommonModule, LocationStrategy, PathLocationStrategy, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEsCo from '@angular/common/locales/es-CO';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './component/login/auth-guard';
import { LoginComponent } from './component/login/login.component';
import { FullComponent } from './layouts/full/full.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { NavigationComponent } from './shared/header-navigation/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { SharedModule } from './shared/shared.module';









registerLocaleData(localeEsCo);

@NgModule({
	declarations: [
		AppComponent,
		SpinnerComponent,
		FullComponent,
		NavigationComponent,
		SidebarComponent,
		BreadcrumbComponent,
		LoginComponent
	],
	imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		SharedModule,
		RouterModule.forRoot(Approutes, { useHash: true }),
	],
	providers: [
		{
			provide: LocationStrategy,
			useClass: PathLocationStrategy
		},
		AuthGuardService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	
}
