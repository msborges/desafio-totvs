import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { Job } from '../api/job';
import { JobService } from './job.service';

describe('JobService', () => {
  let service: JobService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(HttpClient)],
    });
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(JobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('teste getJobs', () => {
    const jobs: Job[] = [
      {
        id: 1,
        title: '',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
    ];
    spyOn(http, 'get').and.callFake((): any => of(jobs));
    service.getJobs();
    expect(http.get).toHaveBeenCalled();
  });
  it('teste getJobByUd', () => {
    const job: Job = {
      id: 1,
      title: '',
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    spyOn(http, 'get').and.callFake((): any => of(job));
    service.getJobById(1);
    expect(http.get).toHaveBeenCalled();
  });
  it('teste postJob', () => {
    const job: Job = {
      id: 1,
      title: '',
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    spyOn(http, 'post').and.callFake((): any => of(job));
    service.postJob(job);
    expect(http.post).toHaveBeenCalled();
  });
  it('teste putJob', () => {
    const job: Job = {
      id: 1,
      title: '',
      createdDate: new Date(),
      updatedDate: new Date(),
    };
    spyOn(http, 'put').and.callFake((): any => of(undefined));
    service.putJob(1, job);
    expect(http.put).toHaveBeenCalled();
  });
  it('teste deleteJob', () => {
    spyOn(http, 'delete').and.callFake((): any => of(undefined));
    service.deleteJob(1);
    expect(http.delete).toHaveBeenCalled();
  });
});
