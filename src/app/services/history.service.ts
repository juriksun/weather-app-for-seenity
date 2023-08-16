import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { GeocodingLoc } from "../models/geocodin-log.model";

@Injectable({
    providedIn: 'root'
})
export class HistoryService {

    private readonly _$historyData: BehaviorSubject<GeocodingLoc[]>;
    private ngUnsubscribe: Subject<any> = new Subject();

    get $historyData() {
        return this._$historyData;
    }

    constructor() {
        this._$historyData = new BehaviorSubject(this.getHistoryStack());
    }

    private maxStackSize = 20;
    private stackKey = 'historyStack';

    pushToHistoryStack(item: GeocodingLoc) {
        let stack = this.getStackFromLocalStorage();
        let elIndex = stack.findIndex(el => {
            return el.country === item.country && el.name === item.name && el.state === item.state;
        });

        if(elIndex !== -1) {
            stack .splice(elIndex, 1);
        } 

        stack = [item, ...stack].slice(0, this.maxStackSize);
        this.saveStackToLocalStorage(stack);
        this._$historyData.next(stack);
    }

    getHistoryStack(): GeocodingLoc[] {
        return this.getStackFromLocalStorage();
    }

    clearHistoryStack() {
        this.saveStackToLocalStorage([]);
        this._$historyData.next([]);
    }

    private getStackFromLocalStorage(): GeocodingLoc[] {
        const stackJson = localStorage.getItem(this.stackKey);
        return stackJson ? JSON.parse(stackJson) : [];
    }

    private saveStackToLocalStorage(stack: GeocodingLoc[]): void {
        localStorage.setItem(this.stackKey, JSON.stringify(stack));
    }
}