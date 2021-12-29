import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

import { Bug } from '../models/bug';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private db: AngularFireDatabase) {}

  create(task: Bug) {
    return this.db.list('/tasks').push(task);
  }

  getAllBugs() {
    return this.db
      .list<Bug>('/tasks')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((i) => {
            const data = i.payload.val() as Bug;
            const id = i.payload.key;
            return { id, ...data };
          })
        )
      );
  }

  getAllDoneBugs() {
    return this.db
      .list<Bug>('/donetasks')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((i) => {
            const data = i.payload.val() as Bug;
            const id = i.payload.key;
            return { id, ...data };
          })
        )
      );
  }

  getAll() {
    return this.db.list(
      'tasks',
      ref => ref.orderByChild('title')
    ).snapshotChanges();
  }

  get(taskId: string) {
    return this.db.object('/tasks/' + taskId).valueChanges();
  }

  update(taskId: string, task: Partial<any>) {
    return this.db.object('/tasks/' + taskId).update(task);
  }

  delete(taskId: string) {
    return this.db.object('/tasks/' + taskId).remove();
  }
}
