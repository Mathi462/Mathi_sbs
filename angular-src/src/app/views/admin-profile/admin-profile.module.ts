import { NgModule } from '@angular/core';



import { AdminProfileComponent } from './admin-profile.component';
import { AdminProfileRoutingModule } from './admin-profile-routing.module';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    AdminProfileRoutingModule
  ],
  declarations: [
    AdminProfileComponent
    ]
})
export class AdminProfileModule { }
