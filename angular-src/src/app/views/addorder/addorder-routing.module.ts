import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddorderComponent } from './addorder.component';



const routes: Routes = [
  {
    path: '',
    component: AddorderComponent,
    data: {
      title: 'Billing'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddorderRoutingModule {}
