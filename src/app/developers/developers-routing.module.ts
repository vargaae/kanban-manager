import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/services/auth.guard';
import { DeveloperDetailComponent } from './components/developer-detail/developer-detail.component';
import { DeveloperEditComponent } from './components/developer-edit/developer-edit.component';
import { DeveloperStartComponent } from './components/developer-start/developer-start.component';
import { DevelopersComponent } from './developers.component';

const routes: Routes = [
  {
    path: '',
    component: DevelopersComponent,
    children: [
      { path: '', component: DeveloperStartComponent },
      { path: 'new', component: DeveloperEditComponent, canActivate: [AuthGuard] },
      { path: ':id', component: DeveloperDetailComponent },
      { path: ':id/edit', component: DeveloperEditComponent, canActivate: [AuthGuard] },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class DevelopersRoutingModule {}
