import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAdminComponent } from './add-admin.component';



const routes: Routes = [
  {
    path: '',
    component: AddAdminComponent,
    data: {
      title: 'Add Admin'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddAdminRoutingModule {}
