import { Injectable, OnInit, Inject } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, merge } from 'rxjs';
import { map, startWith, distinctUntilChanged, shareReplay, distinct, tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { debug } from 'util';

export interface UIState {
  loading: boolean;
  pageYOffset: number;
  showHeader: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UIStateService implements OnInit {
  state$: BehaviorSubject<UIState>;
  constructor(@Inject(DOCUMENT) private document: any) {
    this.state$ = new BehaviorSubject({ loading: false, pageYOffset: window.pageYOffset, showHeader: true });
    fromEvent(window, 'scroll').pipe(map(x => (this.state$.value.pageYOffset! - window.pageYOffset < -5 ? window.pageYOffset : (this.state$.value.pageYOffset - window.pageYOffset > 15 ? window.pageYOffset : this.state$.value.pageYOffset))), startWith(0), distinctUntilChanged(), shareReplay(1))
      .pipe(
        distinct(),
        tap((v) => {
          this.state$.next({ ...this.state$.value, pageYOffset: v, showHeader: v == 0 ? true : Math.abs(this.state$.value.pageYOffset - v) > 15 });
        }
        )
      ).subscribe();
  }

  ngOnInit(): void {
  }

  get on() {
    this.state$.next({ ...this.state$.value, loading: true });
    return true;
  }
  get off() {
    this.state$.next({ ...this.state$.value, loading: false });
    return true;
  }
  show(n:Number) {
    this.state$.next({ ...this.state$.value, loading: n > 0 });
    return true;
  }
}
