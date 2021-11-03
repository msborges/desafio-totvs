import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { MockComponent, MockProvider } from 'ng-mocks';
import { observable, of, Subject, throwError } from 'rxjs';
import { Job } from '../api/job';
import { TitleService } from '../title/title.service';

import { JobComponent } from './job.component';
import { JobService } from './job.service';

describe('JobComponent', () => {
  let component: JobComponent;
  let fixture: ComponentFixture<JobComponent>;
  let router: Router;
  let service: JobService;
  let notification: PoNotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobComponent],
      providers: [
        MockProvider(JobService),
        MockProvider(Router),
        MockProvider(PoNotificationService),
        MockProvider(TitleService),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    service = TestBed.inject(JobService);
    notification = TestBed.inject(PoNotificationService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('teste método newJob()', () => {
    spyOn(router, 'navigateByUrl').and.stub();
    component.newJob();
    expect(router.navigateByUrl).toHaveBeenCalled();
  });
  it('teste método editJob()', () => {
    const job: Job = {
      id: 1,
      title: '',
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    spyOn(router, 'navigateByUrl').and.stub();
    component['editJob'](job);
    expect(router.navigateByUrl).toHaveBeenCalled();
  });
  it('teste método visualizeCandidates()', () => {
    component.poModal = { open() {} } as PoModalComponent;
    spyOn<any>(component.poModal, 'open').and.stub();
    component['visualizeCandidates']();
    expect(component.poModal.open).toHaveBeenCalled();
  });
  it('teste método closeModal()', () => {
    component.poModal = { close() {} } as PoModalComponent;
    spyOn<any>(component.poModal, 'close').and.stub();
    component['closeModal']();
    expect(component.poModal.close).toHaveBeenCalled();
  });
  it('teste chamado ngOnDestroy', () => {
    const subscription = jasmine.createSpyObj('subscription', ['unsubscribe']);
    component['jobSubscriptions'].push(subscription);
    component.ngOnDestroy();
    expect(subscription.unsubscribe).toHaveBeenCalled();
  });
  it('teste método loadJobs()', () => {
    const jobs: Job[] = [
      {
        id: 1,
        title: '',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
    ];
    spyOn(service, 'getJobs').and.callFake(() => of(jobs));
    component['loadJobs']();
    expect(service.getJobs).toHaveBeenCalled();
  });
  it('teste método loadJobs() com erro', () => {
    spyOn(service, 'getJobs').and.callFake(() => {
      return throwError(new HttpErrorResponse({}));
    });
    spyOn(notification, 'error').and.stub();
    component['loadJobs']();
    expect(service.getJobs).toHaveBeenCalled();
    expect(notification.error).toHaveBeenCalled();
  });
  it('teste método deleteJob()', () => {
    const job: Job = {
      id: 1,
      title: '',
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    spyOn(service, 'deleteJob').and.callFake(() => of(undefined));
    component['deleteJob'](job);
    expect(service.deleteJob).toHaveBeenCalled();
  });
  it('teste método deleteJob() com erro', () => {
    const job: Job = {
      id: 1,
      title: '',
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    spyOn(service, 'deleteJob').and.callFake(() => {
      return throwError(new HttpErrorResponse({}));
    });
    spyOn(notification, 'error').and.stub();
    component['deleteJob'](job);
    expect(service.deleteJob).toHaveBeenCalled();
    expect(notification.error).toHaveBeenCalled();
  });
  it('teste método deleteJob() erro do catch', () => {
    const job: Job = {
      id: 1,
      title: '',
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    spyOn(component['jobSubscriptions'], 'push').and.callFake((): any => {
      return throwError(new Error('fake error'));
    });
    spyOn(notification, 'error').and.stub();
    component['deleteJob'](job);
    expect(notification.error).toHaveBeenCalled();
  });
});
