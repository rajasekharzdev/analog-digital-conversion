import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnalogClockComponent } from './components/analog-clock/analog-clock.component';
import { DigitalClockComponent } from './components/digital-clock/digital-clock.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    AnalogClockComponent,
    DigitalClockComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
