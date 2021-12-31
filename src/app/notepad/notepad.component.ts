import { MeasureService } from 'src/app/shared/services/measure.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Project } from '../projects/models/projects.model';

import { Ingredient } from './../shared/models/ingredient.model';
import { NotePadService } from './services/notepad.service';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss'],
})
export class NotePadComponent implements OnInit, OnDestroy {
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
  projectId = 'projectId';

  ingredients$;
  unit$;
  items: Observable<any>;

  projectSubscription: Subscription;
  developerSubscription: Subscription;
  projects: Project[] = [];
  developers: Project[] = [];

  onEditItem(
    ingredientId: string,
    ingredientName: string,
    ingredientAmount: string,
    ingredientUnit: string,
    ProjectId: string
  ) {
    this.notepadService.startedEditing.next(ingredientId);
    this.notepadService.startedEditingProject.next(ingredientId);
    this.editMode = true;

    this.ingname = ingredientName;
    this.ingam = ingredientAmount;
    this.ingunit = ingredientUnit;
    this.projectId = ProjectId;
    this.slForm.setValue({
      name: this.ingname,
      amount: this.ingam,
      measure: this.ingunit,
    });
  }

  constructor(
    private notepadService: NotePadService,
    private measureService: MeasureService
    ) {
  }

  ngOnInit() {
    this.projectSubscription = this.notepadService
      .getAllProjectsNotePadItems()
      .subscribe((projects) => (this.projects = projects));
    this.developerSubscription = this.notepadService
      .getAllDevelopersNotePadListItems()
      .subscribe((developers) => (this.developers = developers));

    this.ingredients$ = this.notepadService.getAll();
    this.unit$ = this.measureService.getAll();

    this.slSubscription = this.notepadService.getAllNotePadItems()
      .subscribe((ingredients) => {
        this.ingredients = ingredients;
    });
    this.editSubscription = this.notepadService.startedEditing.subscribe(
      (ingredientId: string) => {
        this.editedItemId = ingredientId;
        this.editMode = true;
        // this.editedItem = this.slService.get(ingredientId);
      }
    );
  }

  onSubmitIngredient(ingredient: Ingredient) {
    if (!this.ingredient.name) return;
    if (this.editMode) this.notepadService.update(this.editedItemId, ingredient);
    else this.notepadService.create(ingredient);
    this.editMode = false;
    this.slForm.reset();
  }
  onSubmitProjectIngredient(ingredient: Ingredient) {
    if (!this.ingredient.name) return;
    if (this.editMode) this.notepadService.update(this.editedItemId, ingredient);
    else this.notepadService.create(ingredient);
    this.editMode = false;
    this.slForm.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  deleteIngredient(projectId: string) {
    this.notepadService.delete(this.editedItemId);
    this.notepadService.deleteProjectIngredientFromNotePad(projectId, this.editedItemId);
    this.onClear();
  }
  deleteProject(projectId: string) {
    this.notepadService.deleteProjectFromNotePad(projectId);
  }
  removeDeveloper(devId: string) {
    this.notepadService.removeDeveloperFromNotePad(devId);
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe();
    this.developerSubscription.unsubscribe();
    this.slSubscription.unsubscribe();
    this.editSubscription.unsubscribe();
  }
}
