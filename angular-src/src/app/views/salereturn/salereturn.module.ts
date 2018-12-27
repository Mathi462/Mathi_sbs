import { NgModule } from '@angular/core';



// import { SalereturnComponent } from './salereturn.component';
import { SalereturnComponent, DialogContentExampleDialog } from './salereturn.component';
import { SalereturnRoutingModule } from './salereturn-routing.modules';
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
          MatSelectModule, 
          MatCheckboxModule, MatListModule, MatTableModule, MatSortModule, MatRippleModule, MatChipsModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { PopupModule } from '../popup/popup.module';
import { PopupComponent } from '../popup/popup.component';
import { SalereturnErrorComponent } from '../errorDisplay/salereturn-errror.components';






@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SalereturnRoutingModule,
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


  entryComponents: [SalereturnComponent, SalereturnErrorComponent, DialogContentExampleDialog],

  declarations: [
    DialogContentExampleDialog,
    SalereturnComponent,
    
    SalereturnErrorComponent

    ],
    providers: [
      ApiService,
      FormBuilder,
      HttpClientModule,
      PopupComponent
    ]
})
export class SalereturnModule { }
