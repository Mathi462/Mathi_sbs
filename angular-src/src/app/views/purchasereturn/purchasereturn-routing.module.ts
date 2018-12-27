import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchasereturnComponent } from './purchasereturn.component';



const routes: Routes = [
  {
    path: '',
    component: PurchasereturnComponent,
    data: {
      title: 'purchasereturn'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasereturnRoutingModule {}
