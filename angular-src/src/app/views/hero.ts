import { MatSnackBar } from '@angular/material';

export class PopUP {

  snakbar(object: MatSnackBar, message , action) {

    object.open(message , action , {
      duration: 2000,

    });

  }
}
