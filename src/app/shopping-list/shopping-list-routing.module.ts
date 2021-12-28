import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/services/auth.guard';
import { ShoppingListComponent } from './shopping-list.component';

const slRoutes: Routes = [
  {
    path: '',
    component: ShoppingListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(slRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class ShoppingListRoutingModule {}
