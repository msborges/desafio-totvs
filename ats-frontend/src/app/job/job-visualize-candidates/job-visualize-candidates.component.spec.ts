import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobVisualizeCandidatesComponent } from './job-visualize-candidates.component';

describe('JobVisualizeCandidatesComponent', () => {
  let component: JobVisualizeCandidatesComponent;
  let fixture: ComponentFixture<JobVisualizeCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobVisualizeCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobVisualizeCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
