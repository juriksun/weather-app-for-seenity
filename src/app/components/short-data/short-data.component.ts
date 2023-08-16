import { Component, OnDestroy } from "@angular/core";
import { ForcastDataService } from "src/app/services/forecast-data.service";
import { DailyWeather } from "src/app/models/daily-weather.model";
import { Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';

@Component({
    styleUrls: ['./short-data.component.css'],
    selector: 'app-short-data',
    templateUrl: './short-data.component.html'
})
export class ShortDataComponent implements OnDestroy{

    hummidity: number;
    wind: number;

    origWeatherData: DailyWeather[];
    
    private ngUnsubscribe: Subject<any> = new Subject();

    constructor(private forcastDataService: ForcastDataService) {}

    ngOnInit() {
        this.forcastDataService.$weatherData.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
            this.origWeatherData = data;
            this.hummidity = this.origWeatherData[0]?.hummidity;
            this.wind = this.origWeatherData[0]?.wind;
        });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next(undefined);
        this.ngUnsubscribe.complete();
    }
}