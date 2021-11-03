import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { MockProvider } from 'ng-mocks';
import { of, throwError } from 'rxjs';
import { Job } from 'src/app/api/job';
import { TitleService } from 'src/app/title/title.service';
import { JobService } from '../job.service';

import { JobCreateComponent } from './job-create.component';

describe('JobCreateComponent', () => {
  let component: JobCreateComponent;
  let fixture: ComponentFixture<JobCreateComponent>;
  let service: JobService;
  let notification: PoNotificationService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobCreateComponent],
      imports: [FormsModule],
      providers: [
        MockProvider(TitleService),
        MockProvider(JobService),
        MockProvider(Router),
        MockProvider(PoNotificationService),
      ],
    }).compileComponents();

    service = TestBed.inject(JobService);
    notification = TestBed.inject(PoNotificationService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCreateComponent);
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
    spyOn(service, 'postJob').and.callFake(() => of(job));
    component['save']();
    expect(service.postJob).toHaveBeenCalled();
  });
  it('teste método save() com erro', () => {
    spyOn(service, 'postJob').and.callFake(() => {
      return throwError(new HttpErrorResponse({}));
    });
    spyOn(notification, 'error').and.stub();
    component['save']();
    expect(service.postJob).toHaveBeenCalled();
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
  it('teste método cancel()', () => {
    spyOn(router, 'navigate').and.stub();
    component['cancel']();
    expect(router.navigate).toHaveBeenCalled();
  });
});
