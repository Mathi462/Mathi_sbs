import { NgModule } from '@angular/core';



import { AsseComponent, DialogContentExampleDialog } from './asse.component';
import { AsseRoutingModule } from './asse-routing.module';
import { ViewasseComponent } from './view-asse.component';
import { UpdateasseComponent } from './updateasse.component';
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
import { AsseErrorComponent } from '../errorDisplay/asse-error.component';





@NgModule({
  imports: [
    CommonModule,
    AsseRoutingModule,
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
    MatSelectModule
  ],
  entryComponents: [ViewasseComponent,AsseComponent, AsseErrorComponent, DialogContentExampleDialog,UpdateasseComponent],

  declarations: [
    AsseComponent,
    AsseErrorComponent,
    ViewasseComponent,
    DialogContentExampleDialog,
    UpdateasseComponent



    ],
    providers: [
      FormBuilder,
    ApiService,
    HttpClientModule,
    PopupComponent

    ]

})
export class AsseModule { }
