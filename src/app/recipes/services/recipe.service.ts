import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Recipe } from '../models/recipes.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeActivated = new Subject<string>();

  recipes: any;

  constructor(private db: AngularFireDatabase) {}

  create(recipe) {
    return this.db.list('/recipes').push(recipe);
  }

  getAll() {
    return this.db
      .list<Recipe>('/recipes')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((i) => {
            const data = i.payload.val() as Recipe;
            const id = i.payload.key;
            return { id, ...data };
          })
        )
      );
  }

  get(recipeId) {
    return this.db.object('/recipes/' + recipeId).valueChanges();
  }

  getRecipeById(recipeId) {
    return this.db
      .list<Recipe>('/recipes', (ref) =>
        ref.orderByChild('recipeId').equalTo(recipeId)
      )
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((o) => {
            const data = o.payload.val() as Recipe;
            const key = o.payload.key;
            return { key, ...data };
          })
        )
      );
  }

  update(recipeId, recipe) {
    return this.db.object('/recipes/' + recipeId).update(recipe);
  }

  delete(recipeId) {
    return this.db.object('/recipes/' + recipeId).remove();
  }

  addRecipesToShoppingList(recipeId, recipe: Recipe = {} as Recipe) {
    return this.db.object('/recipesShoppingList/' + recipeId).set(recipe);
  }
}
