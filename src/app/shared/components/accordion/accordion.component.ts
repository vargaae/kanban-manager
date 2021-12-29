import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { AppUser } from '../../models/app-user';
import { AuthService } from '../../services/auth.service';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  appUser: AppUser;

  panelOpenState = false;

  constructor(public auth: AuthService) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser) => (this.appUser = appUser));
  }
}
