import { NgModule } from '@angular/core';



import { CommonModule } from '@angular/common';


import { VoucherRoutingModule } from './voucher-routing.module';
import { VoucherComponent } from './voucher.component';


@NgModule({
  imports: [
    CommonModule,

    VoucherRoutingModule
  ],
  declarations: [

    VoucherComponent
    ]
})
export class VoucherModule { }
