import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  startedEditing = new Subject<string>();
  startedEditingRecipe = new Subject<string>();

  constructor(private db: AngularFireDatabase) {}

  create(ingredient) {
    return this.db.list('/ingredients').push(ingredient);
  }

  getAll() {
    return this.db.list(
      'recipesShoppingList',
      ref => ref.orderByChild('name')
    ).snapshotChanges();
  }

  getAllShoppingListItems() {
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

  getAllRecipesShoppingListItems() {
    return this.db
      .list<Ingredient>('/recipesShoppingList')
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
  updateRecipeIngredient(recipeId, ingredientIndex, ingredient) {
    return this.db.object('/recipesShoppingList/' + recipeId + '/ingredients/' + ingredientIndex).update(ingredient);
  }

  delete(ingredientId) {
    return this.db.object('/ingredients/' + ingredientId).remove();
  }

  deleteRecipeFromShoppingList(recipeId) {
    return this.db.object('/recipesShoppingList/' + recipeId).remove();
  }
  deleteRecipeIngredientFromShoppingList(recipeId, ingredientIndex) {
    return this.db.object('/recipesShoppingList/' + recipeId + '/ingredients/' + ingredientIndex).remove();
  }
}
