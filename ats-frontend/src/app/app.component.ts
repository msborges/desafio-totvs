import { AfterContentInit, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TitleService } from './title/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  public titlePage: string = 'Home';
  private titleSubscription: Subscription = new Subscription();

  constructor(public titleService: TitleService) {
    this.titleSubscription = this.titleService.emitTitleObservable.subscribe(
      (title) => (this.titlePage = title)
    );
  }

  ngOnDestroy(): void {
    this.titleSubscription.unsubscribe();
  }
}
