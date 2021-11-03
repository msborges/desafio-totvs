import { TestBed } from '@angular/core/testing';
import { TitleService } from './title.service';

describe('TitleService', () => {
  let service: TitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('teste subscribe alterando titulo', () => {
    const subscribe = service.emitTitleObservable.subscribe((title) => {
      expect(title).toEqual('Home');
      subscribe.unsubscribe();
    });
    service.nextTitle('Home');
  });
});
