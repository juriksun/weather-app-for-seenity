import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './modules/material.modul';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GeocodingService } from './services/geocoding.service';
import { HistoryComponent } from './components/history/history.component';
import { HistoryService } from './services/history.service';
import { ShortDataComponent } from './components/short-data/short-data.component';
import { ForcastDataService } from './services/forecast-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MoreDataComponent } from './components/more-data/more-data.component';
import { DailyDataComponent } from './components/daily-data/daily-data.component';
import { WeatherDataComponent } from './components/weather-data/weather-data.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ApiKeyInterceptor } from './core/api-key.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HistoryComponent,
    ShortDataComponent,
    MoreDataComponent,
    DailyDataComponent,
    WeatherDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    MatCardModule,
    MatProgressBarModule,
    MatSelectModule,
    NgxChartsModule
  ],
  providers: [
    GeocodingService,
    HistoryService,
    ForcastDataService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
