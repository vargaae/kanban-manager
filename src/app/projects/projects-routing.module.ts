import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/services/auth.guard';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { ProjectStartComponent } from './components/project-start/project-start.component';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    children: [
      { path: '', component: ProjectStartComponent },
      { path: 'new', component: ProjectEditComponent, canActivate: [AuthGuard] },
      { path: ':id', component: ProjectDetailComponent },
      { path: ':id/edit', component: ProjectEditComponent, canActivate: [AuthGuard] },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class ProjectsRoutingModule {}
