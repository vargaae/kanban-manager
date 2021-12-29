import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Developer } from '../../models/developers.model';
import { DeveloperService } from '../../services/developers.service';

@Component({
  selector: 'app-developer-item',
  templateUrl: './developer-item.component.html',
  styleUrls: ['./developer-item.component.scss'],
})
export class DeveloperItemComponent implements OnInit, OnDestroy {
  id;
  developer: Developer;
  subscription: Subscription;
  developers: Developer[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private developerService: DeveloperService
  ) {}

  async ngOnInit() {
    this.subscription = this.developerService
      .getAll()
      .subscribe((developers) => (this.developers = developers));
  }

  onSelected(developerId: string) {
    this.router.navigate([developerId], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
