import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GstComponent } from './gst.component';



const routes: Routes = [
  {
    path: '',
    component: GstComponent,
    data: {
      title: 'gst'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GstRoutingModule {}
