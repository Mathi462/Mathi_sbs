import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManufacturerComponent } from './manufacturer.component';



const routes: Routes = [
  {
    path: '',
    component: ManufacturerComponent,
    data: {
      title: 'manufacturer'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufacturerRoutingModule {}
