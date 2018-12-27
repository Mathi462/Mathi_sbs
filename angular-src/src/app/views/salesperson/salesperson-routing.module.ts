import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalespersonComponent } from './salesperson.component';



const routes: Routes = [
  {
    path: '',
    component: SalespersonComponent,
    data: {
      title: 'saleperson'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalespersonRoutingModule {}
