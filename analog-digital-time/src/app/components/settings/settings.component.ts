import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  displayStyle = "none";
  changedValue: number = 0;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
  }
  
  openPopup(): void {
    this.displayStyle = "block";
  }

  closePopup(): void {
    this.displayStyle = "none";
    this.commonService.updateTime(this.changedValue);
    this.changedValue = 0;
  }

  increment(): void {
    this.changedValue++;
  }

  decrement(): void {
    this.changedValue--;
  }

}
