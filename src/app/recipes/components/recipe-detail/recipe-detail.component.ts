import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { Recipe } from '../../models/recipes.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  id;
  recipe: Recipe = {} as Recipe;
  routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.recipeService
        .get(this.id)
        .pipe(take(1))
        .subscribe((r) => (this.recipe = r));
    });
  }

  onAddRecipesToShoppingList() {
    this.recipeService.addRecipesToShoppingList(this.id, this.recipe);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
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
