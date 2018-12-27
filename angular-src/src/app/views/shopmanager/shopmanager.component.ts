
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
  selector: 'app-shopmanager',
  templateUrl: './shopmanager.component.html',

})

export class ShopmanagerComponent implements OnInit {
  branchname : any =[{}];
  shopowner: any = [];
  bname1:any=[];
firstname : any =[{}];
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
  shopowner1: any
  form: FormGroup;

  dataSource: any;
 // dataSource1: any;

  displayedColumns: string[] = ['shopownerid','branchname','firstname','emptype','dob','age','phone','edit','delete'];
 // displayedColumns1: string[] = ['id','firstname','lastname','emp_type','dob','age','phone','branchid','shopownerid','Usertype','edit','delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  constructor(public apiService: ApiService ,
     public dialog: MatDialog,
      public nav: DefaultLayoutComponent ,
      public sbar: MatSnackBar,
      public pop: PopupComponent,
      public formBuilder: FormBuilder) {
        // this.showSalesperson();
        this.showShopmanager();
        this.getBranchid();
        this.getShopownerid();
        //this.getGst()
       }

       
  ngOnInit() {
    this.form = this.formBuilder.group({
      
    
      // id:[''],
      shopownerid:[''],
      branchname:[''],  
      firstname:[''],
      lastname:[''],
      emptype:[''],
      dob:[''],
      age:[''],
      email:[''],
      phone:['',Validators.required],
    
      pancard:[''],
      aadhaarcard:[''],
      driving_license:[''],
      previous_employment:[''],
      previous_employment_address:[''],
      previous_employment_mobile:['']
     
     
      
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
      this.shopmanagerRegister();
      console.log('form submitted');
      console.log(this.form.value);
      this.reset();
    } else {
      this.validateAllFormFields(this.form);
    }

  }
  

  // onSubmit(form: NgForm) {
  //   console.log(this.form);
  //   if (this.form.valid) {
  //     this.shopmanagerRegister();
  //     console.log('form submitted');
  //     console.log(this.form.value);
  //     console.log(this.form.value.Usertype);
  //     this.reset();
  //   } else {
  //     this.validateAllFormFields(this.form);
  //   }

  // }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
    //  console.log(field);
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

shopmanagerRegister() {
 
      this.apiService.getData('/shop_managers/shop_manager', JSON.stringify(this.form.value)).then(d => {
            this.result = d;
            console.log(this.result);
      
            if ( this.result.success === true) {
              this.pop.snakbar('ShopManager Added', 'Successfully');
      
            } else {
            //  this.pop.snakbar('Stock Register', 'Failed');
              this.pop.snakbar('ShopManager ID or Name is Already Exists', 'Failed');
      
            //  alert('GST Id or Name is Already Exists');
            }
          //   this.registerForm.reset();
          
            this.showShopmanager();
          });


    }
  
    showShopmanager() {
    this.apiService.retriveData('/shop_managers/shop_manager').then(displayShopmanager => {
      this.display = displayShopmanager;
    //  console.log(this.display);
      this.dataSource = new MatTableDataSource(this.display);
     // console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  // showShopmanager() {
  //   this.apiService.retriveData('/shop_managers/shop_manager').then(displayShopmanager => {
  //     this.display = displayShopmanager;
  //   //  console.log(this.display);
  //     this.dataSource1 = new MatTableDataSource(this.display);
  //    // console.log(this.dataSource);
  //     this.dataSource1.sort = this.sort;
  //     this.dataSource1.paginator = this.paginator;
  //   });
  // }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  deleteShopmanager(value) {
  //  console.log(value);
    this.apiService.deleteData('/shop_managers/shop_manager/' + value).then(del => {
      this.delete = del;
      this.pop.snakbar('Shopmanager Deleted', 'Successfully');
      this.showShopmanager();

    });
  }



  openDialog(value): void {
  //  console.log(value);
    this.nav.sidebarMinimized = false;
    const cData = {
     
      
      // id:value.id,
      shopownerid:value.shopownerid,
      branchname:value.branchname,  
      firstname:value.firstname,
      lastname:value.lastname,
      emptype:value.emptype,
      dob:value.dob,
      age:value.age,
      phone:value.phone
     
     
      
    };
    this.defRef = this.dialog.open(DialogContentExampleDialog, {
      width: '500px',
      data: { values: value, cData: cData }
    });

    this.defRef.afterClosed().subscribe(result => {
      if (result != null) {
       // console.log(result.values._id);
        this.apiService.updateData('/shop_managers/shop_manager/' + result.values._id, result.cData).then(d => {
          this.pop.snakbar('Shopmanager Updated', 'Successfully');
        //  console.log(d);
          this.showShopmanager();
        });
      }
    });
  }
  getBranchid(){
    this.apiService.retriveData("/all_login_users/adminregister").then(bname => {
     // console.log(branch)
      this.branchname = bname
      console.log(this.branchname[0].user_type)
     // console.log(this.branchid)
       for (let i = 0; i < this.branchname.length; i++) {
        if (this.branchname[i].user_type === 'branch') {
          console.log(this.branchname[i])
          this.bname1.push(this.branchname[i])
        }
      }
    })  
  }

  getShopownerid(){
    this.apiService.retriveData("/all_login_users/adminregister").then(firstname => {
      console.log(firstname)
      this.shopowner1 = firstname
      console.log(this.shopowner1[0].user_type)
      for (let i = 0; i < this.shopowner1.length; i++) {
        if (this.shopowner1[i].user_type === 'admin') {
          console.log(this.shopowner1[i])
          this.shopowner.push(this.shopowner1[i])
        }
      }


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
  //  console.log(this.tmpData);
  }

  onNoClick() {
    this.data.values = this.tmpData;
    console.log(this.data);
    this.dialogRef.close();

  }
}


