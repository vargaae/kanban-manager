import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { ProjectService } from '../projects/services/project.service';
import { AuthService } from '../shared/services/auth.service';
import { NotePadService } from '../notepad/services/notepad.service';
import { UserService } from './../shared/services/user.service';
import { SharedModule } from './../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [HeaderComponent, HomeComponent, SidenavComponent],
  imports: [SharedModule, AppRoutingModule, FormsModule],
  exports: [HeaderComponent, SidenavComponent, AppRoutingModule],
  providers: [ProjectService, NotePadService, AuthService, UserService],
})
export class CoreModule {}
