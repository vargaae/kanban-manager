import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { TaskComponent } from './task/task.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
// import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
// import { MatComponentsModule } from '../mat-components.module';


@NgModule({
  declarations: [
    BoardComponent,
    TaskComponent,
    TaskDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BoardRoutingModule,
    FormsModule,
    // MatComponentsModule
    // MaterialModule
  ],
  exports: [
    BoardComponent,
  ]
})
export class BoardModule { }
