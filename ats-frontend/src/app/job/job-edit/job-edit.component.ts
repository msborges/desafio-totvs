import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
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
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.less'],
})
export class JobEditComponent implements OnInit {
  @ViewChild('formEditJob', { static: true }) formEditJob: NgForm | undefined;

  public title: string;
  public description: string;
  public responsibilities: string;
  public additionalInformations: string;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', action: this.beforeRedirect.bind(this) },
      { label: 'Vagas', action: this.beforeRedirect.bind(this) },
      { label: 'Editar Vaga' },
    ],
  };

  private id: number;
  private createdDate: Date;

  private jobSubscriptions: Subscription[] = [];


  constructor(
    private service: JobService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private titleService: TitleService,
    private notification: PoNotificationService
  ) {
    this.id = 0;
    this.title = '';
    this.description = '';
    this.responsibilities = '';
    this.additionalInformations = '';
    this.createdDate = new Date();
  }

  ngOnInit(): void {
    this.titleService.nextTitle('Editar Vaga');
    this.initialize();
  }

  public initialize() {
    const idUrl = this.activeRoute.snapshot.paramMap.get('id');
    this.loadJobById(Number(idUrl));
  }

  public save(): void {
    const job: Job = {
      id: this.id,
      title: this.title,
      description: this.description,
      responsibilities: this.responsibilities,
      additionalInformations: this.additionalInformations,
      createdDate: this.createdDate,
      updatedDate: new Date()
    };

    try {
      this.jobSubscriptions.push(
        this.service.putJob(this.id, job).subscribe(
          () => {},
          (error: HttpErrorResponse) => {
            console.error(error);
            this.notification.error('Erro ao atualizar o registro!');
          },
          () => {
            this.notification.success('Sucesso ao alterar o registro!');
            this.router.navigate(['/jobs']);
          }
        )
      );
    } catch (error) {
      console.error(error);
      this.notification.error('Erro ao atualizar o registro!');
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

  private loadJobById(id: number): void {
    try {
      this.jobSubscriptions.push(
        this.service.getJobById(id).subscribe(
          (response: Job) => {
            this.id = response.id;
            this.title = response.title;
            this.description = response.description != null ? response.description: '';
            this.responsibilities = response.responsibilities != null ? response.responsibilities : '';
            this.additionalInformations = response.additionalInformations != null ? response.additionalInformations : '';
            this.createdDate = response.createdDate;
          },
          (error: HttpErrorResponse) => {
            console.error(error);
            this.notification.error('Registro não encontrado!');
          }
        )
      );
    } catch (error) {
      console.error(error);
      this.notification.error('Erro ao carregar o registro em tela!');
    }
  }

  private beforeRedirect(breadcrumb: PoBreadcrumbItem) {
    if (breadcrumb.label === 'Home') {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/jobs']);
    }
  }
}
