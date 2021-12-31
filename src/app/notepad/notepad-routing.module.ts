import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/services/auth.guard';
import { NotePadComponent } from './notepad.component';

const slRoutes: Routes = [
  {
    path: '',
    component: NotePadComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(slRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class NotePadRoutingModule {}
