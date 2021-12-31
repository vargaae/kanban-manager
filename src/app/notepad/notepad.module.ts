import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { NotePadRoutingModule } from './notepad-routing.module';
import { NotePadComponent } from './notepad.component';

@NgModule({
  declarations: [NotePadComponent],
  imports: [NotePadRoutingModule, FormsModule, SharedModule]
})
export class NotePadModule {}
