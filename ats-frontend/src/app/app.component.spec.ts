import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
} from '@po-ui/ng-components';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { TitleService } from './title/title.service';

describe('AppComponent', () => {
  let service: TitleService;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        PoMenuModule,
        PoPageModule,
        PoToolbarModule,
        RouterTestingModule,
      ],
      declarations: [AppComponent],
      providers: [
        MockProvider(TitleService, {
          emitTitleObservable: of('Home')
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('teste subscribe alterando titulo home', () => {
    service = TestBed.inject(TitleService);
    app.ngOnInit();
    service.nextTitle('Home');
    expect(app.titlePage).toEqual('Home');
  });
});
