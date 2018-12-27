
import { NgModule } from '@angular/core';

import { QuestionComponent } from './question.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: QuestionComponent,
    data: {
      title: 'Question'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRouting { }
