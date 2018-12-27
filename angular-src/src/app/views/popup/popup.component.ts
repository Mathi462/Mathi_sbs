import { Component, OnInit, Directive } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  templateUrl: 'popup.component.html'
})

export class PopupComponent  {

  constructor(public object: MatSnackBar) { }


  snakbar( message , action) {

    this.object.open(message , action , {
      duration: 1000,
    });

  }

}
