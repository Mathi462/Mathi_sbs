import { NgModule } from '@angular/core';



import { AddorderComponent } from './addorder.component';
import { CurrencyPipe } from '@angular/common';
import { AddorderRoutingModule } from './addorder-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule,
         MatInputModule,
         MatIconModule,
         MatButtonModule,
         MatDialogModule, MatSnackBarModule, MatPaginatorModule, MatTableModule, MatSortModule, MatRippleModule, MatChipsModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatCardModule, MatDividerModule, MatAutocompleteModule } from '@angular/material';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { PopupModule } from '../popup/popup.module';
import { PopupComponent } from '../popup/popup.component';
import { AddorderErrorComponent } from '../errorDisplay/addorder-error.component';





@NgModule({
  imports: [
    CommonModule,
    AddorderRoutingModule,
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
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    MatRippleModule,
    MatChipsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule
  ],
  entryComponents: [AddorderComponent, AddorderErrorComponent],

  declarations: [
    AddorderComponent,
    AddorderErrorComponent,
    



    ],
    providers: [
      FormBuilder,
    ApiService,
    HttpClientModule,
    PopupComponent,
    CurrencyPipe
    ],
    

})
export class AddorderModule { }
