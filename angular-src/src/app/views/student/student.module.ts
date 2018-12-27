import { NgModule } from '@angular/core';



import { AddStudentComponent } from './add-student.component';
import { ViewStudentComponent, DialogContentExampleDialog } from './view-student.component';
import { StudentRoutingModule } from './student-routing.module';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule,
         MatInputModule,
         MatIconModule,
         MatPaginatorModule,
         MatDialogModule,
          MatButtonModule,
          MatSnackBarModule,
          MatOptionModule,
          MatSelectModule, MatCheckboxModule, MatListOption, MatListModule, MatTableModule, MatSortModule, MatRippleModule, MatChipsModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { PopupModule } from '../popup/popup.module';
import { PopupComponent } from '../popup/popup.component';
import { StudentErrorComponent } from '../errorDisplay/student-error.component';






@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StudentRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    PopupModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatListModule,
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
    MatSelectModule


  ],


  entryComponents: [ViewStudentComponent, StudentErrorComponent, DialogContentExampleDialog],

  declarations: [
    DialogContentExampleDialog,
    AddStudentComponent,
    ViewStudentComponent,
    StudentErrorComponent

    ],
    providers: [
      ApiService,
      FormBuilder,
      HttpClientModule,
      PopupComponent
    ]
})
export class StudentModule { }
