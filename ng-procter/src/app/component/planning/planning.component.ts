import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ToastService } from '../toast/toast.service';
import { keymessage } from 'src/app/shared/validation-msg';
import { ProcterValidator } from '../reject/procter-validator';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-planning-basic',
	templateUrl: 'planning.component.html',
	styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {
	planning: any[] = [];
	group: FormGroup;
	messages: any[][];
	constructor(private http: HttpClient, public builder: FormBuilder, public toastService: ToastService) {
		this.group = builder.group({
			plannings: builder.array([]),
		});

		this.buscar();
	}

	ngOnInit(): void {
		this.plannings.valueChanges.subscribe({
			next: (v) => {
				this.messages = new Array<Array<any>>(this.planning.length);
				console.log(this.plannings.controls)
				this.plannings.controls.forEach((k: FormGroup, i: number) => {
					this.messages[i] = [];
					Object.keys(k.controls).forEach((l) => {
						if (!k.controls[l].touched || k.controls[l].pristine || !k.controls[l].errors) return;
						Object.keys(k.controls[l].errors).forEach(e => {
							switch (`${e}`) {
								case 'required':
									this.messages[i].push({ message: `${keymessage[l]} es obligatorio` }); break;
								case 'procter-validation':
									this.messages[i].push({ message: `${keymessage[l]} ${k.controls[l].errors['procter-validation']}` }); break;
								default: break;
							}
						});
					})
				})
			}
		})
	}
	buscar(): void {
		this.planning = [];
		this.group.reset();
		this.plannings.reset();
		this.http.get(environment.procter_api + 'api/planning').pipe(take(1)).subscribe({
			next: (resp: any[]) => {
				console.log(resp);
				resp.forEach(p => this.plannings.push(this.builder.group({ ...this.addPlan(p) })));
				this.planning = resp.map(o => { return { ...o, enabled: true, inView: false, delivery: o.delivery.map(d => { return { ...d, inView: false, invoice: d.invoice.map(i => { return { ...i, inView: undefined }; }) }; }) }; });
				// this.group.patchValue({ plannings: this.planning })
			}
		});
	}

	get nuevoPlan() {
		return {
			loadorderid: this.builder.control(undefined, [Validators.required]),
			licenseplate: this.builder.control(undefined, [Validators.required, ProcterValidator.placa]),
			drivercc: this.builder.control(undefined, [Validators.required, ProcterValidator.cedula]),
			drivername: this.builder.control(undefined, [Validators.required]),
		}
	}
	addPlan(p: any) {
		if (!p) return {};
		return {
			loadorderid: this.builder.control(p.loadorderid, [Validators.required]),
			licenseplate: this.builder.control(p.licenseplate, [Validators.required, ProcterValidator.placa]),
			drivercc: this.builder.control(p.drivercc, [Validators.required, ProcterValidator.cedula]),
			drivername: this.builder.control(p.drivername, [Validators.required]),
		}
	}
	get plannings() {
		return this.group.controls.plannings as FormArray;
	}


	save(plan, i) {
		this.http.put(environment.procter_api + 'api/planning/' + plan.loadid, { ...plan, ...this.group.value.plannings[i], delivery: undefined }).subscribe({
			next: (resp: any) => {
				if (resp.success) {
					this.buscar();
					this.toastService.show('Guardado OK!', { classname: 'bg-success text-light', delay: 2000 });
				}
			}
		});
	}
	changeStatus(p: number) {
		const status = +this.planning[p].reg_status;
		this.planning[p].reg_status = status === 0 || (status > 3) ? 1 : (status + 1);
	}
	rechazar(p: number) {
		this.planning[p].reg_status = 2;
		this.save(this.planning[p], p);
	}
	aprobar(p: number) {
		this.planning[p].reg_status = 1;
		this.save(this.planning[p], p);
	}
	clear(control, group) {
		(this.plannings.controls[group] as FormGroup).controls[control].reset()
	}

}
