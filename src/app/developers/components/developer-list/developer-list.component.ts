import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-developer-list',
  templateUrl: './developer-list.component.html',
  styleUrls: ['./developer-list.component.scss'],
})
export class DeveloperListComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  onNewDeveloper() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
