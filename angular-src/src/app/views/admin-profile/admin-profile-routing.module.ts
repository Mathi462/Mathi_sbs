import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminProfileComponent } from './admin-profile.component';



const routes: Routes = [
  {
    path: '',
    component: AdminProfileComponent,
    data: {
      title: 'Admin Profile'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProfileRoutingModule {}
