import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material';
import { FieldErrorDisplayComponent } from './field-error-display.component';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule

  ],
  declarations: [
      FieldErrorDisplayComponent
     ],
     entryComponents:[FieldErrorDisplayComponent],
    providers: [
    ]
})
export class FieldErrorModule { }
