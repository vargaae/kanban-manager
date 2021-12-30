import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { RecipeService } from '../recipes/services/recipe.service';
import { AuthService } from '../shared/services/auth.service';
import { ShoppingListService } from '../shopping-list/services/shopping-list.service';
import { UserService } from './../shared/services/user.service';
import { SharedModule } from './../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [HeaderComponent, HomeComponent, SidenavComponent],
  imports: [SharedModule, AppRoutingModule, FormsModule],
  exports: [HeaderComponent, SidenavComponent, AppRoutingModule],
  providers: [RecipeService, ShoppingListService, AuthService, UserService],
})
export class CoreModule {}
