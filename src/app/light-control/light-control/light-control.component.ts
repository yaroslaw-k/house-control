import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {debounce, debounceTime} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {NotificationsService} from 'angular2-notifications';

export interface IColor {
  r: number;
  g: number;
  b: number;
}

@Component({
  selector: 'app-light-control',
  templateUrl: './light-control.component.html',
  styleUrls: ['./light-control.component.scss']
})
export class LightControlComponent implements OnInit {

  form = new FormGroup(
    {
      color: new FormControl({r: 0, g: 0, b: 0}),
      white: new FormControl(0),
    }
  );

  alarm: string = '2019-12-12T23:18';

  modes = {
    general: {color: {r: 0, g: 0, b: 0}, white: 255},
    soft: {color: {r: 0, g: 0, b: 0}, white: 100},
    night: {color: {r: 0, g: 0, b: 0}, white: 2},
    sunset: {color: {r: 25, g: 10, b: 0}, white: 40},
    gaming: {color: {r: 0, g: 0, b: 0}, white: 3},
    off: {color: {r: 0, g: 0, b: 0}, white: 0},
  };

  whiteVal: string = 'Off';
  dateValue: Date = new Date(); // alarmTime

  constructor(private http: HttpClient, private ns: NotificationsService) {
  }

  ngOnInit() {
    this.form.valueChanges.pipe(debounceTime(100)).subscribe(
      ch => {
        this.whiteVal = ch.white ? (ch.white / 2.55).toFixed() : 'Off';
        this.sendLightParams(ch.color, ch.white);
        this.alarm = ch.alarm;
      }
    );
  }

  sendLightParams(color: IColor, white: number) {
    let lightConfig: string;
    lightConfig = this.genStringParam(color.r) + this.genStringParam(color.g) + this.genStringParam(color.b) + this.genStringParam(white);
    this.http.get(window.location.origin + '/api/light/' + lightConfig).subscribe(
      res => console.log(res)
    );
    console.log(lightConfig);
  }

  genStringParam(p: number) {
    let ps = p.toString(10);
    while (ps.length < 3) {
      ps = '0' + ps;
    }
    return ps;
  }

  setMode(mode: { color: IColor, white: number }) {
    this.form.reset(mode);
  }

  sendAlarm() {
    const ad = new Date(this.dateValue);
    if (ad <= new Date()) {
      ad.setDate(ad.getDate() + 1);
    }
    ad.setHours(ad.getHours() + new Date().getTimezoneOffset() / (-60));
    this.http.post(window.location.origin + '/api/setAlarm/', JSON.stringify({time: ad.toISOString().slice(0, 16)})).subscribe(
      res => {
        console.log(res);
        this.ns.success(null, 'The alarm was set on ' + ad.toISOString().slice(0, 16) );
      },
      error => {
        console.log(error);
        this.ns.error('Error', 'Failed to set the alarm on ' + ad.toISOString().slice(0, 16));
      }
    );
  }
}
