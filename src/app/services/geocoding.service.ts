import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { GeocodingLoc } from "../models/geocodin-log.model";

@Injectable({
    providedIn: 'root'
})
export class GeocodingService{
    private path: string;

    constructor(private http:HttpClient) {
        this.path = "https://api.openweathermap.org/geo/1.0/direct?q=";
    }

    getGeocodingByName(query, limit: number = 5): Observable<GeocodingLoc[]> {
        return this.http.get<GeocodingLoc[]>(`${this.path}${query}&limit=${limit}&appid=`);
    }
}