import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { take } from 'rxjs/operators';
import { BundleService } from 'src/app/bundle.service';
import { keymessage } from 'src/app/shared/validation-msg';
import { ToastService } from '../toast/toast.service';
import { ProcterValidator } from './procter-validator';

import { environment } from 'src/environments/environment';
@Component({
	selector: 'app-reject-basic',
	templateUrl: 'reject.component.html'
})
export class RejectComponent implements OnInit {
	planning: any[] = [];
	get planillas() { return this.planning && this.planning.length > 0 ? this.planning : []; }
	messages: any[];
	group: FormGroup;
	rejection: FormGroup;
	minDate: Date = new Date();
	maxDate: Date = new Date();

	constructor(private http: HttpClient, builder: FormBuilder, public toastService: ToastService, public bundleSrv: BundleService) {
		this.minDate.setFullYear(new Date().getFullYear() - 1);
		this.group = builder.group({
			loadorderid: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
			loadid: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
			invoiceid: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
			deliveryid: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
			referencenumber: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
		});
		this.rejection = builder.group({
			// rejecttype: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
			rejectdate: new FormControl(formatDate(this.maxDate, 'yyyy-MM-ddTHH:mm', 'es-Co'), [Validators.required, ProcterValidator.maxDateToday]),
			salesunit: new FormControl(null, [Validators.required]),
			quantity: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(15), Validators.min(1)]),
			reason: new FormControl(null, [Validators.required]),
			rejecttype: new FormControl(null, [Validators.required]),
			commentario: new FormControl(null, [Validators.maxLength(150)]),
			reg_status: new FormControl("1"),
			invoice: new FormControl(null)
		});
		http.get(environment.procter_api + 'api/rejects/1')
			.pipe(
				take(1)
			)
			.subscribe({
				next: (resp: any[]) => {
					this.planning = resp.filter( p => p.loadorderid);
				}
			});
	}

	ngOnInit(): void {


		this.rejection.valueChanges.subscribe({
			next: (v) => {
				console.log(this.rejection)
				if (!this.rejection.invalid && !this.rejection.touched) return;
				this.messages = [];
				Object.keys(this.rejection.controls).forEach(k => {
					if (!this.rejection.controls[`${k}`].errors) return;
					Object.keys(this.rejection.controls[`${k}`].errors).forEach(l => {
						if (this.rejection.controls[`${k}`].touched && this.rejection.controls[`${k}`].errors[`${l}`]) {
							debugger
							switch (`${l}`) {
								case 'required':
									this.messages.push({ message: `${keymessage[k]} es obligatorio` }); break;
								case 'procter-validation':
									this.messages.push({ message: `${k} ${l['procter-validation']}` }); break;
								case 'max-length':
									this.messages.push({ message: `${k} máximo ${this.rejection.controls[k].errors[l].requiredLength} caracteres; ${this.rejection.controls[k].errors[l].actualLength} actualmente!` }); break;
								default: break;
							}
						}
					});
				})
			}
		})
	}
	get controls() {
		return this.rejection.controls;
	}
	get plannings() {
		return this.group.controls.plannings as FormArray;
	}


	save() {
		if (!this.group.valid) return;
		this.http.post(environment.procter_api + 'api/rejects/', { ...this.group.value, ...this.rejection.value, delivery: undefined }).subscribe({
			next: (resp: any) => {
				if (resp.success)
					this.toastService.show('Guardado OK!', { classname: 'bg-success text-light', delay: 15000 });
				if (!resp.success)
					resp.forEach(e => this.toastService.show(e.error, { classname: 'bg-danger text-light', delay: 15000 }));
			},
			error: (error: any) => {
				error.error.forEach(e => this.toastService.show(e.error, { classname: 'bg-danger text-light', delay: 15000 }));

			}
		});
	}
	disabled = false;

	selectedLoadOrderId() {
		const selectedorder = this.planillas.filter(p => p.loadorderid == `${this.group.value.loadorderid}`);
		return selectedorder && selectedorder.length > 0 ? selectedorder[0] : undefined;
	}
	selectedLoadOrderIdbydeliveryid() {
		const selectedorder = this.planillas.filter(p => p.delivery.filter(d => d.deliveryid === this.selecteddeliveryId().deliveryid).length > 0);
		return selectedorder && selectedorder.length > 0 ? selectedorder[0] : undefined;
	}
	selectedLoadOrderIdbyinvoiceid() {
		const selectedorder = this.planillas.filter(p => p.delivery.filter(d => d.invoice.filter(i => i.invoiceid === this.selectedinvoiceId().invoiceid)).length > 0);
		return selectedorder && selectedorder.length > 0 ? selectedorder[0] : undefined;
	}
	selectedDeliveryIdbyinvoiceid() {
		const selectedorder = this.planillas.length == 0 ? this.planillas : this.planillas.reduce((s, p) => s.concat(p.delivery), []).filter(d => d.invoice.filter(i => i.invoiceid === this.selectedinvoiceId().invoiceid).length > 0);
		return selectedorder && selectedorder.length > 0 ? selectedorder[0] : undefined;
	}
	selectedLoadOrderIdbyproductid() {
		const selectedorder = this.planillas.length == 0 ? this.planillas : this.planillas.reduce((s, p) => s.concat(
			p.delivery.reduce((t, d) => t.concat(
				d.invoice.reduce((u, i) => u.concat(
					i.product.filter(pr => pr.productid === this.selectedproductId().productid)
						.map(pr => {
							return {
								loadid: p.loadid,
								loadorderid: p.loadorderid,
								deliveryid: d.deliveryid,
								invoiceid: i.invoiceid,
								referencenumber: pr.productcode
							};
						})), [])), [])), []);
		// this.planillas.filter(pl=>n).reduce((s, p) => s.concat(p.delivery), []).filter(d => d.invoice.reduce((t, q) => t.concat(q.product), []).filter(p => p.productid === this.selectedproductId().productid).length > 0)

		return selectedorder && selectedorder.length > 0 ? selectedorder[0] : undefined;
	}
	selectedDeliveryIdbyproductid() {
		const selectedorder = this.planillas.length == 0 ? this.planillas : this.planillas.reduce((s, p) => s.concat(p.delivery), []).filter(d => d.invoice.reduce((t, q) => t.concat(q.product), []).filter(p => p.productid === this.selectedproductId().productid).length > 0);
		return selectedorder && selectedorder.length > 0 ? selectedorder[0] : undefined;
	}
	selectedLoadId() {
		// TO-DO: 1-1 loadid-loadorderid ?
		const selectedLoad = this.planillas.filter(p => p.loadid == `${this.group.value.loadid}`);
		return selectedLoad && selectedLoad.length > 0 ? selectedLoad[0] : undefined;
	}
	selecteddeliveryId() {
		// TO-DO: 1-1 loadid-loadorderid ?
		const selecteddelivery = this.planillas.length == 0 ? this.planillas : this.planillas.reduce((s, p) => s.concat(p.delivery.filter(d => d.deliveryid == `${this.group.value.deliveryid}`)), []);
		return selecteddelivery && selecteddelivery.length > 0 ? selecteddelivery[0] : undefined;
	}
	selectedinvoiceId() {
		// TO-DO: 1-1 loadid-loadorderid ?
		const selectedinvoice = this.planillas.length == 0 ? this.planillas : this.planillas.reduce((s, p) => s.concat(p.delivery.reduce((t, q) => t.concat(q.invoice.filter(d => d.invoiceid == `${this.group.value.invoiceid}`)), [])), []);
		return selectedinvoice && selectedinvoice.length > 0 ? selectedinvoice[0] : undefined;
	}
	selectedproductId() {
		// TO-DO: 1-1 loadid-loadorderid ?
		const selectedproduct = this.planillas.length == 0 ? this.planillas : this.planillas.reduce((s, p) => s.concat(p.delivery.reduce((t, q) => t.concat(q.invoice.reduce((u, r) => u.concat(r.product.filter(pr => pr.productcode == `${this.group.value.referencenumber}`)), [])), [])), []);
		return selectedproduct && selectedproduct.length > 0 ? selectedproduct[0] : undefined;
	}

	loadorderid() {
		if (!this.selectedLoadOrderId()) {
			this.group.reset();
		} else {
			this.group.patchValue({ loadid: this.selectedLoadOrderId().loadid });
		}
	}
	loadid() {
		if (!this.selectedLoadId()) {
			this.group.patchValue({ loadid: undefined });
		} else {
			this.group.patchValue({ loadorderid: this.selectedLoadId().loadorderid });
		}
	}
	deliveryid() {
		if (!this.selecteddeliveryId()) {
			this.group.patchValue({ deliveryid: undefined });
		} else {
			this.group.patchValue({ loadorderid: this.selectedLoadOrderIdbydeliveryid().loadorderid, loadid: this.selectedLoadOrderIdbydeliveryid().loadid });
		}
	}
	invoiceid() {
		if (!this.selectedinvoiceId()) {
			this.group.patchValue({ invoiceid: undefined, referencenumber: undefined });
		} else if (!this.group.value.loadorderid) {
			this.group.patchValue({ loadorderid: this.selectedLoadOrderIdbyinvoiceid().loadorderid, loadid: this.selectedLoadOrderIdbyinvoiceid().loadid, deliveryid: this.selectedDeliveryIdbyinvoiceid().deliveryid });
		} else {
			this.group.patchValue({ referencenumber: undefined });
		}
	}
	productid() {
		if (!this.selectedproductId()) {
			this.group.patchValue({ referencenumber: undefined });
		} else if (!this.group.value.loadorderid) {
			this.group.patchValue({ loadorderid: this.selectedLoadOrderIdbyproductid().loadorderid, loadid: this.selectedLoadOrderIdbyproductid().loadid, deliveryid: this.selectedLoadOrderIdbyproductid().deliveryid, invoiceid: this.selectedLoadOrderIdbyproductid().invoiceid });
		}
	}

	planningdatabyloadid() {
		return this.selectedLoadOrderId() ? [this.selectedLoadOrderId().loadid] : this.planillas.map(p => p.loadid);
	}
	deliverdatabyloadid() {
		return this.selectedLoadOrderId() ? this.selectedLoadOrderId().delivery : this.planillas.length < 1 ? this.planillas : this.planillas.reduce((s, p) => s.concat(p.delivery), []);
	}
	//TO-DO: validar unique invoice in delivery
	invoicedatabydeliveryid() {
		return this.selecteddeliveryId() ? this.selecteddeliveryId().invoice : this.planillas.length < 1 ? this.planillas : this.planillas.reduce((s, p) => s.concat(p.delivery.reduce((t, q) => t.concat(q.invoice), [])), []);
	}
	refnumberdatabyinvoiceid() {
		return this.selectedinvoiceId() ? this.selectedinvoiceId().product : this.planillas.length < 1 ? this.planillas : this.planillas.reduce((s, p) => s.concat(p.delivery.reduce((t, q) => t.concat(q.invoice.reduce((u, r) => u.concat(r.product), [])), [])), []);
	}

	clear(control) {
		this.rejection.reset();
		this.group.controls[control].reset();
		switch (control) {
			case 'invoiceid':
				this.group.controls['referencenumber'].reset();
				break;
			case 'deliveryid':
				this.group.controls['invoiceid'].reset();
				this.group.controls['referencenumber'].reset();
				break;
			case 'loadid':
				this.group.controls['referencenumber'].reset();
				this.group.controls['invoiceid'].reset();
				this.group.controls['deliveryid'].reset();
			default:
				break;
		}
	}

	rejectdate() {
		if (this.group.value.rejectdate && new Date(this.group.value.rejectdate) > new Date())
			this.group.patchValue({ rejectdate: undefined });

	}
}
