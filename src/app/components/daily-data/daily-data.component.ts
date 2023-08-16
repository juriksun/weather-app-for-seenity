import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DailyWeather } from "src/app/models/daily-weather.model";
import { SortType } from "src/app/models/sort-type.model";
import { Router } from "@angular/router";

@Component({
    styleUrls: ['./daily-data.component.css'],
    selector: 'app-daily-data',
    templateUrl: './daily-data.component.html'
})
export class DailyDataComponent{
    origWeatherData: DailyWeather[] = [];

    selectedId;

    sort: SortType = SortType.day;
    sortType = SortType;

    sortedData = [];

    @Input() disabled;

    @Input() set weatherData(weatherData) {
        this.origWeatherData = weatherData;
        this.sortedData = this.origWeatherData && [...this.origWeatherData];
    };

    @Output() selectedDay = new EventEmitter<DailyWeather>();

    constructor(private router: Router) { }

    onSort(sortType: SortType) {
        this.sort = sortType;
        switch(this.sort) {
            case SortType.day: {
                this.sortedData = this.origWeatherData.sort((a, b) => {
                    return a.dateShort - b.dateShort;
                });
                break;
            }
            case SortType.maxTemp: {
                this.sortedData = this.origWeatherData.sort((a, b) => {
                    return a.maxTemp - b.maxTemp;
                });
                break;
            }
            case SortType.minTemp: {
                this.sortedData = this.origWeatherData.sort((a, b) => {
                    return a.minTemp - b.minTemp;
                });
                break;
            }
        }
    }

    onDayWeatherSelect(selectedEl: DailyWeather) {
        if(this.disabled) {
            this.router.navigateByUrl('/more-data');
        } else {
            this.selectedId = selectedEl.id;
            this.selectedDay.emit(selectedEl);
        }
    }
}