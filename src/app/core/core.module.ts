import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { RecipeService } from '../recipes/services/recipe.service';
import { AuthService } from '../shared/services/auth.service';
import { ShoppingListService } from '../shopping-list/services/shopping-list.service';
import { UserService } from './../shared/services/user.service';
import { SharedModule } from './../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [HeaderComponent, HomeComponent],
  imports: [SharedModule, AppRoutingModule],
  exports: [HeaderComponent, AppRoutingModule],
  providers: [RecipeService, ShoppingListService, AuthService, UserService],
})
export class CoreModule {}
