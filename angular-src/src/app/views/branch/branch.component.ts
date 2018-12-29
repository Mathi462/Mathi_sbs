import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgForm, NgModel, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, PageEvent, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DefaultLayoutComponent } from '../../containers';
import { PopUP } from '../hero';
import { PopupComponent } from '../popup/popup.component';

import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/table';




export interface DialogData {
  arr1: any;
  values: any;
}


@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['/branch.scss']

})

export class BranchComponent implements OnInit {
  shopowner: any = [];
  arr: {};
  result: any;
  display: any = [];
  displayArray: any = [];
  delete: any;
  arr1: any;
  cData: any;
  defRef: any;
  length: any;
  pageSize = 4;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  display1: any;
  registerForm: FormGroup;
  image: FormGroup;
  submitted = false;
  form: FormGroup;
  shopowner1: any;

  dataSource: any;

  dataPassing = new FormData()
  imagepath: any;
  newimagepath: any;
  imagename: any;

  displayedColumns: string[] = ['bname', 'shopowner', 'address', 'edit', 'delete'];

  @ViewChild("f") f;
  loading: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public apiService: ApiService,
    public dialog: MatDialog,
    public nav: DefaultLayoutComponent,
    public sbar: MatSnackBar,
    private router: Router,
    public pop: PopupComponent,
    public formBuilder: FormBuilder) {
    this.showBranch();
    this.getshopowner();



    this.image = formBuilder.group({
      img: [null]
    })


  }


  ngOnInit() {
    this.form = this.formBuilder.group({

      // branchid:['',Validators.required],
      shopowner: ['', Validators.required],
      bname: ['', Validators.required],
      username: ['', Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      sname: ['', Validators.required],
      address: ['', Validators.required],
      gst_num: ['', Validators.required],
      // shop_logo:['',Validators.required],
      pan_num: ['', Validators.required],
      phone1: ['', Validators.required],
      phone2: [''],
      // shop_num:['',Validators.required],
      // owner_id:['',Validators.required]


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

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.form)
    );
  }

  isFieldInvalid1(field: string) {
    // return (
    //   (!this.image.get(field).valid && this.image.get(field).touched) ||
    //   (this.image.get(field).untouched && this.image)
    // );
    return !this.image.get(field).valid && this.image.get(field).touched;
  }


  onFileChge() {


    this.dataPassing.append("img", this.f.nativeElement.files[0], this.f.nativeElement.files[0]['name'])
    console.log(this.dataPassing);
    this.imagename = this.f.nativeElement.files[0]['name']
    console.log(this.imagename);




  }


  // onSubmit() {
  //   console.log(this.form);
  //   // if (this.form.valid) {
  //   // this.branchRegister();
  //   this. saveData();
  //   console.log('form submitted');
  //   console.log(this.form.value);
  //   this.reset();
  //   // } else {
  //   // this.validateAllFormFields(this.form);
  //   // }

  // }


  saveData() {
    if (this.form.valid) {

      console.log(this.form.value);

      let data = {
        shopowner: this.form.value.shopowner,
        bname: this.form.value.bname,
        email: this.form.value.email,
        username: this.form.value.username,
        password: this.form.value.password,
        sname: this.form.value.sname,
        address: this.form.value.address,
        gst_num: this.form.value.gst_num,
        shop_logo: this.imagename,
        pan_num: this.form.value.pan_num,
        phone1: this.form.value.phone1,
        phone2: this.form.value.phone2,
   

        storename: 'null',
        firstname: 'null',
        lastname: 'null',
        status: 'null',
        shop_num: 'null',

        user_type: 'branch'
      }



      this.apiService.getDataImage("/all_login_users/imageupload", this.dataPassing).then(d => {

      }, err => {
        console.log(err)
      });



      this.apiService.getData('/all_login_users/adminregister', data).then(d => {
        this.result = d;
        console.log(this.result);
        console.log(this.result.success);
        if (this.result.success === true) {
          this.pop.snakbar('Branch Added', 'Successfully');
          console.log('okkkkkkkkk')
          this.showBranch()
        } else {
          //  this.pop.snakbar('Curriculum Register', 'Failed');
          this.pop.snakbar('Branch ID or Name is Already Exists', 'Failed');

          //  alert('Curriculum Id or Name is Already Exists');
        }
        //   this.registerForm.reset();

        // this.showBranch();
      });

      this.router.navigate(['/branch']);



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

  // branchRegister() {
  //   this.apiService.getData('/branchs/branch', JSON.stringify(this.form.value)).then(d => {
  //     this.result = d;
  //     console.log(this.result);

  //     if (this.result.success === true) {
  //       this.pop.snakbar('Branch Added', 'Successfully');

  //       this.reset();

  //     } else {
  //       //  this.pop.snakbar('Curriculum Register', 'Failed');
  //       this.pop.snakbar('Branch ID or Name is Already Exists', 'Failed');

  //       //  alert('Curriculum Id or Name is Already Exists');
  //     }
  //     //   this.registerForm.reset();

  //     // this.showBranch();
  //   });
  // }



  showBranch() {
    this.apiService.retriveData('/all_login_users/adminregister').then(displayBranch => {
      this.display = displayBranch;
      this.displayArray = []
      console.log(this.display);
      for (let j = 0; j < this.display.length; j++) {
        if (this.display[j].user_type === 'branch') {

          this.displayArray.push(this.display[j])
          console.log(this.displayArray)
        }
      }
      this.dataSource = new MatTableDataSource(this.displayArray);
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteBranch(value, event) {
    console.log(value);
    this.apiService.deleteData('/all_login_users/adminregister/' + value._id).then(del => {
      this.delete = del;
      console.log(this.delete)
      console.log(event)
      this.dataSource.data.splice(event, 1)
      this.dataSource = new MatTableDataSource<Element>(this.dataSource.data);
      this.pop.snakbar('Branch Deleted', 'Successfully');


    });
    // this.showBranch();
    this.router.navigate(['/branch']);

  }





  openDialog(value): void {
    console.log(value);
    this.nav.sidebarMinimized = false;

    console.log(this.imagename)
    const cData = {




      // branchid: value.branchid,
      shopowner: value.shopowner,
      bname: value.bname,
      sname: value.sname,
      address: value.address,
      gst_num: value.gst_num,
      shop_logo: value.shop_logo,
      pan_num: value.pan_num,
      phone1: value.phone1,
      phone2: value.phone2,


      shop_num: value.shop_num,
      owner_id: value.owner_id



    };
    this.defRef = this.dialog.open(DialogContentExampleDialog, {
      width: '500px',
      data: { values: value, cData: cData }
    });

    this.defRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != null) {
        console.log(result.values._id);
        this.apiService.updateData('/branchs/branch/' + result.values._id, result.cData).then(d => {
          this.pop.snakbar('Branch Updated', 'Successfully');
          console.log(d);
          this.dataSource.data = []
          this.showBranch();
        });
      }
    });
  }

  // getshopowner() {
  //   this.apiService.retriveData("/admins/adminregister").then(firstname => {
  //     console.log(firstname)
  //     this.shopowner = firstname
  //     console.log(this.shopowner)
  //   })
  // }

  getshopowner() {
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
  image: FormGroup;
  dataPassing = new FormData()
  imagepath: any;
  newimagepath: any;
  imagename: any;

  @ViewChild("f") f;
  loading: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;


  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public apiService: ApiService, public formBuilder: FormBuilder, public pop: PopupComponent, public sbar: MatSnackBar, ) {

    // this.form.value.cid = this.data.values;
    this.tmpData = this.data;
    console.log(this.tmpData);

    this.image = formBuilder.group({
      img: [null]
    })
  }

  onFileChge() {


    this.dataPassing.append("img", this.f.nativeElement.files[0], this.f.nativeElement.files[0]['name'])
    console.log(this.dataPassing);
    this.imagename = this.f.nativeElement.files[0]['name']
    console.log(this.imagename);
    let d = {
      shop_logo: this.imagename
    }
    Object.assign(this.tmpData.cData, d)
    this.apiService.updateData('/branchs/branch/' + this.tmpData.values._id, this.tmpData.cData).then(d => {
      console.log(this.tmpData.cData)
      this.pop.snakbar('Branch Updated', 'Successfully');
      console.log(d);

    });



  }


  onNoClick() {
    this.data.values = this.tmpData;
    console.log(this.data);
    this.dialogRef.close();

  }
}
