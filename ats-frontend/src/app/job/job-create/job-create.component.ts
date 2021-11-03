import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  PoBreadcrumb,
  PoBreadcrumbItem,
  PoNotificationService,
} from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { Job } from 'src/app/api/job';
import { TitleService } from 'src/app/title/title.service';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.less'],
})
export class JobCreateComponent implements OnInit {
  @ViewChild('formEditJob', { static: true }) formEditJob: NgForm | undefined;

  public title: string;
  public description: string;
  public responsibilities: string;
  public additionalInformations: string;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', action: this.beforeRedirect.bind(this) },
      { label: 'Vagas', action: this.beforeRedirect.bind(this) },
      { label: 'Nova Vaga' },
    ],
  };

  private id: number;

  private jobSubscriptions: Subscription[] = [];

  constructor(
    private titleService: TitleService,
    private service: JobService,
    private router: Router,
    private notification: PoNotificationService
  ) {
    this.id = 0;
    this.title = '';
    this.description = '';
    this.responsibilities = '';
    this.additionalInformations = '';
  }

  ngOnInit(): void {
    this.titleService.nextTitle('Nova Vaga');
  }

  public save(): void {
    const job: Job = {
      id: this.id,
      title: this.title,
      description: this.description,
      responsibilities: this.responsibilities,
      additionalInformations: this.additionalInformations,
      createdDate: new Date(),
      updatedDate: new Date(),
    };

    try {
      this.jobSubscriptions.push(
        this.service.postJob(job).subscribe(
          () => {},
          (error: HttpErrorResponse) => {
            console.error(error);
            this.notification.error('Erro ao incluir o registro!');
          },
          () => {
            this.notification.success('Sucesso ao incluir o registro!');
            this.router.navigate(['/jobs']);
          }
        )
      );
    } catch (error) {
      console.error(error);
      this.notification.error('Erro ao incluir o registro!');
    }
  }

  public cancel(): void {
    this.router.navigate(['/jobs']);
  }

  public isInvalid(): boolean {
    const isValid =
      this.formEditJob?.invalid != null ? this.formEditJob.invalid : true;
    return isValid;
  }

  private beforeRedirect(breadcrumb: PoBreadcrumbItem) {
    if (breadcrumb.label === 'Home') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/jobs']);
    }
  }

}
