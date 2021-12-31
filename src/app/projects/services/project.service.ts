import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from '../models/projects.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projectActivated = new Subject<string>();

  projects: any;

  constructor(private db: AngularFireDatabase) {}

  create(project) {
    return this.db.list('/projects').push(project);
  }

  getAll() {
    return this.db
      .list<Project>('/projects')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((i) => {
            const data = i.payload.val() as Project;
            const id = i.payload.key;
            return { id, ...data };
          })
        )
      );
  }

  get(projectId) {
    return this.db.object('/projects/' + projectId).valueChanges();
  }

  getProjectById(projectId) {
    return this.db
      .list<Project>('/projects', (ref) =>
        ref.orderByChild('projectId').equalTo(projectId)
      )
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((o) => {
            const data = o.payload.val() as Project;
            const key = o.payload.key;
            return { key, ...data };
          })
        )
      );
  }

  update(projectId, project) {
    return this.db.object('/projects/' + projectId).update(project);
  }

  delete(projectId) {
    return this.db.object('/projects/' + projectId).remove();
  }

  addProjectsToNotePad(projectId, project: Project = {} as Project) {
    return this.db.object('/projectsNotePad/' + projectId).set(project);
  }
}
