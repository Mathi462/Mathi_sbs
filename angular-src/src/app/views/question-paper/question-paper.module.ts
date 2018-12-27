// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { QuestionPaperComponent } from './question-paper.component';
import { QuestionPaperRouting } from './question-paper-routing.module';
import { MatIconModule, MatButtonModule, MatCheckboxModule, MatTableModule, MatInputModule, MatPaginatorModule, MatSortModule, MatRippleModule, MatChipsModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { SelectQuspaperComponent } from './select-quspaper.component';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { DisplayQuspaperComponent } from './display-qus-paper.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { PopupComponent } from '../popup/popup.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    QuestionPaperRouting,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatRippleModule,
    MatChipsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule

  ],
  declarations: [
    QuestionPaperComponent,
    SelectQuspaperComponent,
    DisplayQuspaperComponent

  ],
  providers: [
    ApiService,
    HttpClientModule,
    PopupComponent,
    FormBuilder
   
  ]
})
export class QuestionPaperModule { }
