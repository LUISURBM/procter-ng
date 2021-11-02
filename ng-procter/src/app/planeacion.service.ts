import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class PlaneacionService {

  constructor(public http: HttpClient) { }

  obtenerRechazos(filtros: any) {
    return this.http.get(environment.procter_api + 'api/report/rejects/' + filtros.fechainicio + "/" + filtros.fechafin)
      .pipe(take(1));
  }
}
