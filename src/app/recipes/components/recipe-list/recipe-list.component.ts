import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
