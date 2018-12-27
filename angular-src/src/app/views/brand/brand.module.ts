import { NgModule } from '@angular/core';



import { BrandComponent, DialogContentExampleDialog } from './brand.component';
import { BrandRoutingModule } from './brand-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule,
         MatInputModule,
         MatIconModule,
         MatButtonModule,
         MatDialogModule, MatSnackBarModule, MatPaginatorModule, MatTableModule, MatSortModule, MatRippleModule, MatChipsModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatCardModule } from '@angular/material';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { PopupModule } from '../popup/popup.module';
import { PopupComponent } from '../popup/popup.component';
import { BrandErrorComponent } from '../errorDisplay/brand-error.component';





@NgModule({
  imports: [
    CommonModule,
    BrandRoutingModule,
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
    MatCardModule
  ],
  entryComponents: [BrandComponent, BrandErrorComponent, DialogContentExampleDialog],

  declarations: [
    BrandComponent,
    BrandErrorComponent,
    DialogContentExampleDialog,



    ],
    providers: [
      FormBuilder,
    ApiService,
    HttpClientModule,
    PopupComponent

    ]

})
export class BrandModule { }
