import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ToastService } from '../toast/toast.service';
import { keymessage } from 'src/app/shared/validation-msg';
import { ProcterValidator } from '../reject/procter-validator';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import { BundleService } from 'src/app/bundle.service';

@Component({
	selector: 'app-returns-basic',
	templateUrl: 'returns.component.html',
	styleUrls: ['./returns.component.scss']
})
export class ReturnsComponent implements OnInit {
	return: any[] = [];
	group: FormGroup;
	messages: any[][];
	minDate: Date = new Date();
	maxDate: Date = new Date();
	constructor(private http: HttpClient, public builder: FormBuilder, public toastService: ToastService, public bundleSrv: BundleService) {
		this.group = builder.group({
			returns: builder.array([]),
		});

		this.http.get(environment.procter_api + 'api/return').pipe(take(1)).subscribe({
			next: (resp: any[]) => {
				console.log(resp);
				resp.forEach(p => this.returns.push(this.builder.group({ ...this.addDevolucion(p) })));
				this.return = resp.map(o => { return { ...o, enabled: true, inView: false, customer: o.customer.map(c => { return { ...c, inView: false, product: c.product.map(d => { return { ...d, inView: false }; }) }; })[0] }; });
				// this.group.patchValue({ returns: this.return })
			}
		});
	}

	ngOnInit(): void {
		this.returns.valueChanges.subscribe({
			next: (v) => {
				this.messages = new Array<Array<any>>(this.return.length);
				console.log(this.returns.controls)
				this.returns.controls.forEach((k: FormGroup, i: number) => {
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

	fecharechazo() {
		if (this.group.value.fechainicio && new Date(this.group.value.fechainicio) > new Date())
			this.group.patchValue({ fechainicio: undefined });

	}

	get nuevaDevolucion() {
		return {
			pickupreason: this.builder.control(undefined, [Validators.required]),
			reg_status: this.builder.control(undefined, [Validators.required]),
			pickupdate: new FormControl(formatDate(this.maxDate, 'yyyy-MM-ddTHH:mm', 'es-Co'), [Validators.required, ProcterValidator.maxDateToday]),
		}
	}
	addDevolucion(p: any) {
		if (!p) return {};
		return {
			pickupreason: this.builder.control(p.pickupreason, [Validators.required]),
			returnid: this.builder.control(p.returnid, [Validators.required]),
			reg_status: this.builder.control(p.reg_status, [Validators.required]),
			customer: this.builder.group({
				customerid: this.builder.control(p.customer[0].customerid, [Validators.required]),
				nombre: this.builder.control(p.customer[0].nombre, [Validators.required]),
				phonenumber: this.builder.control(p.customer[0].phonenumber, [Validators.required]),
				address: this.builder.control(p.customer[0].address, [Validators.required]),
				contactname: this.builder.control(p.customer[0].contactname, [Validators.required]),
			}),
			pickupdate: new FormControl(formatDate(p.pickupdate, 'yyyy-MM-ddTHH:mm', 'es-Co'), [Validators.required, ProcterValidator.maxDateToday]),
		}
	}
	get returns() {
		return this.group.controls.returns as FormArray;
	}


	save(devolucion, i) {
		this.http.put(environment.procter_api + 'api/return/' + devolucion.returnid, { ...devolucion, ...this.group.value.returns[i], product: undefined }).subscribe({
			next: (resp: any) => {
				if (resp.success)
					this.toastService.show('Guardado OK!', { classname: 'bg-success text-light', delay: 15000 });
			}
		});
	}
	changeStatus(p: number) {
		const status = +this.return[p].reg_status;
		this.return[p].reg_status = status === 0 || (status > 3) ? 1 : (status + 1);
	}
	rechazar(p: number) {
		this.return[p].reg_status = 2;
		this.save(this.return[p], p);
	}
	aprobar(p: number) {
		this.return[p].reg_status = 1;
		this.save(this.return[p], p);
	}
	clear(control, group) {
		(this.returns.controls[group] as FormGroup).controls[control].reset()
	}

}
