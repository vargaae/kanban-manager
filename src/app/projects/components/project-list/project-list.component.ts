import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  onNewProject() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
