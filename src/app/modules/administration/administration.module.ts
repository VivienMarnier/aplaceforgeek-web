import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import { GameFormComponent } from './game-form/game-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DashboardComponent, GameFormComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [GameFormComponent]
})
export class AdministrationModule { }
