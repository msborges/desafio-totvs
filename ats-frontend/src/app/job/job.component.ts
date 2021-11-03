import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  PoBreadcrumbItem,
  PoModalComponent,
  PoNotificationService,
  PoTableAction,
  PoTableColumn,
} from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { Job } from '../api/job';
import { TitleService } from '../title/title.service';
import { JobService } from './job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.less'],
})
export class JobComponent implements OnInit, OnDestroy {
  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent | undefined;

  public actions: PoTableAction[] = [
    { label: 'Editar', action: this.editJob.bind(this), type: 'default' },
    { label: 'Candidatos', action: this.visualizeCandidates.bind(this), type: 'default' },
    { label: 'Deletar', action: this.deleteJob.bind(this), type: 'danger' },
  ];
  public colums: PoTableColumn[] = [
    { label: 'ID', property: 'id', type: 'number', width: '5%' },
    { label: 'Título', property: 'title', type: 'string' },
    {
      label: 'Data Criação',
      property: 'createdDate',
      type: 'date',
      width: '10%',
    },
    {
      label: 'Data Alteração',
      property: 'updatedDate',
      type: 'date',
      width: '10%',
    },
  ];
  public items: Job[] = [];
  public loading: boolean = false;

  private jobSubscriptions: Subscription[] = [];

  constructor(
    private service: JobService,
    private router: Router,
    private notification: PoNotificationService,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.titleService.nextTitle('Vagas');
    this.loadJobs();
  }

  ngOnDestroy(): void {
    this.jobSubscriptions?.forEach((jobSubscription) =>
      jobSubscription.unsubscribe()
    );
  }

  public newJob(): void {
    this.router.navigateByUrl('/jobs/new');
  }

  private loadJobs(): void {
    try {
      this.loading = true;
      this.jobSubscriptions.push(
        this.service.getJobs().subscribe(
          (response: Job[]) => (this.items = response),
          (error: HttpErrorResponse) => {
            console.error(error);
            this.notification.error('Erro ao carregar a lista de vagas!');
            this.loading = false;
          },
          () => (this.loading = false)
        )
      );
    } catch (error) {
      console.error(error);
      this.notification.error('Erro ao carregar a lista de vagas!');
      this.loading = false;
    }
  }

  private visualizeCandidates(): void {
    this.poModal?.open();
  }

  private closeModal() {
    this.poModal?.close();
  }

  private editJob(job: Job): void {
    this.router.navigateByUrl(`jobs/edit/${job.id}`);
  }

  private deleteJob(job: Job): void {
    try {
      this.loading = true;
      this.jobSubscriptions.push(
        this.service.deleteJob(job.id).subscribe(
          () => {
            this.notification.success('Registro deletado com sucesso!');
            this.loadJobs();
          },
          (error: HttpErrorResponse) => {
            console.error(error);
            this.notification.error('Erro ao deletar o registro ' + job.id);
            this.loading = false;
          },
          () => (this.loading = false)
        )
      );
    } catch (error) {
      console.error(error);
      this.notification.error('Erro ao deletar o registro ' + job.id);
      this.loading = false;
    }
  }
}
