import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from "src/environments/environment";
export interface UserState {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentSession: BehaviorSubject<UserState>;
  constructor(private router: Router, private http: HttpClient) {
    this.currentSession = new BehaviorSubject({ username: undefined });
  }

  login(username: string) {

    this.http.post(environment.procter_api+'/usuarios', { userid: username })
      .pipe(
        take(1)
      )
      .subscribe({
        next: (resp: any) => {
          if (resp.value.userid)
            this.currentSession.next({ username: resp.value.userid })
          this.router.navigate(['/']);
        }
      });
  }
  logout(){
    this.currentSession.next({ username: undefined })
    this.router.navigate(['/login']);
  }
}
