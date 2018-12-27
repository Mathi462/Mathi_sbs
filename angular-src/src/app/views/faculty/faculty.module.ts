import { AddFacultyComponent,  } from './add-faculty.component';
import { ViewFacultyComponent, DialogContentExampleDialog } from './view-faculty.component';
import { FacultyRoutingModule } from './faculty-routing.module';

import { ApiService } from '../../services/api.service';

import { MatFormFieldModule,
         MatInputModule,
         MatIconModule,
         MatPaginatorModule,
         MatDialogModule,
          MatButtonModule,
          MatSnackBarModule,
          MatOptionModule,
          MatSelectModule,  MatListOption, MatListModule, MatTableModule, MatSortModule, MatRippleModule, MatChipsModule, MatExpansionModule, MatNativeDateModule, MatDatepickerModule, MatCheckboxModule } from '@angular/material';
import { PopupModule } from '../popup/popup.module';
import { PopupComponent } from '../popup/popup.component';
import { FacultyErrorComponent } from '../errorDisplay/faculty-error.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';







@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FacultyRoutingModule,
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
  exports: [     ],

  entryComponents: [ViewFacultyComponent, FacultyErrorComponent, DialogContentExampleDialog],

  declarations: [
    DialogContentExampleDialog,
    AddFacultyComponent,
    FacultyErrorComponent,
    ViewFacultyComponent,

    ],
    providers: [
      ApiService,
      FormBuilder,
      HttpClientModule,

      PopupComponent
    ]
})
export class FacultyModule { }
