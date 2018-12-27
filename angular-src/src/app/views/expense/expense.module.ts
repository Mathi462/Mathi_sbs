import { NgModule } from '@angular/core';



import {ExpenseComponent, DialogContentExampleDialog  } from './expense.component';
import { ExpenseRoutingModule } from './expense-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule,
         MatInputModule,
         MatIconModule,
         MatButtonModule,
         MatDialogModule, MatSnackBarModule, MatPaginatorModule, MatTableModule, MatSortModule, MatRippleModule, MatChipsModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule } from '@angular/material';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { PopupModule } from '../popup/popup.module';
import { PopupComponent } from '../popup/popup.component';
import { ShopownerErrorComponent } from '../errorDisplay/shopowner-error.component';
import { ExpenseErrorComponent } from '../errorDisplay/expense-error.component';
// import {ViewExpenseComponent} from './viewexpense.component';





@NgModule({
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    PopupModule,
    MatPaginatorModule,
    ReactiveFormsModule,
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
  ],
  entryComponents: [ExpenseComponent, ExpenseErrorComponent, DialogContentExampleDialog],

  declarations: [
    ExpenseComponent,
    
    ExpenseErrorComponent,
    DialogContentExampleDialog,



    ],
    providers: [
      FormBuilder,
    ApiService,
    HttpClientModule,
    PopupComponent

    ]

})
export class ExpenseModule { }
