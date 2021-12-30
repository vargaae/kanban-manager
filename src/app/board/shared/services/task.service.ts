import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Developer } from 'src/app/developers/models/developers.model';

import { Bug } from '../models/bug';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private db: AngularFireDatabase) {}

  create(task: Bug) {
    return this.db.list('/todotasks').push(task);
  }

  getAllDevelopers() {
    return this.db
      .list('developers', (ref) => ref.orderByChild('name'))
      .snapshotChanges();
  }

  getAllProjects() {
    return this.db
      .list<Bug>('/recipes')
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
