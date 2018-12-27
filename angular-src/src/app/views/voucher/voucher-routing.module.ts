import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoucherComponent } from './voucher.component';



const routes: Routes = [
  {
    path: '',
    component: VoucherComponent,
    data: {
      title: 'Add Voucher'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoucherRoutingModule {}
