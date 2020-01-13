import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {debounce, debounceTime} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

export interface IColor {
  r: number;
  g: number;
  b: number;
}

@Component({
  selector: 'app-light-control',
  templateUrl: './light-control.component.html',
  styleUrls: ['./light-control.component.css']
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
    sunset: {color: {r: 15, g: 5, b: 0}, white: 50},
    off: {color: {r: 0, g: 0, b: 0}, white: 0},
  };

  whiteVal: string = 'Off';
  alarmForm: FormGroup = new FormGroup(
    {
      alarm: new FormControl('2019-12-12T23:10')
    }
  );
  dateValue: any;

  constructor(private http: HttpClient) {
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
    console.log(window.location.origin + '/api/light/' + lightConfig);
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

  setMode(mode: {color: IColor, white: number}) {
    this.form.reset(mode);
  }

  sendAlarm() {
    let d = new Date();

    this.http.post(window.location.origin + '/api/setAlarm/', JSON.stringify({time: this.alarm})).subscribe(
      res => console.log(res)
    );
  }
}
