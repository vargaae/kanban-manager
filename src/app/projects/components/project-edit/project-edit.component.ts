import { Projects } from '../../models/projectsclass.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { Project } from '../../models/projects.model';
import { ProjectService } from '../../services/project.service';
import { MeasureService } from 'src/app/shared/services/measure.service';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit, OnDestroy {
  id;
  project: Project = {} as Project;
  // lastUpdate = new FormControl(new Date());

  editMode = false;
  projectForm: FormGroup;
  routeSubscription: Subscription;
  reactiveProject: any;
  measure$;
  projects: {} = {} as Project;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private measureService: MeasureService,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.projectService.get(this.id)
      .pipe(take(1))
      .subscribe(r => this.project = r);

    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
    this.measure$ = this.measureService.getAll();
  }

  getControls() {
  return (this.projectForm.get('ingredients') as FormArray).controls;
}

  get controls() {
    // a getter!
    return (<FormArray>this.projectForm.get('ingredients')).controls;
  }

  onSubmit() {
    const newProject = new Projects(
      this.projectForm.value['name'],
      this.projectForm.value['description'],
      this.projectForm.value['preparation'],
      this.projectForm.value['imagePath'],
      this.projectForm.value['ingredients'],
      this.projectForm.value['lastUpdate'],
    )
    if (this.editMode) {
      this.projectService.update(
        this.id,
        newProject
        // this.projectForm.value,
      );
    } else {
      this.projectService.create(
        newProject
        // this.projectForm.value
        );
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.projectForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        measure: new FormControl(null, Validators.required),
        // amount: new FormControl(null, Validators.required),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.projectForm.get('ingredients')).removeAt(index);
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
    let projectName = '';
    let projectImagePath = '';
    let projectDescription = '';
    let projectPreparation = '';
    let projectIngredients = new FormArray([]);
    let lastUpdate = new Date().toLocaleString();

    this.projectForm = new FormGroup({
      name: new FormControl(projectName, Validators.required),
      imagePath: new FormControl(projectImagePath, Validators.required),
      description: new FormControl(projectDescription, Validators.required),
      preparation: new FormControl(projectDescription, Validators.required),
      ingredients: projectIngredients,
      lastUpdate: new FormControl(lastUpdate, Validators.required)
      // lastUpdate: new FormControl({value: lastUpdate, disabled: false})
    });

    if (this.editMode) {
      this.reactiveProject = this.projectService
        .get(this.id)
        .pipe(take(1))
        .subscribe((reactiveProject: Project) => {
          this.projectForm.patchValue(reactiveProject);
          this.projectForm.setControl('ingredients', this.setExistingIngredients(reactiveProject.ingredients));
        });

      projectName = this.project.name;
      projectImagePath = this.project.imagePath;
      projectDescription = this.project.description;
      projectPreparation = this.project.preparation;
      lastUpdate = new Date().toLocaleString();
    }
  }

  deleteProject() {
    if (!confirm('Are you sure you want to delete this project?')) return;

    this.projectService.delete(this.id);
    this.router.navigate(['/projects']);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
