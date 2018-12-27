import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder, NgForm, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, PageEvent, MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { PopupComponent } from '../popup/popup.component';
import { Router } from '@angular/router';


export interface DialogData {
  arr1: any;
  values: any;

}
@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.scss']

})



export class CreateStoreComponent implements OnInit {

  form: FormGroup;
  arr: {};
  result: any;
  display: any =[];
  displayArray: any = [];
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

  displayedColumns: string[] = ['storename', 'username','firstname','address','email','mobile_no','status','edit','delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public apiService: ApiService,
    public sbar: MatSnackBar,
    public pop: PopupComponent,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog) {
    this.showAdmin();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      // storeid: [null, Validators.required],
      storename: [null, Validators.required],
      username: [null, [Validators.required]],
      password: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname:[null,Validators.required],
      address:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      mobile_no:['',Validators.required],
      status:['',Validators.required]
     
     
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
    // console.log(this.form.value);
    if (this.form.valid) {
      console.log(this.form.value);
      this.adminRegister();
      console.log('form submitted');
      console.log(this.form.value);
      this.reset();
    } else {
      this.validateAllFormFields(this.form);
    }

  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.form)
    );
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
    let data ={
      storename   : this.form.value.storename,
      username    : this.form.value.username,
      email       : this.form.value.email,
      password    : this.form.value.password,
      firstname   : this.form.value.firstname,
      lastname    : this.form.value.lastname,
      address     : this.form.value.address,
      status      : this.form.value.status,
      shopowner   : 'null',
      bname       : 'null',
      shop_num    : 'null',
      sname       : 'null',
      gst_num     : 'null',
      shop_logo   : 'null',
      pan_num     : 'null',
      phone1      : this.form.value.mobile_no,
      phone2      : 'null',
      user_type   : 'admin'
    }
    this.apiService.getData('/all_login_users/adminregister', data).then(d => {
      this.result = d;
      if ( this.result.success === true) {
        this.pop.snakbar('Store Added', 'Successfully');
        this.router.navigate(['/create-store']);
      } else {
        this.pop.snakbar('Store Email Id is Already Exists ', 'Failed');
       
      }
      // console.log(this.result);
      this.showAdmin();
    });
  }


  showAdmin() {
    this.apiService.retriveData('/all_login_users/adminregister').then(displayCurriculum => {
      this.display = displayCurriculum;
      // console.log(this.display);
      for (let i = 0; i < this.display.length; i++) {
        if (this.display[i].user_type === 'admin') {
          console.log(this.display[i])
          this.displayArray.push(this.display[i])
        }
      }
      this.dataSource = new MatTableDataSource(this.displayArray);
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
    this.apiService.deleteData('/all_login_users/adminregister/' + value).then(del => {
      this.delete = del;
      this.pop.snakbar('Store Deleted', 'Successfully');
      this.showAdmin();
    });
  }

  

  openDialog(value): void {
    // console.log(value);

    const cData = {
      // storeid: value.storeid,
      storename: value.storename,
      username: value.username,
      password: value.password,
      firstname: value.firstname,
     // last_name: value.last_name,
      address: value.address,
      email: value.email,
      // mobile_no: value.mobile_no,
      phone1  : value.mobile_no,
      status: value.status

      
      
      
      
      
      
      
      
      
     
    };
    this.defRef = this.dialog.open(DialogContentExampleDialog, {
      width: '500px',
      data: { values: value, cData: cData }
    });

    this.defRef.afterClosed().subscribe(result => {
      if (result != null) {
        // console.log(result.values._id);
        this.apiService.updateData('/all_login_users/adminregister/' + result.values._id, result.cData).then(d => {
          // console.log(d);
          this.pop.snakbar('Store Updated', 'Successfully');
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






