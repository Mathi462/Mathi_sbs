import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurriculumComponent } from './curriculum.component';



const routes: Routes = [
  {
    path: '',
    component: CurriculumComponent,
    data: {
      title: 'Add curriculum'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurriculumRoutingModule {}
