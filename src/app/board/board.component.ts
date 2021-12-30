// import { Component, OnInit } from '@angular/core';
// import { Task } from './task/task';
// import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
// import { MatDialog } from '@angular/material/dialog';

// import { AngularFirestore } from '@angular/fire/firestore';
// import { TaskDialogComponent, TaskDialogResult } from './task-dialog/task-dialog.component';
// import { TaskService } from './shared/services/task.service';
// import { Bug } from './shared/models/bug';
// import { switchMap } from 'rxjs/operators';
// import { SnapshotAction } from '@angular/fire/database';
// import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Task } from './task/task';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogResult, TaskDialogComponent } from './task-dialog/task-dialog.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';
import { TaskService } from './shared/services/task.service';

const getObservable = (collection: AngularFirestoreCollection<Task>) => {
  const subject = new BehaviorSubject<Task[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Task[]) => {
    subject.next(val);
  });
  return subject;
};


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  todo = getObservable(this.store.collection('todo'));
  inProgress = getObservable(this.store.collection('inProgress'));
  done = getObservable(this.store.collection('done'));
  developers$: any;
  projects: any[] = [];
  slSubscription: Subscription | undefined;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private store: AngularFirestore
    ) {}

  ngOnInit() {
        this.populateTasks();
      }

      private populateTasks() {
        this.developers$ = this.taskService.getAllDevelopers();
        this.slSubscription = this.taskService.getAllProjects()
        .subscribe((projects) => {
          this.projects = projects;
      });
      }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult) => {
        if (!result) {
          return;
        }
        this.store.collection('todo').add(result.task);
      });
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      if (!result) {
        return;
      }
      if (result.delete) {
        this.store.collection(list).doc(task.id).delete();
      } else {
        this.store.collection(list).doc(task.id).update(task);
      }
    });
  }

  drop(event: CdkDragDrop<Task[]|null>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.previousContainer.data || !event.container.data) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.id).delete(),
        this.store.collection(event.container.id).add(item),
      ]);
      return promise;
    });
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  // TODO: OLD VERSION
  // developers$: any;
  // tasks: any[] = [];
  // slSubscription: Subscription | undefined;

  // // task: Bug | undefined;

  // todo: any[] = [];
  // // todo: Task[] = [
  // //   {
  // //     title: 'Set Up Projects',
  // //     description: 'First TODO',
  // //   },
  // //   {
  // //     title: 'Deploy Projects',
  // //     description: 'Second TODO',
  // //   },
  // // ];
  // inProgress: any[] = [];
  // // inProgress: Task[] = [];
  // done: any[] = [];
  // // done: Task[] = [];

  // constructor(
  //   private store: AngularFirestore,
  //   private dialog: MatDialog,
  //   private taskService: TaskService
  //   ) { }

  //   ngOnInit() {
  //     this.populateTasks();
  //     this.slSubscription = this.taskService.getAllBugs()
  //     .subscribe((tasks) => {
  //       this.tasks = tasks;
  //   });
  //     this.taskService.getAllToDoBugs()
  //     .subscribe((todo) => {
  //       this.todo = todo;
  //   });
  //     this.taskService.getAllInProgressBugs()
  //     .subscribe((inProgress) => {
  //       this.inProgress = inProgress;
  //   });
  //     this.taskService.getAllDoneBugs()
  //     .subscribe((done) => {
  //       this.done = done;
  //   });
  //   }

  //   private populateTasks() {
  //     this.tasks$ = this.taskService.getAll();
  //   }

  // newTask() {
  //   const dialogRef = this.dialog.open(TaskDialogComponent, {
  //     width: '270px',
  //     data: {
  //       task: {},
  //     },
  //   });
  //   dialogRef
  //   .afterClosed()
  //   .subscribe((result: TaskDialogResult) => this.taskService.create(result.task));
  //   // .subscribe((result: TaskDialogResult) => this.todo.push(result.task));
  // }
  // editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
  //   const dialogRef = this.dialog.open(TaskDialogComponent, {
  //     width: '270px',
  //     data: {
  //       task,
  //       enableDelete: true,
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: TaskDialogResult|undefined) => {
  //     if (!result) {
  //       return;
  //     }
  //     const dataList = this[list];
  //     const taskIndex = dataList.indexOf(task);
  //     if (result.delete) {
  //       // this.taskService.delete(taskIndex)
  //       dataList.splice(taskIndex, 1);
  //     } else {
  //       dataList[taskIndex] = task;
  //     }
  //   });
  // }

  // drop(event: CdkDragDrop<Task[] | any>): void {
  //   if (event.previousContainer === event.container) {
  //     return;
  //   }
  //   if (!event.container.data || !event.previousContainer.data) {
  //     return;
  //   }
  //   transferArrayItem(
  //     event.previousContainer.data,
  //     event.container.data,
  //     event.previousIndex,
  //     event.currentIndex
  //   );
  // }

}
