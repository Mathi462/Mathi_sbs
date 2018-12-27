import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GradeComponent } from './grade.component';



const routes: Routes = [
  {
    path: '',
    component: GradeComponent,
    data: {
      title: 'Add Grade'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradeRoutingModule {}
