import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColourComponent } from './colour.component';



const routes: Routes = [
  {
    path: '',
    component: ColourComponent,
    data: {
      title: 'colour'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColourRoutingModule {}
