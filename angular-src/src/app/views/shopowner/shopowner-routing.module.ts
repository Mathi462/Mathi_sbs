import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopownerComponent } from './shopowner.component';



const routes: Routes = [
  {
    path: '',
    component: ShopownerComponent,
    data: {
      title: 'shopowner'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopownerRoutingModule {}
