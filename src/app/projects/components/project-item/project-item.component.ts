import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Project } from '../../models/projects.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent implements OnInit, OnDestroy {
  id;
  project: Project;
  subscription: Subscription;
  projects: Project[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  async ngOnInit() {
    this.subscription = this.projectService
      .getAll()
      .subscribe((projects) => (this.projects = projects));
  }

  onSelected(projectId: string) {
    this.router.navigate([projectId], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
