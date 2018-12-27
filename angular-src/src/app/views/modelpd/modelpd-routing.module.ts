import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModelpdComponent } from './modelpd.component';



const routes: Routes = [
  {
    path: '',
    component: ModelpdComponent,
    data: {
      title: 'modelpd'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelpdRoutingModule {}
