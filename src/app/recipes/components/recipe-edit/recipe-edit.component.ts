import { Recipes } from './../../models/recipesclass.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { Recipe } from '../../models/recipes.model';
import { RecipeService } from '../../services/recipe.service';
import { MeasureService } from 'src/app/shared/services/measure.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id;
  recipe: Recipe = {} as Recipe;
  // lastUpdate = new FormControl(new Date());

  editMode = false;
  recipeForm: FormGroup;
  routeSubscription: Subscription;
  reactiveRecipe: any;
  measure$;
  recipes: {} = {} as Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private measureService: MeasureService,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.recipeService.get(this.id)
      .pipe(take(1))
      .subscribe(r => this.recipe = r);

    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
    this.measure$ = this.measureService.getAll();
  }

  getControls() {
  return (this.recipeForm.get('ingredients') as FormArray).controls;
}

  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    const newRecipe = new Recipes(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['preparation'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients'],
      this.recipeForm.value['lastUpdate'],
    )
    if (this.editMode) {
      this.recipeService.update(
        this.id,
        newRecipe
        // this.recipeForm.value,
      );
    } else {
      this.recipeService.create(
        newRecipe
        // this.recipeForm.value
        );
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        measure: new FormControl(null, Validators.required),
        amount: new FormControl(null, Validators.required),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  setExistingIngredients(ingredientSets: Ingredient[]): FormArray {
    const formArray = new FormArray([]);
    ingredientSets.forEach(i => {
      formArray.push(this.fb.group({
        name: i.name,
        amount: i.amount,
        measure: i.measure
      }));
    });

    return formArray;
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipePreparation = '';
    let recipeIngredients = new FormArray([]);
    let lastUpdate = new Date().toLocaleString();

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      preparation: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
      lastUpdate: new FormControl(lastUpdate, Validators.required)
      // lastUpdate: new FormControl({value: lastUpdate, disabled: false})
    });

    if (this.editMode) {
      this.reactiveRecipe = this.recipeService
        .get(this.id)
        .pipe(take(1))
        .subscribe((reactiveRecipe: Recipe) => {
          this.recipeForm.patchValue(reactiveRecipe);
          this.recipeForm.setControl('ingredients', this.setExistingIngredients(reactiveRecipe.ingredients));
        });

      recipeName = this.recipe.name;
      recipeImagePath = this.recipe.imagePath;
      recipeDescription = this.recipe.description;
      recipePreparation = this.recipe.preparation;
      lastUpdate = new Date().toLocaleString();
    }
  }

  deleteRecipe() {
    if (!confirm('Are you sure you want to delete this recipe?')) return;

    this.recipeService.delete(this.id);
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
