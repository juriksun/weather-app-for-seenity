import { Component, OnInit, OnDestroy } from "@angular/core";
import { ForcastDataService } from "src/app/services/forecast-data.service";
import { DailyWeather } from "src/app/models/daily-weather.model";
import { takeUntil } from 'rxjs/operators';
import { Subject } from "rxjs";

@Component({
    styleUrls: ['./more-data.component.css'],
    templateUrl: './more-data.component.html'
})
export class MoreDataComponent implements OnInit, OnDestroy {
    origWeatherData: DailyWeather[];

    view: any[] = [500, 300];

    legend: boolean = false;
    showLabels: boolean = true;
    animations: boolean = true;
    xAxis: boolean = true;
    yAxis: boolean = true;
    showYAxisLabel: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = 'Hours';
    timeline: boolean = true;

    temperatureData = [{
        name: "",
        series: []
    }];

    tempraturDataReady: boolean = false;
    colorSchemeForHours = {
        domain: ['#5AA454']
    };

    windData = [{
        name: "",
        series: []
    }];

    windDataReady: boolean = false;
    colorSchemeForWind = {
        domain: ['#E44D25']
    };

    humidityData = [{
        name: "",
        series: []
    }];

    humidityDataReady: boolean = false;
    colorSchemeForHumidity = {
        domain: ['#CFC0BB']
    };

    private ngUnsubscribe: Subject<any> = new Subject();

    constructor(private forcastDataService: ForcastDataService) {}

    ngOnInit() {
        this.forcastDataService.$weatherData.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
            this.origWeatherData = data;
            this.onSelectedDay(this.origWeatherData[0]);
        });
    }

    onSelectedDay(dailyWeatherData) {
        this.setTemperatureData(dailyWeatherData);
        this.setWindData(dailyWeatherData);
        this.setHumidityData(dailyWeatherData);
    }

    private setTemperatureData(dailyWeatherData) {
        this.tempraturDataReady = false;
        let temperatureDataArr = [];

        dailyWeatherData.dataByHours.map(el => {
            temperatureDataArr.push({
                name: "" + (new Date(el.dt * 1000)).getHours(),
                value: "" + Math.round(el.main.temp)
            });
        })
        this.temperatureData[0].series = temperatureDataArr;
        this.temperatureData = [...this.temperatureData];
        this.tempraturDataReady = true;
    }

    private setWindData(dailyWeatherData) {
        this.windDataReady = false;
        let windDataArr = [];

        dailyWeatherData.dataByHours.map(el => {
            windDataArr.push({
                name: "" + (new Date(el.dt * 1000)).getHours(),
                value: "" + Math.round(el.wind.speed)
            });
        })
        this.windData[0].series = windDataArr;
        this.windData = [...this.windData];
        this.windDataReady = true;
    }

    private setHumidityData(dailyWeatherData) {
        this.humidityDataReady = false;
        let humidityDataArr = [];

        dailyWeatherData.dataByHours.map(el => {
            humidityDataArr.push({
                name: "" + (new Date(el.dt * 1000)).getHours(),
                value: "" + Math.round(el.main.humidity)
            });
        })
        this.humidityData[0].series = humidityDataArr;
        this.humidityData = [...this.humidityData];
        this.humidityDataReady = true;
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next(undefined);
        this.ngUnsubscribe.complete();
    }
}