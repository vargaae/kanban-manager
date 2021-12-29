import { Developers } from './../../models/developersclass.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { Developer } from '../../models/developers.model';
import { DeveloperService } from '../../services/developers.service';
import { MeasureService } from 'src/app/shared/services/measure.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-developer-edit',
  templateUrl: './developer-edit.component.html',
  styleUrls: ['./developer-edit.component.scss']
})
export class DeveloperEditComponent implements OnInit, OnDestroy {
  id;
  developer: Developer = {} as Developer;
  // lastUpdate = new FormControl(new Date());

  editMode = false;
  developerForm: FormGroup;
  routeSubscription: Subscription;
  reactiveDeveloper: any;
  measure$;
  developers: {} = {} as Developer;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private developerService: DeveloperService,
    private measureService: MeasureService,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.developerService.get(this.id)
      .pipe(take(1))
      .subscribe(r => this.developer = r);

    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
    this.measure$ = this.measureService.getAll();
  }

  getControls() {
  return (this.developerForm.get('ingredients') as FormArray).controls;
}

  get controls() {
    // a getter!
    return (<FormArray>this.developerForm.get('ingredients')).controls;
  }

  onSubmit() {
    const newDeveloper = new Developers(
      this.developerForm.value['name'],
      this.developerForm.value['description'],
      this.developerForm.value['preparation'],
      this.developerForm.value['imagePath'],
      this.developerForm.value['ingredients'],
      this.developerForm.value['lastUpdate'],
    )
    if (this.editMode) {
      this.developerService.update(
        this.id,
        newDeveloper
        // this.developerForm.value,
      );
    } else {
      this.developerService.create(
        newDeveloper
        // this.developerForm.value
        );
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.developerForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        measure: new FormControl(null, Validators.required),
        // amount: new FormControl(null, Validators.required),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.developerForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  setExistingIngredients(ingredientSets: Ingredient[]): FormArray {
    const formArray = new FormArray([]);
    ingredientSets.forEach(i => {
      formArray.push(this.fb.group({
        name: i.name,
        // amount: i.amount,
        measure: i.measure
      }));
    });

    return formArray;
  }

  private initForm() {
    let developerName = '';
    let developerImagePath = '';
    let developerDescription = '';
    let developerPreparation = '';
    let developerIngredients = new FormArray([]);
    let lastUpdate = new Date().toLocaleString();

    this.developerForm = new FormGroup({
      name: new FormControl(developerName, Validators.required),
      imagePath: new FormControl(developerImagePath, Validators.required),
      description: new FormControl(developerDescription, Validators.required),
      preparation: new FormControl(developerDescription, Validators.required),
      ingredients: developerIngredients,
      lastUpdate: new FormControl(lastUpdate, Validators.required)
      // lastUpdate: new FormControl({value: lastUpdate, disabled: false})
    });

    if (this.editMode) {
      this.reactiveDeveloper = this.developerService
        .get(this.id)
        .pipe(take(1))
        .subscribe((reactiveDeveloper: Developer) => {
          this.developerForm.patchValue(reactiveDeveloper);
          this.developerForm.setControl('ingredients', this.setExistingIngredients(reactiveDeveloper.ingredients));
        });

      developerName = this.developer.name;
      developerImagePath = this.developer.imagePath;
      developerDescription = this.developer.description;
      developerPreparation = this.developer.preparation;
      lastUpdate = new Date().toLocaleString();
    }
  }

  deleteDeveloper() {
    if (!confirm('Are you sure you want to delete this developer?')) return;

    this.developerService.delete(this.id);
    this.router.navigate(['/developers']);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
