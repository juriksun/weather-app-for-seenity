import { Component, Input } from "@angular/core";
import { Observable, map } from "rxjs";
import { GeocodingLoc } from "src/app/models/geocodin-log.model";
import { ForcastDataService } from "src/app/services/forecast-data.service";
import { DailyWeather } from "src/app/models/daily-weather.model";
import { getMaxTemp, getMinTemp } from "src/app/extras/min-max.extras";

@Component({
    styleUrls: ['./weather-data.component.css'],
    selector: 'app-weather-data',
    templateUrl: './weather-data.component.html'
})
export class WeatherDataComponent{
    geocodingLocData: GeocodingLoc;
    weatherData: Observable<DailyWeather[]>;
    loading: boolean = true;

    name: string;
    conuntry: string;
    state: string;

    temp: number;
    weaterIcon: string;
    description: string;
    date: string;

    @Input() set geocodingData(geocodingLocData: GeocodingLoc) {
        this.loading = true;
        this.geocodingLocData = geocodingLocData;
        this.setPlaceData();

        this.forcastDataService.getForcastData(this.geocodingLocData.lat, this.geocodingLocData.lon).pipe(map(this.combineDataMap)).subscribe(data => {
            this.loading = false;
            this.forcastDataService.weathrData = data;
        }, err => {
            console.error(err);
        });;
    };

    constructor(private forcastDataService: ForcastDataService) {}

    private setPlaceData() {
        this.name = this.geocodingLocData.name;
        this.conuntry = this.geocodingLocData.country;
        this.state = this.geocodingLocData.state;
    }

    private combineDataMap = data => {

        const originalArray = data.list;
        const chunkSize = Math.ceil(originalArray.length / 5);

        const splitArrays = [];

        for (let i = 0; i < originalArray.length; i += chunkSize) {
            splitArrays.push(originalArray.slice(i, i + chunkSize));
        }

        let newCombinedArr = [];
        
        splitArrays.forEach((el, index) => {
            newCombinedArr.push(<DailyWeather>{
               id: index,
               date: el[0].dt + "000",
               dataByHours: el,
               minTemp: getMinTemp(el),
               maxTemp: getMaxTemp(el),
               description: el[0].weather[0].description,
               main: el[0].weather[0].main,
               icon: el[0].weather[0].icon,
               hummidity:  el[0].main.humidity,
               temp: el[0].main.temp,
               wind: el[0].wind.speed,
               dateShort: el[0].dt
            });
        });

        this.temp = newCombinedArr[0].temp;
        this.weaterIcon = newCombinedArr[0].icon;
        this.description = newCombinedArr[0].description;
        this.date = newCombinedArr[0].date;

        return newCombinedArr;
    }
}