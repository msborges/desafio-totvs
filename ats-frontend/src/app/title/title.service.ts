import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private emitTitle = new Subject<any>();
  public emitTitleObservable = this.emitTitle.asObservable();

  constructor() {}

  public nextTitle(title: string): void {
    this.emitTitle.next(title);
  }
}
