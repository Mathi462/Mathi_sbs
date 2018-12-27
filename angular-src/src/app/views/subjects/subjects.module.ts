import { NgModule } from '@angular/core';



import { CommonModule } from '@angular/common';

import { SubjectsComponent, DialogContentExampleDialog } from './subjects.component';
import { SubjectsRoutingModule } from './subjects-routing.module';
import { MatFormFieldModule, MatInputModule, MatChipsModule, MatButtonModule, MatIconModule, MatDialogModule, MatPaginatorModule, MatSnackBarModule, MatCardModule, MatTableModule, MatSortModule, MatExpansionModule, MatRippleModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { FormsModule, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { PopupModule } from '../popup/popup.module';
import { PopupComponent } from '../popup/popup.component';
import { SubjectErrorComponent } from '../errorDisplay/subject-error.component';


@NgModule({
  imports: [
    CommonModule,
    SubjectsRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    PopupModule,
    ReactiveFormsModule,
    MatCardModule,
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
  entryComponents: [SubjectsComponent, SubjectErrorComponent, DialogContentExampleDialog],
  declarations: [
    SubjectsComponent,
    DialogContentExampleDialog,
    SubjectErrorComponent
    ],
    providers: [
      FormBuilder,
      ApiService,
      HttpClientModule,
      PopupComponent
    ],
})
export class SubjectsModule { }
