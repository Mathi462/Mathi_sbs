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
  selector: 'app-shopowner',
  templateUrl: './shopowner.component.html',

})

export class ShopownerComponent implements OnInit {
 branchid : any =[{}];
  
  branch_name : any =[{}];
  //gst : any =[{}];
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

  displayedColumns: string[] = ['shopownerid', 'first_name','last_name','address','email','mobile_no','status','branchid','branch_name','edit','delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public apiService: ApiService ,
     public dialog: MatDialog,
      public nav: DefaultLayoutComponent ,
      public sbar: MatSnackBar,
      public pop: PopupComponent,
      public formBuilder: FormBuilder) {
        this.showShopowner();
        this.getBranchid();
        this.getBranchname();
        //this.getGst()
       }

       
  ngOnInit() {
    this.form = this.formBuilder.group({
      
    
      shopownerid:['',Validators.required],
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      address:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      mobile_no:['',Validators.required],
      status:['',Validators.required],
      branchid:['',Validators.required],
      branch_name:['',Validators.required],
      
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
      this.shopownerRegister();
      console.log('form submitted');
      console.log(this.form.value);
      this.reset();
    } else {
      this.validateAllFormFields(this.form);
    }

  }

  base64textString = [];

onUploadChange(evt: any) {
  const file = evt.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }
}

handleReaderLoaded(e) {
  this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
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

  shopownerRegister() {
    this.apiService.getData('/shopowners/shopowner', JSON.stringify(this.form.value)).then(d => {
      this.result = d;
      console.log(this.result);

      if ( this.result.success === true) {
        this.pop.snakbar('Shopowner Added', 'Successfully');

      } else {
      //  this.pop.snakbar('Stock Register', 'Failed');
        this.pop.snakbar('Shopowner ID or Name is Already Exists', 'Failed');

      //  alert('GST Id or Name is Already Exists');
      }
    //   this.registerForm.reset();
    
      this.showShopowner();
    });
  }



  showShopowner() {
    this.apiService.retriveData('/shopowners/shopowner').then(displayShopowner => {
      this.display = displayShopowner;
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
  
  deleteShopowner(value) {
    console.log(value);
    this.apiService.deleteData('/shopowners/shopowner/' + value).then(del => {
      this.delete = del;
      this.pop.snakbar('Shopowner Deleted', 'Successfully');
      this.showShopowner();

    });
  }



  openDialog(value): void {
    console.log(value);
    this.nav.sidebarMinimized = false;
    const cData = {
     
      
      shopownerid: value.shopownerid,
      first_name: value.first_name,
      last_name: value.last_name,
      address: value.address,
      email: value.email,
      mobile_no: value.mobile_no,
      status: value.status,
      branchid: value.branchid,
      branch_name: value.branch_name,
      
    };
    this.defRef = this.dialog.open(DialogContentExampleDialog, {
      width: '500px',
      data: { values: value, cData: cData }
    });

    this.defRef.afterClosed().subscribe(result => {
      if (result != null) {
        console.log(result.values._id);
        this.apiService.updateData('/shopowners/shopowner/' + result.values._id, result.cData).then(d => {
          this.pop.snakbar('Shopowner Updated', 'Successfully');
          console.log(d);
          this.showShopowner();
        });
      }
    });
  }
  getBranchid(){
    this.apiService.retriveData("/branchs/branch").then(branch => {
      console.log(branch)
      this.branchid = branch
      console.log(this.branchid)
    })
  }

  getBranchname(){
    this.apiService.retriveData("/branchs/branch").then(branch => {
      console.log(branch)
      this.branch_name = branch
      console.log(this.branch_name)
    })
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

