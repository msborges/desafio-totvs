import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { JobComponent } from './job.component';
import { JobEditComponent } from './job-edit/job-edit.component';
import { JobCreateComponent } from './job-create/job-create.component';
import { FormsModule } from '@angular/forms';
import { JobVisualizeCandidatesComponent } from './job-visualize-candidates/job-visualize-candidates.component';

const routes: Routes = [
  { path: '', component: JobComponent },
  { path: 'new', component: JobCreateComponent},
  { path: 'edit/:id', component: JobEditComponent}
];

@NgModule({
  declarations: [
    JobComponent,
    JobEditComponent,
    JobCreateComponent,
    JobVisualizeCandidatesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PoModule,
    FormsModule
  ],
  providers: []
})
export class JobModule { }
