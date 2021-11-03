import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { TitleService } from '../title/title.service';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let router: Router;
  let titleService: TitleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      providers: [MockProvider(Router), MockProvider(TitleService)],
    }).compileComponents();

    router = TestBed.inject(Router);
    titleService = TestBed.inject(TitleService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('teste método goHomePage()', () => {
    spyOn(router, 'navigateByUrl').and.stub();
    spyOn(titleService, 'nextTitle').and.stub();
    component['goHomePage']();
    expect(router.navigateByUrl).toHaveBeenCalled();
    expect(titleService.nextTitle).toHaveBeenCalled();
  });
  it('teste método goJobPage()', () => {
    spyOn(router, 'navigateByUrl').and.stub();
    component['goJobPage']();
    expect(router.navigateByUrl).toHaveBeenCalled();
  });
});
