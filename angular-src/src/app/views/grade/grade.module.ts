import { NgModule } from '@angular/core';



import { CommonModule } from '@angular/common';
import { GradeRoutingModule } from './grade-routing.module';
import { GradeComponent, DialogContentExampleDialog } from './grade.component';
import { MatChipsModule,
   MatFormFieldModule, MatInputModule, MatIconModule, MatDialogModule, MatButtonModule, MatPaginatorModule, MatTableModule, MatSortModule, MatRippleModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from '../popup/popup.component';
import { PopupModule } from '../popup/popup.module';
import { GradeErrorComponent } from '../errorDisplay/grade-error.component';



@NgModule({
  imports: [
    CommonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    GradeRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    PopupModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatRippleModule,
    MatChipsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  entryComponents: [GradeComponent, GradeErrorComponent, DialogContentExampleDialog],
  providers: [
    FormBuilder,
    ApiService,
    HttpClientModule,
    PopupComponent
  ],
  declarations: [
        GradeComponent,
        DialogContentExampleDialog,
        GradeErrorComponent
    ]

})
export class GradeModule { }
