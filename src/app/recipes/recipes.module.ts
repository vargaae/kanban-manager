import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from './../shared/shared.module';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './components/recipe-item/recipe-item.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeStartComponent } from './components/recipe-start/recipe-start.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeDetailComponent,
    RecipeEditComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecipesModule { }
