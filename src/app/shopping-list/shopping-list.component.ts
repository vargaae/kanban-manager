import { MeasureService } from 'src/app/shared/services/measure.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Recipe } from '../recipes/models/recipes.model';

import { Ingredient } from './../shared/models/ingredient.model';
import { ShoppingListService } from './services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  editMode = false;
  editedItemId: string;
  editedItem: Observable<Array<Ingredient>>;
  ingredient: Ingredient = {} as Ingredient;
  ingredients: Ingredient[] = [];
  slSubscription: Subscription;
  editSubscription: Subscription;
  ingname = 'ingname';
  ingam = 'ingam';
  ingunit = 'ingunit';
  recipeId = 'recipeId';

  ingredients$;
  unit$;
  items: Observable<any>;

  recipeSubscription: Subscription;
  recipes: Recipe[] = [];


  onEditItem(
    ingredientId: string,
    ingredientName: string,
    ingredientAmount: string,
    ingredientUnit: string,
    RecipeId: string
  ) {
    // TODO: Click on recipe Ingredient, then initialize RecipeEditMode
    console.log(ingredientId, RecipeId);
    this.slService.startedEditing.next(ingredientId);
    this.slService.startedEditingRecipe.next(ingredientId);
    this.editMode = true;

    this.ingname = ingredientName;
    this.ingam = ingredientAmount;
    this.ingunit = ingredientUnit;
    this.recipeId = RecipeId;
    this.slForm.setValue({
      name: this.ingname,
      amount: this.ingam,
      measure: this.ingunit,
    });
  }

  constructor(
    private slService: ShoppingListService,
    private measureService: MeasureService
    ) {
  }

  ngOnInit() {
    this.recipeSubscription = this.slService
      .getAllRecipesShoppingListItems()
      .subscribe((recipes) => (this.recipes = recipes));

    this.ingredients$ = this.slService.getAll();
    this.unit$ = this.measureService.getAll();

    this.slSubscription = this.slService.getAllShoppingListItems()
      .subscribe((ingredients) => {
        this.ingredients = ingredients;
    });
    this.editSubscription = this.slService.startedEditing.subscribe(
      (ingredientId: string) => {
        this.editedItemId = ingredientId;
        this.editMode = true;
        // this.editedItem = this.slService.get(ingredientId);
      }
    );
  }

  onSubmitIngredient(ingredient: Ingredient) {
    if (!this.ingredient.name) return;
    if (this.editMode) this.slService.update(this.editedItemId, ingredient);
    else this.slService.create(ingredient);
    this.editMode = false;
    this.slForm.reset();
  }
  onSubmitRecipeIngredient(ingredient: Ingredient) {
    if (!this.ingredient.name) return;
    if (this.editMode) this.slService.update(this.editedItemId, ingredient);
    else this.slService.create(ingredient);
    this.editMode = false;
    this.slForm.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  deleteIngredient(recipeId: string) {
    this.slService.delete(this.editedItemId);
    this.slService.deleteRecipeIngredientFromShoppingList(recipeId, this.editedItemId);
    this.onClear();
  }
  deleteRecipe(recipeId: string) {
    this.slService.deleteRecipeFromShoppingList(recipeId);
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
    this.slSubscription.unsubscribe();
    this.editSubscription.unsubscribe();
  }
}
