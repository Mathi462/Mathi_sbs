
import { NgModule } from '@angular/core';

import { QuestionPaperComponent } from './question-paper.component';
import { Routes, RouterModule } from '@angular/router';
import { SelectQuspaperComponent } from './select-quspaper.component';
import { DisplayQuspaperComponent } from './display-qus-paper.component';





const routes: Routes = [
  {
    path: '',
    data: {
      title: 'question-paper'
    },
    children: [
      {
        path: 'question-paper',
        component: QuestionPaperComponent,
        data: {
          title: 'Question Paper'
        }
      },
      {
        path: 'select-quspaper',
        component: SelectQuspaperComponent,
        data: {
          title: 'Question Paper Selection'
        }
      },
      {
        path: 'display-qus-paper',
        component: DisplayQuspaperComponent,
        data: {
          title: 'Question Paper Selection'
        }
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionPaperRouting { }
