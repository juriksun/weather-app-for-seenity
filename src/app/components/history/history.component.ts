import { Component, EventEmitter, Output } from "@angular/core";
import { GeocodingLoc } from "src/app/models/geocodin-log.model";
import { BehaviorSubject } from "rxjs";
import { HistoryService } from "src/app/services/history.service";


@Component({
    styleUrls: ['./history.component.css'],
    selector: 'app-history',
    templateUrl: './history.component.html'
})
export class HistoryComponent{
    @Output() selectedLocation = new EventEmitter<GeocodingLoc>();
    $historyData: BehaviorSubject<GeocodingLoc[]>;

    constructor(private historyService: HistoryService) {
        this.$historyData = this.historyService.$historyData;
    }

    onDeleteHistory() {
        this.historyService.clearHistoryStack();
    }

    onOptionSelected(event) {
        this.selectedLocation.emit(event);
    }
}