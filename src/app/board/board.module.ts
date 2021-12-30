import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { TaskComponent } from './task/task.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BoardComponent,
    TaskComponent,
    TaskDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BoardRoutingModule,
    FormsModule,
  ],
  exports: [
    BoardComponent,
  ]
})
export class BoardModule { }
