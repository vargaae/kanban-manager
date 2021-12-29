import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Developer } from '../models/developers.model';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {
  developerActivated = new Subject<string>();

  developers: any;

  constructor(private db: AngularFireDatabase) {}

  create(developer) {
    return this.db.list('/developers').push(developer);
  }

  getAll() {
    return this.db
      .list<Developer>('/developers')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((i) => {
            const data = i.payload.val() as Developer;
            const id = i.payload.key;
            return { id, ...data };
          })
        )
      );
  }

  get(developerId) {
    return this.db.object('/developers/' + developerId).valueChanges();
  }

  getDeveloperById(developerId) {
    return this.db
      .list<Developer>('/developers', (ref) =>
        ref.orderByChild('developerId').equalTo(developerId)
      )
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((o) => {
            const data = o.payload.val() as Developer;
            const key = o.payload.key;
            return { key, ...data };
          })
        )
      );
  }

  update(developerId, developer) {
    return this.db.object('/developers/' + developerId).update(developer);
  }

  delete(developerId) {
    return this.db.object('/developers/' + developerId).remove();
  }

  addDevelopersToShoppingList(developerId, developer: Developer = {} as Developer) {
    return this.db.object('/developersShoppingList/' + developerId).set(developer);
  }
}
