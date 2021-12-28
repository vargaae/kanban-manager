import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/services/auth.guard';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './components/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class RecipesRoutingModule {}
