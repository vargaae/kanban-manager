import { Component, OnInit } from '@angular/core';
import { Task } from './task/task';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { AngularFirestore } from '@angular/fire/firestore';
// import { TaskDialogComponent, TaskDialogResult } from './task-dialog/task-dialog.component';
import { TaskService } from './shared/services/task.service';
import { Bug } from './shared/models/bug';
import { switchMap } from 'rxjs/operators';
import { SnapshotAction } from '@angular/fire/database';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  tasks$: any;
  tasks: any[] = [];
  slSubscription: Subscription | undefined;

  // task: Bug | undefined;

  todo: Task[] = [
    {
      title: 'Buy milk',
      description: 'Go to the store and buy milk',
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!',
    },
  ];
  inProgress: Task[] = [];
  done: any[] = [];
  // done: Task[] = [];

  constructor(
    private store: AngularFirestore,
    private dialog: MatDialog,
    private taskService: TaskService
    ) { }

    ngOnInit() {
      this.populateTasks();
      this.slSubscription = this.taskService.getAllBugs()
      .subscribe((tasks) => {
        this.tasks = tasks;
    });
      this.taskService.getAllDoneBugs()
      .subscribe((done) => {
        this.done = done;
    });
    }

    private populateTasks() {
      this.tasks$ = this.taskService.getAll();
    }

  newTask() {
    // const dialogRef = this.dialog.open(TaskDialogComponent, {
    //   width: '270px',
    //   data: {
    //     task: {},
    //   },
    // });
    // dialogRef
    // .afterClosed()
    // .subscribe((result: TaskDialogResult) => this.todo.push(result.task));
  }
  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    // const dialogRef = this.dialog.open(TaskDialogComponent, {
    //   width: '270px',
    //   data: {
    //     task,
    //     enableDelete: true,
    //   },
    // });
    // dialogRef.afterClosed().subscribe((result: TaskDialogResult|undefined) => {
    //   if (!result) {
    //     return;
    //   }
    //   const dataList = this[list];
    //   const taskIndex = dataList.indexOf(task);
    //   if (result.delete) {
    //     dataList.splice(taskIndex, 1);
    //   } else {
    //     dataList[taskIndex] = task;
    //   }
    // });
  }

  drop(event: CdkDragDrop<Task[] | any>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

}
