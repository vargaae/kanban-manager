import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then((value) => value.RecipesModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (value) => value.ShoppingListModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/auth.module').then((value) => value.AuthModule),
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
