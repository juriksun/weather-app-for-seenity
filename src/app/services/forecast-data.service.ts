import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { GeocodingLoc } from "../models/geocodin-log.model";
import { DailyWeather } from "../models/daily-weather.model";

@Injectable({
    providedIn: 'root'
})
export class ForcastDataService{
    private path: string;

    weatherDataReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private readonly _$weathrData: BehaviorSubject<DailyWeather[]> = new BehaviorSubject([]);

    set weathrData(dailyWeather: DailyWeather[]) {
        this._$weathrData.next(dailyWeather);
        this.weatherDataReady.next(!!dailyWeather.length);
    }

    get $weatherData() {
        return this._$weathrData;
    }

    constructor(private http:HttpClient) {
        this.path = "https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=";
    }

    getForcastData(lat: number, lon: number): Observable<any> {
        return this.http.get<GeocodingLoc[]>(`${this.path}${lat}&lon=${lon}&appid=`);
    }
}