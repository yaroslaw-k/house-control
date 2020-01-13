import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightControlComponent } from './light-control/light-control.component';
import {ColorPickerModule} from 'primeng/colorpicker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CalendarModule, SliderModule} from 'primeng/primeng';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [LightControlComponent],
  exports: [
    LightControlComponent
  ],
  imports: [
    CommonModule,
    ColorPickerModule,
    FormsModule,
    SliderModule,
    ReactiveFormsModule,
    HttpClientModule,
    CalendarModule
  ]
})
export class LightControlModule { }
