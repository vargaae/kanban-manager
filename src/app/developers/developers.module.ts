import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from './../shared/shared.module';
import { DeveloperDetailComponent } from './components/developer-detail/developer-detail.component';
import { DeveloperEditComponent } from './components/developer-edit/developer-edit.component';
import { DeveloperItemComponent } from './components/developer-item/developer-item.component';
import { DeveloperListComponent } from './components/developer-list/developer-list.component';
import { DeveloperStartComponent } from './components/developer-start/developer-start.component';
import { DevelopersRoutingModule } from './developers-routing.module';
import { DevelopersComponent } from './developers.component';

@NgModule({
  declarations: [
    DevelopersComponent,
    DeveloperListComponent,
    DeveloperItemComponent,
    DeveloperStartComponent,
    DeveloperDetailComponent,
    DeveloperEditComponent
  ],
  imports: [
    CommonModule,
    DevelopersRoutingModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DevelopersModule { }
