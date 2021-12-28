import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../../models/recipes.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit, OnDestroy {
  id;
  recipe: Recipe;
  subscription: Subscription;
  recipes: Recipe[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  async ngOnInit() {
    this.subscription = this.recipeService
      .getAll()
      .subscribe((recipes) => (this.recipes = recipes));
  }

  onSelected(recipeId: string) {
    this.router.navigate([recipeId], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
