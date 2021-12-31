import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class NotePadService {
  startedEditing = new Subject<string>();
  startedEditingProject = new Subject<string>();

  constructor(private db: AngularFireDatabase) {}

  create(ingredient) {
    return this.db.list('/ingredients').push(ingredient);
  }

  getAll() {
    return this.db.list(
      'projectsNotePad',
      ref => ref.orderByChild('name')
    ).snapshotChanges();
  }

  getAllNotePadItems() {
    return this.db
      .list<Ingredient>('/ingredients')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((i) => {
            const data = i.payload.val() as Ingredient;
            const id = i.payload.key;
            return { id, ...data };
          })
        )
      );
  }

  getAllProjectsNotePadItems() {
    return this.db
      .list<Ingredient>('/projectsNotePad')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((i) => {
            const data = i.payload.val() as Ingredient;
            const id = i.payload.key;
            return { id, ...data };
          })
        )
      );
  }

  getAllDevelopersNotePadListItems() {
    return this.db
      .list<Ingredient>('/devsNotePadList')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((i) => {
            const data = i.payload.val() as Ingredient;
            const id = i.payload.key;
            return { id, ...data };
          })
        )
      );
  }

  get(ingredientId) {
    return this.db
      .object<Ingredient[]>('/ingredients/' + ingredientId)
      .valueChanges();
  }

  update(ingredientId, ingredient) {
    return this.db.object('/ingredients/' + ingredientId).update(ingredient);
  }
  updateProjectIngredient(projectId, ingredientIndex, ingredient) {
    return this.db.object('/projectsNotePad/' + projectId + '/ingredients/' + ingredientIndex).update(ingredient);
  }

  delete(ingredientId) {
    return this.db.object('/ingredients/' + ingredientId).remove();
  }

  deleteProjectFromNotePad(projectId) {
    return this.db.object('/projectsShoppingList/' + projectId).remove();
  }
  removeDeveloperFromNotePad(devId) {
    return this.db.object('/devsNotePadList/' + devId).remove();
  }
  deleteProjectIngredientFromNotePad(projectId, ingredientIndex) {
    return this.db.object('/projectsNotePad/' + projectId + '/ingredients/' + ingredientIndex).remove();
  }
}
