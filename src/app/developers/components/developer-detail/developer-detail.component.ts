import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { Developer } from '../../models/developers.model';
import { DeveloperService } from '../../services/developers.service';

@Component({
  selector: 'app-developer-detail',
  templateUrl: './developer-detail.component.html',
  styleUrls: ['./developer-detail.component.scss'],
})
export class DeveloperDetailComponent implements OnInit, OnDestroy {
  id;
  developer: Developer = {} as Developer;
  routeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private developerService: DeveloperService
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.developerService
        .get(this.id)
        .pipe(take(1))
        .subscribe((r) => (this.developer = r));
    });
  }

  onAddDevelopersToNotePad() {
    this.developerService.addDevelopersToNotePad(this.id, this.developer);
  }

  onEditDeveloper() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  deleteDeveloper() {
    if (!confirm('Are you sure you want to delete this project?')) return;

    this.developerService.delete(this.id);
    this.router.navigate(['/developers']);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
