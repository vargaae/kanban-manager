import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { Project } from '../../models/projects.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  id;
  project: Project = {} as Project;
  routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.projectService
        .get(this.id)
        .pipe(take(1))
        .subscribe((r) => (this.project = r));
    });
  }

  onAddProjectsToShoppingList() {
    this.projectService.addProjectsToShoppingList(this.id, this.project);
  }

  onEditProject() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  deleteProject() {
    if (!confirm('Are you sure you want to delete this Project?')) return;

    this.projectService.delete(this.id);
    this.router.navigate(['/projects']);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
