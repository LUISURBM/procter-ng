import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BundleService } from 'src/app/bundle.service';
import { PlaneacionService } from 'src/app/planeacion.service';
import { UIStateService } from 'src/app/shared/spinner/load-widget.service';
import { ToastService } from '../toast/toast.service';
import { ProcterValidator } from './procter-validator';
import { rejects, rejectsCfg } from './rejects';
import { WebDataRocksPivot } from './pivot/webdatarocks';

@Component({
	selector: 'app-rejects-basic',
	templateUrl: 'rejects.component.html',
	styleUrls: ['./rejects.component.scss']
})
export class RejectsComponent implements OnInit, OnDestroy {
	rejects: any[] = [];

	minDate: Date = new Date();
	maxDate: Date = new Date();
	group: FormGroup;
	report: any;
	subscriptions: Subscription[] = [];
	@ViewChild('report', { static: false })
	pivot: WebDataRocksPivot;

	constructor(private builder: FormBuilder, private planeacion: PlaneacionService, public toastService: ToastService, public bundleSrv: BundleService,
		public state: UIStateService,
		private router: Router) {
		this.subscriptions = [];
		this.group = builder.group({
			fechainicio: new FormControl(formatDate(this.maxDate, 'yyyy-MM-ddTHH:mm', 'es-Co'), [Validators.required, ProcterValidator.maxDateToday]),
			fechafin: new FormControl(formatDate(this.maxDate, 'yyyy-MM-ddTHH:mm', 'es-Co'), [Validators.required, ProcterValidator.maxDateToday]),
		})
		this.minDate.setFullYear(new Date().getFullYear() - 1);
	}

	ngOnInit(): void {
		this.buscar();
		this.group.valueChanges
			.pipe(filter(c => this.group.valid)).subscribe({
				next: (v) => this.buscar()
			})
	}
	ngOnDestroy(): void {
		this.subscriptions.forEach(e => e.unsubscribe())
	}

	clear(control) {
		this.pivot.webDataRocks.off('reportcomplete');
		this.pivot.webDataRocks.setReport({ ...this.report, dataSource: { data: [] } });
		if (control)
			this.group.controls[control].reset();
		else
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
		this.router.navigate(['/component/reject', {}]);
	}


	buscar() {
		this.planeacion.obtenerRechazos(this.group.value)
			.subscribe({
				next: (resp: any[]) => {
					this.report = { ...rejectsCfg, dataSource: { data: [...rejects, ...resp!] } };
					this.rejects = resp;
					console.log(this.report)
					if (resp && resp.length > 0) {
						debugger
						this.pivot.webDataRocks.off('reportcomplete');
						this.pivot.webDataRocks.setReport(this.report)
					}

				}
			});
	}
}
