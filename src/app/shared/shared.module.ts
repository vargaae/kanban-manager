import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';

import { MaterialModule } from '../material-module';
import { AccordionComponent } from './components/accordion/accordion.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// import { MatComponentsModule } from '../mat-components.module';

@NgModule({
  declarations: [
    AccordionComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CustomFormsModule,
    HttpClientModule,
    MaterialModule,
    AngularFireDatabaseModule,
    NgbModule,
  ],
  exports: [
    CommonModule,
    CustomFormsModule,
    HttpClientModule,
    MaterialModule,
    AngularFireDatabaseModule,
    NgbModule,
    AccordionComponent,
  ],
})
export class SharedModule {}
