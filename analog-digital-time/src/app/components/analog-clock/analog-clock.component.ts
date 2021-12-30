import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-analog-clock',
  templateUrl: './analog-clock.component.html',
  styleUrls: ['./analog-clock.component.scss']
})
export class AnalogClockComponent implements OnInit {

  @ViewChild('analogTime', {static: false})
  analogTime!: ElementRef<HTMLCanvasElement>;
  context2D!: CanvasRenderingContext2D;
  radius!: number;
  clearintervalSubscription!: number;
  incrementDecrementTime: number = 0;

  constructor(private commonService: CommonService) { }
  
  ngOnInit(): void {
    this.commonService.timeChange$.subscribe(value => {
      this.incrementDecrementTime = value;
    });
  }

  ngAfterViewInit() {
    const context = (<HTMLCanvasElement>this.analogTime.nativeElement).getContext("2d");
    if (!context) {
      throw new Error("getContext('2d') failed");
    }
    this.context2D = context;
    this.radius = (<HTMLCanvasElement>this.analogTime.nativeElement).height / 2;
    this.context2D.translate(this.radius, this.radius);
    this.radius = this.radius * 0.90;
    this.clearintervalSubscription = window.setInterval(()=>{
      this.drawClock();
    }, 1000);
  }

  drawClock() {
    this.drawFace(this.context2D, this.radius);
    this.drawNumbers(this.context2D, this.radius);
    this.drawTime(this.context2D, this.radius);
  }

  drawFace(context2D: CanvasRenderingContext2D, radius: number) {
    var grad;
    context2D.beginPath();
    context2D.arc(0, 0, radius, 0, 2 * Math.PI);
    context2D.fillStyle = 'white';
    context2D.fill();
    grad = context2D.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    context2D.strokeStyle = grad;
    context2D.lineWidth = radius * 0.1;
    context2D.stroke();
    context2D.beginPath();
    context2D.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    context2D.fillStyle = '#333';
    context2D.fill();
  }

  drawNumbers(context2D: CanvasRenderingContext2D, radius: number) {
    var ang;
    var num;
    context2D.font = radius * 0.15 + "px arial";
    context2D.textBaseline = "middle";
    context2D.textAlign = "center";
    for (num = 1; num < 13; num++) {
      ang = num * Math.PI / 6;
      context2D.rotate(ang);
      context2D.translate(0, -radius * 0.85);
      context2D.rotate(-ang);
      context2D.fillText(num.toString(), 0, 0);
      context2D.rotate(ang);
      context2D.translate(0, radius * 0.85);
      context2D.rotate(-ang);
    }
  }

 
  drawTime(context2D: CanvasRenderingContext2D, radius: number) {
    var now = new Date();
    var hour = now.getHours() + this.incrementDecrementTime;
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
      (minute * Math.PI / (6 * 60)) +
      (second * Math.PI / (360 * 60));
    this.drawHand(context2D, hour, radius * 0.5, radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    this.drawHand(context2D, minute, radius * 0.8, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    this.drawHand(context2D, second, radius * 0.9, radius * 0.02);
  }

  drawHand(context2D: CanvasRenderingContext2D, pos: number, length: number, width: number) {
    context2D.beginPath();
    context2D.lineWidth = width;
    context2D.lineCap = "round";
    context2D.moveTo(0, 0);
    context2D.rotate(pos);
    context2D.lineTo(0, -length);
    context2D.stroke();
    context2D.rotate(-pos);
  }

  ngOnDestroy() {
    if (this.clearintervalSubscription) {
      clearInterval(this.clearintervalSubscription);
    }
  }

}
