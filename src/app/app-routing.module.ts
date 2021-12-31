import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'projects',
    loadChildren: () =>
      import('./projects/projects.module').then(
        (value) => value.ProjectsModule
      ),
  },
  {
    path: 'developers',
    loadChildren: () =>
      import('./developers/developers.module').then(
        (value) => value.DevelopersModule
      ),
  },
  {
    path: 'notepad',
    loadChildren: () =>
      import('./notepad/notepad.module').then(
        (value) => value.NotePadModule
      ),
  },
  {
    path: 'kanban-board',
    loadChildren: () =>
      import('./board/board.module').then((m) => m.BoardModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/auth.module').then((value) => value.AuthModule),
  },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
