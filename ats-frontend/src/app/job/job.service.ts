import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Job } from '../api/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private readonly route = `${environment.baseUrl}job`;

  constructor(
    private http: HttpClient
  ) { }

  public getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.route);
  }

  public getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.route}/${id}`);
  }

  public postJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.route, job);
  }

  public putJob(id: number, job: Job): Observable<any> {
    return this.http.put<any>(`${this.route}/${id}`, job);
  }

  public deleteJob(id: number): Observable<any> {
    return this.http.delete<any>(`${this.route}/${id}`);
  }
}


