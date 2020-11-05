import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAdminGuard } from '../shared/guards/is-admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { 
    path: 'admin/dashboard', 
    component: DashboardComponent,
    canActivate: [
      IsAdminGuard
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
