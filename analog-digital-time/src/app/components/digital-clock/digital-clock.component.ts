import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.scss']
})
export class DigitalClockComponent implements OnInit {

  digitalTime = new Date();
  subscription!: Subscription;
  incrementDecrementTime: number = 0;
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.timeChange$.subscribe(value => {
      this.incrementDecrementTime = value;
    });
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => {
          var now = new Date();
          now.setHours(now.getHours() + this.incrementDecrementTime);
          return now;
        }),
        share()
      )
      .subscribe(time => {
        this.digitalTime = time;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
