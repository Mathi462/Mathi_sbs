// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { QuestionComponent } from './question.component';
import { QuestionRouting } from './question-routing.module';


@NgModule({
  imports: [
    CommonModule,
    QuestionRouting

  ],
  declarations: [
    QuestionComponent,

  ]
})
export class QuestionModule { }
