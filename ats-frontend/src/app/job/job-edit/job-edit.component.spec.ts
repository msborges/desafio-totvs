import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { MockProvider } from 'ng-mocks';
import { of, throwError } from 'rxjs';
import { Job } from 'src/app/api/job';
import { TitleService } from 'src/app/title/title.service';
import { JobService } from '../job.service';
import { JobEditComponent } from './job-edit.component';

describe('JobEditComponent', () => {
  let component: JobEditComponent;
  let fixture: ComponentFixture<JobEditComponent>;
  let service: JobService;
  let notification: PoNotificationService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobEditComponent],
      imports: [FormsModule],
      providers: [
        MockProvider(JobService),
        MockProvider(Router),
        MockProvider(ActivatedRoute),
        MockProvider(TitleService),
        MockProvider(PoNotificationService),
      ],
    }).compileComponents();

    service = TestBed.inject(JobService);
    notification = TestBed.inject(PoNotificationService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('teste método save()', () => {
    const job: Job = {
      id: 1,
      title: '',
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    spyOn(service, 'putJob').and.callFake(() => of(job));
    component['save']();
    expect(service.putJob).toHaveBeenCalled();
  });
  it('teste método save() com erro', () => {
    spyOn(service, 'putJob').and.callFake(() => {
      return throwError(new HttpErrorResponse({}));
    });
    spyOn(notification, 'error').and.stub();
    component['save']();
    expect(service.putJob).toHaveBeenCalled();
    expect(notification.error).toHaveBeenCalled();
  });
  it('teste método save() erro do catch', () => {
    spyOn(component['jobSubscriptions'], 'push').and.callFake((): any => {
      return throwError(new Error('fake error'));
    });
    spyOn(notification, 'error').and.stub();
    component['save']();
    expect(notification.error).toHaveBeenCalled();
  });
  it('teste método loadJobById()', () => {
    const job: Job = {
      id: 1,
      title: '',
      description: '',
      additionalInformations: '',
      responsibilities: '',
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    spyOn(service, 'getJobById').and.callFake(() => of(job));
    component['loadJobById'](job.id);
    expect(service.getJobById).toHaveBeenCalled();
  });
  it('teste método loadJobById() com erro', () => {
    const job: Job = {
      id: 1,
      title: '',
      description: '',
      additionalInformations: '',
      responsibilities: '',
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    spyOn(service, 'getJobById').and.callFake(() => {
      return throwError(new HttpErrorResponse({}));
    });
    spyOn(notification, 'error').and.stub();
    component['loadJobById'](job.id);
    expect(service.getJobById).toHaveBeenCalled();
    expect(notification.error).toHaveBeenCalled();
  });
  it('teste método loadJobById() erro do catch', () => {
    const job: Job = {
      id: 1,
      title: '',
      description: '',
      additionalInformations: '',
      responsibilities: '',
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    spyOn(component['jobSubscriptions'], 'push').and.callFake((): any => {
      return throwError(new Error('fake error'));
    });
    spyOn(notification, 'error').and.stub();
    component['loadJobById'](job.id);
    expect(notification.error).toHaveBeenCalled();
  });
  it('teste método cancel()', () => {
    spyOn(router, 'navigate').and.stub();
    component['cancel']();
    expect(router.navigate).toHaveBeenCalled();
  });
});
