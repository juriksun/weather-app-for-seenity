import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, startWith, map, debounceTime, distinctUntilChanged, switchMap, of } from "rxjs";
import { GeocodingService } from "src/app/services/geocoding.service";
import { GeocodingLoc } from "src/app/models/geocodin-log.model";

@Component({
    styleUrls: ['./header.component.css'],
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{
    
    @Output() historyButtonToggle = new EventEmitter<string>();
    @Output() selectedLocation = new EventEmitter<GeocodingLoc>();

    searching: boolean = false;

    searchControl = new FormControl('');
    searchOptions: Observable<GeocodingLoc[]>;

    constructor(private geocodingService: GeocodingService) {}

    ngOnInit() {
        this.searchOptions =this.searchControl.valueChanges.pipe(
            startWith(''),
            debounceTime(1000),
            distinctUntilChanged(),
            switchMap((query) => {
                this.searching = true;
                if(query) {
                    return this.geocodingService.getGeocodingByName(query).pipe(map(results => {
                        this.searching = false;
                        return results;
                    }));
                } else {
                    this.searching = false;
                    return of([]);
                }
            })
        );
    }
  
    onOptionSelected(event) {
        this.selectedLocation.emit(event.option.value);
    }

    onHistoryButton() {
        this.historyButtonToggle.emit();
    }

    getOptionTextName(option: GeocodingLoc) {
        return  option ? `${ option.name } - ${ option.state } - ${ option.country }` : '';
    }
}