import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsSignedInGuard } from '../shared/guards/is-signed-in.guard';
import { FeedComponent } from './feed/feed.component';
import { GamesListComponent } from './games-list/games-list.component';

const routes: Routes = [
  { 
    path: 'home', 
    component: FeedComponent,
    canActivate: [
      IsSignedInGuard
    ]
  },
  {
    path:'games/all',
    component: GamesListComponent,
    canActivate: [
      IsSignedInGuard
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
