import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';
import { TitleService } from '../title/title.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.goHomePage.bind(this) },
    { label: 'Vagas', action: this.goJobPage.bind(this) }
  ];

  constructor(private router: Router, private titleService: TitleService) { }

  ngOnInit(): void {
  }

  private goHomePage(): void {
    this.router.navigateByUrl('/');
    this.titleService.nextTitle('Home');
  }

  private goJobPage(): void {
    this.router.navigateByUrl('/jobs');
  }

}
