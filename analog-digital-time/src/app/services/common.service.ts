import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private incrementDecrementTime = new Subject<number>();
  timeChange$ = this.incrementDecrementTime.asObservable();

  constructor() { }

  updateTime(value: number) {
    this.incrementDecrementTime.next(value);
  }

}
