import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ColorPickerModule} from 'primeng/colorpicker';
import {FormsModule} from '@angular/forms';
import {SliderModule} from 'primeng/primeng';
import {LightControlModule} from './light-control/light-control.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ColorPickerModule,
    FormsModule,
    SliderModule,
    LightControlModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
