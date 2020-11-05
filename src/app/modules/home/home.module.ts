import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { HomeRoutingModule } from './home-routing.module';
import { GamesListComponent } from './games-list/games-list.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { PublicationFormComponent } from './publication-form/publication-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FeedComponent, GamesListComponent, PublicationFormComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule {
  constructor(library: FaIconLibrary){
    library.addIconPacks(fas);
  }
 }
