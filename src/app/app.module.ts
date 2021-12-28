import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material-module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
