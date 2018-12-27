import { NgModule } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SecurityQuestionRoutingModule } from './security-question-routing.module';
import { SecurityQuestionComponent } from './security-question.component';

import { CommonModule } from '@angular/common';

import { MatButtonModule,
        MatCheckboxModule,
        MatCardModule,
        MatRadioModule,
        MatStepperModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatRippleModule,
        MatChipsModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSnackBarModule,
        MatDialogModule,
        MatTooltipModule,
        MatDividerModule,
        MatListModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { PopupModule } from '../popup/popup.module';

import { ApiService } from '../../services/api.service';
import { PopupComponent } from '../popup/popup.component';

@NgModule({
  imports: [
    CommonModule,
    SecurityQuestionRoutingModule,
    HttpClientModule,
    
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
    MatSnackBarModule,
    MatChipsModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    PopupModule,
    MatCardModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDividerModule,
    MatListModule,
    FormsModule,
    MatStepperModule,
   
  ],
  declarations: [
    SecurityQuestionComponent
   ],
    providers: [
      
      ApiService,
      HttpClientModule,
      PopupComponent,
      FormBuilder
    ]
})
export class SecurityQuestionModule { }
