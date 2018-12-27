import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityQuestionComponent } from './security-question.component';



const routes: Routes = [
  {
    path: '',
    component: SecurityQuestionComponent,
    data: {
      title: 'Security Question'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityQuestionRoutingModule {}
