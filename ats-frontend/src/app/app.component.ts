import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TitleService } from './title/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  public titlePage: string = 'Home';
  private titleSubscription: Subscription = new Subscription();

  constructor(public titleService: TitleService) {}

  ngOnInit(): void {
    this.titleSubscription = this.titleService.emitTitleObservable.subscribe(
      (title) => (this.titlePage = title)
    );
  }

  ngOnDestroy(): void {
    this.titleSubscription.unsubscribe();
  }
}
