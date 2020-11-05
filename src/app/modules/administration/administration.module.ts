import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { GameFormComponent } from './game-form/game-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [DashboardComponent, GameFormComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
  ],
  bootstrap: [GameFormComponent]
})
export class AdministrationModule { 
  constructor(library: FaIconLibrary){
    library.addIconPacks(fas);
  }
}
