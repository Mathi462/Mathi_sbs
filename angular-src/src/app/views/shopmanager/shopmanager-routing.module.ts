import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopmanagerComponent } from './shopmanager.component';



const routes: Routes = [
  {
    path: '',
    component: ShopmanagerComponent,
    data: {
      title: 'shopmanager'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopmanagerRoutingModule {}
