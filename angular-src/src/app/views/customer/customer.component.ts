import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgForm, NgModel, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, PageEvent, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DefaultLayoutComponent } from '../../containers';
import { PopUP } from '../hero';
import { PopupComponent } from '../popup/popup.component';




export interface DialogData {
  arr1: any;
  values: any;
}


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',

})

export class CustomerComponent implements OnInit {
  
  arr: {};
  result: any;
  display: any;
  delete: {};
  arr1: any;
  cData: any;
  defRef: any;
  length: any;
  pageSize = 4;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  display1: any;
  registerForm: FormGroup;
  submitted = false;
  form: FormGroup;

  dataSource: any;

  displayedColumns: string[] = [ 'customerfname','customerphno','customeremail','edit','delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public apiService: ApiService ,
     public dialog: MatDialog,
      public nav: DefaultLayoutComponent ,
      public sbar: MatSnackBar,
      public pop: PopupComponent,
      public formBuilder: FormBuilder) {
        this.showCustomer();
       }

       
  ngOnInit() {
    this.form = this.formBuilder.group({
      
      // customerid:['',Validators.required],
      customerfname:['',Validators.required],
      // customerlname:['',Validators.required],
      customerphno:['',Validators.required],
      // dob:['',Validators.required],
      customeremail:['',Validators.required]
     
     
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
    console.log(this.form);
    if (this.form.valid) {
      this.customerRegister();
      console.log('form submitted');
      console.log(this.form.value);
      this.reset();
    } else {
      this.validateAllFormFields(this.form);
    }

  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
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

  customerRegister() {
    this.apiService.getData('/customers/customer', JSON.stringify(this.form.value)).then(d => {
      this.result = d;
      console.log(this.result);

      if ( this.result.success === true) {
        this.pop.snakbar('Customer Added', 'Successfully');

      } else {
      //  this.pop.snakbar('Customer Register', 'Failed');
        this.pop.snakbar('Customer ID or Name is Already Exists', 'Failed');

      //  alert('Customer Id or Name is Already Exists');
      }
    //   this.registerForm.reset();
    
      this.showCustomer();
    });
  }



  showCustomer() {
    this.apiService.retriveData('/customers/customer').then(displayCustomer => {
      this.display = displayCustomer;
      console.log(this.display);
      this.dataSource = new MatTableDataSource(this.display);
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  deleteCustomer(value) {
    console.log(value);
    this.apiService.deleteData('/customers/customer/' + value).then(del => {
      this.delete = del;
      this.pop.snakbar('Customer Deleted', 'Successfully');
      this.showCustomer();

    });
  }



  openDialog(value): void {
    console.log(value);
    this.nav.sidebarMinimized = false;
    const cData = {
                 
      // customerid: value.customerid,
      customerfname: value.customerfname,
      // customerlname: value.customerlname,
      customerphno: value.customerphno,
      // dob: value.dob,
      customeremail: value.customeremail
     
      
    };
    this.defRef = this.dialog.open(DialogContentExampleDialog, {
      width: '500px',
      data: { values: value, cData: cData }
    });

    this.defRef.afterClosed().subscribe(result => {
      if (result != null) {
        console.log(result.values._id);
        this.apiService.updateData('/customers/customer/' + result.values._id, result.cData).then(d => {
          this.pop.snakbar('Customer Updated', 'Successfully');
          console.log(d);
          this.showCustomer();
        });
      }
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  onPageChanged(e) {
    const firstCut = e.pageIndex * e.pageSize;
    const secondCut = firstCut + e.pageSize;
    this.display1 = this.display.slice(firstCut, secondCut);
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
    console.log(this.tmpData);
  }

  onNoClick() {
    this.data.values = this.tmpData;
    console.log(this.data);
    this.dialogRef.close();

  }
}
