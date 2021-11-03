import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { BundleService } from 'src/app/bundle.service';
import { WebDataRocksPivot } from '../reject/pivot/webdatarocks';
import { ProcterValidator } from '../reject/procter-validator';
import { ToastService } from '../toast/toast.service';
import { accessories, accessoriesCfg } from './accessories';
import { environment } from "src/environments/environment";
@Component({
	selector: 'app-accessories-basic',
	templateUrl: 'accessories.component.html',
	styleUrls: ['./accessories.component.scss']
})
export class AccessoriesComponent implements OnInit {
	accessories: any[];

	minDate: Date = new Date();
	maxDate: Date = new Date();
	group: FormGroup;
	report: any;
	@ViewChild('report', { static: false })
	pivot: WebDataRocksPivot;
	constructor(private builder: FormBuilder, private http: HttpClient, public toastService: ToastService, public bundleSrv: BundleService,

		private router: Router) {
		this.group = builder.group({
			fechainicio: new FormControl(formatDate(this.maxDate, 'yyyy-MM-ddTHH:mm', 'es-Co'), [Validators.required, ProcterValidator.maxDateToday]),
			fechafin: new FormControl(formatDate(this.maxDate, 'yyyy-MM-ddTHH:mm', 'es-Co'), [Validators.required, ProcterValidator.maxDateToday]),
		})
		this.minDate.setFullYear(new Date().getFullYear() - 1);


	}

	ngOnInit(): void {
		if (this.group.valid)
			this.group.valueChanges.subscribe({
				next: (v) => this.buscar()
			})

	}
	buscar(): void {
		this.http.get(environment.procter_api + 'api/report/accessories/' + this.group.value.fechainicio + "/" + this.group.value.fechafin)
			.pipe(take(1))
			.subscribe({
				next: (resp: any[]) => {
					console.log(resp)
					this.report = { ...accessoriesCfg, dataSource: { data: [...accessories, ...resp!] } };
					console.log(this.report)
					this.accessories = resp;
					this.pivot.webDataRocks.off('reportcomplete');
					this.pivot.webDataRocks.setReport(this.report)
				}
			})
	}

	clear(control) {
		this.group.reset();
	}

	fechainicio() {
		if (this.group.value.fechainicio && new Date(this.group.value.fechainicio) > new Date())
			this.group.patchValue({ fechainicio: undefined });

	}
	fechafin() {
		if (this.group.value.fechafin && new Date(this.group.value.fechafin) > new Date())
			this.group.patchValue({ fechafin: undefined });

	}

	ver() {
		this.router.navigate(['/component/accessory', {}]);
	}
}
