import { NgModule } from '@angular/core';



import { AddAdminComponent, DialogContentExampleDialog } from './add-admin.component';
import { AddAdminRoutingModule } from './add-admin-routing.module';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule, MatInputModule,
         MatIconModule, MatPaginatorModule,
         MatDialogModule, MatButtonModule,
         MatSnackBarModule, MatCardModule, MatTableModule, MatSortModule, MatRippleModule, MatChipsModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { PopupModule } from '../popup/popup.module';
import { PopupComponent } from '../popup/popup.component';
import { FieldErrorDisplayComponent } from '../field-error-display/field-error-display.component';
import { FileDetector } from 'selenium-webdriver/remote';
import { FieldErrorModule } from '../field-error-display/field-error.module';



@NgModule({
  imports: [
    CommonModule,
    AddAdminRoutingModule,
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
  declarations: [

    AddAdminComponent,
    FieldErrorDisplayComponent,
    DialogContentExampleDialog,

    ],
    entryComponents: [AddAdminComponent, FieldErrorDisplayComponent,  DialogContentExampleDialog],
    providers: [
      FormBuilder,
    ApiService,
    HttpClientModule,
    PopupComponent,


    ]
})
export class AddAdminModule { }
