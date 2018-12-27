import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder, NgForm, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, PageEvent, MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { PopupComponent } from '../popup/popup.component';


export interface DialogData {
  arr1: any;
  values: any;

}
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./admin.scss']

})



export class AddAdminComponent implements OnInit {

  form: FormGroup;
  arr: {};
  result: any;
  display: any;
  delete: {};
  arr1: any;
  cData: any;
  defRef: any;
  s_no  = 0;
  length: any;
  pageSize = 4;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  display1: any;
  dataSource: any;

  displayedColumns: string[] = ['id','name', 'email', 'edit','delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public apiService: ApiService,
    public sbar: MatSnackBar,
    public pop: PopupComponent,
    private formBuilder: FormBuilder,
    public dialog: MatDialog) {
    this.showAdmin();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
     
    });

  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  onSubmit(form: NgForm) {
    // console.log(this.form);
    if (this.form.valid) {
      this.adminRegister();
      console.log('form submitted');
      console.log(this.form.value);
      this.reset();
    } else {
      this.validateAllFormFields(this.form);
    }

  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      // console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  reset() {
    this.form.reset();
  }


  adminRegister() {
    this.apiService.getData('/admins/adminregister', JSON.stringify(this.form.value)).then(d => {
      this.result = d;
      if ( this.result.success === true) {
        this.pop.snakbar('Admin Added', 'Successfully');
      } else {
        this.pop.snakbar('Admin Email Id is Already Exists ', 'Failed');
       
      }
      // console.log(this.result);
      this.showAdmin();
    });
  }


  showAdmin() {
    this.apiService.retriveData('/admins/adminregister').then(displayCurriculum => {
      this.display = displayCurriculum;
      // console.log(this.display);
      this.dataSource = new MatTableDataSource(this.display);
      // console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  deleteAdmin(value) {
    // console.log(value);
    this.apiService.deleteData('/admins/adminregister/' + value).then(del => {
      this.delete = del;
      this.pop.snakbar('Admin Deleted', 'Successfully');
      this.showAdmin();
    });
  }

  

  openDialog(value): void {
    // console.log(value);

    const cData = {
      id: value.id,
      name: value.name,
      email: value.email,
      password: value.password
    };
    this.defRef = this.dialog.open(DialogContentExampleDialog, {
      width: '500px',
      data: { values: value, cData: cData }
    });

    this.defRef.afterClosed().subscribe(result => {
      if (result != null) {
        // console.log(result.values._id);
        this.apiService.updateData('/admins/adminregister/' + result.values._id, result.cData).then(d => {
          // console.log(d);
          this.pop.snakbar('Admin Updated', 'Successfully');
          this.showAdmin();
        });
      }
    });
  }



}



@Component({

  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})

// tslint:disable-next-line:component-class-suffix
export class DialogContentExampleDialog {
  result: any;
  tmpData: any;
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public apiService: ApiService) {

    // this.form.value.cid = this.data.values;
    this.tmpData = this.data;
    // console.log(this.tmpData);
  }

  onNoClick() {
    this.data.values = this.tmpData;
    // console.log(this.data);
    this.dialogRef.close();

  }
}






