import { Component } from '@angular/core';
import { HistoryService } from './services/history.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'seenity-weather-app';

  geoCordData;

  constructor(private historyService: HistoryService, private router: Router) {
    this.router.navigateByUrl('/');
  }

  onSelectedLocation(event) {
    this.geoCordData = event;
    this.historyService.pushToHistoryStack(event);
    this.router.navigateByUrl('/short-data');
  }
}
