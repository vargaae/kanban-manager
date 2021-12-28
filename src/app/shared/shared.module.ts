import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';

import { MaterialModule } from '../material-module';

// import { MatComponentsModule } from '../mat-components.module';

@NgModule({
  imports: [
    CommonModule,
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
  ],
})
export class SharedModule {}
