import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalereturnComponent } from './salereturn.component';



const routes: Routes = [
  {
    path: '',
    component: SalereturnComponent,
    data: {
      title: 'salesreturn'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalereturnRoutingModule {}
