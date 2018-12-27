import { NgModule } from '@angular/core';



import { EditreturnComponent } from './editreturn.component';
import { CurrencyPipe } from '@angular/common';
import { EditreturnRoutingModule } from './editreturn-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule,
         MatInputModule,
         MatIconModule,
         MatButtonModule,
         MatDialogModule, MatSnackBarModule, MatPaginatorModule, MatTableModule, MatSortModule, MatRippleModule, MatChipsModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatCardModule, MatDividerModule } from '@angular/material';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { PopupModule } from '../popup/popup.module';
import { PopupComponent } from '../popup/popup.component';
import { EditreturnErrorComponent } from '../errorDisplay/editreturn-error.component';





@NgModule({
  imports: [
    CommonModule,
    EditreturnRoutingModule,
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
    MatCardModule,
    MatDividerModule
  ],
  entryComponents: [EditreturnComponent, EditreturnErrorComponent],

  declarations: [
    EditreturnComponent,
    EditreturnErrorComponent,
    



    ],
    providers: [
      FormBuilder,
    ApiService,
    HttpClientModule,
    PopupComponent,
    CurrencyPipe
    ],
    

})
export class EditreturnModule { }
