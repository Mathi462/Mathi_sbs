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
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',

})

export class CurriculumComponent implements OnInit {
  
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

  displayedColumns: string[] = ['bname', 'sname','edit','delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public apiService: ApiService ,
     public dialog: MatDialog,
      public nav: DefaultLayoutComponent ,
      public sbar: MatSnackBar,
      public pop: PopupComponent,
      public formBuilder: FormBuilder) {
        this.showCurriculum();
       }

       
  ngOnInit() {
    this.form = this.formBuilder.group({
      
      bname:['',Validators.required],
      sname:['',Validators.required],
      address:['',Validators.required],
      gst_num:['',Validators.required],
      shop_logo:['',Validators.required],
      pan_num:['',Validators.required],
      phone1:['',Validators.required],
      phone2:['',Validators.required],
      email:['',Validators.required],
      b_id:['',Validators.required],
      shop_num:['',Validators.required],
      manager_name:['',Validators.required]
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
      this.curriculumRegister();
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

  curriculumRegister() {
    this.apiService.getData('/branchs/branch', JSON.stringify(this.form.value)).then(d => {
      this.result = d;
      console.log(this.result);

      if ( this.result.success === true) {
        this.pop.snakbar('Curriculum Added', 'Successfully');

      } else {
      //  this.pop.snakbar('Curriculum Register', 'Failed');
        this.pop.snakbar('Curriculum ID or Name is Already Exists', 'Failed');

      //  alert('Curriculum Id or Name is Already Exists');
      }
    //   this.registerForm.reset();
    
      this.showCurriculum();
    });
  }



  showCurriculum() {
    this.apiService.retriveData('/branchs/branch').then(displayCurriculum => {
      this.display = displayCurriculum;
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
  
  deleteCurriculum(value) {
    console.log(value);
    this.apiService.deleteData('/branchs/branch/' + value).then(del => {
      this.delete = del;
      this.pop.snakbar('Curriculum Deleted', 'Successfully');
      this.showCurriculum();

    });
  }



  openDialog(value): void {
    console.log(value);
    this.nav.sidebarMinimized = false;
    const cData = {
      bname: value.bname,
      sname: value.sname,
      address: value.address,
      gst_num: value.gst_num,
      shop_logo: value.shop_logo,
      pan_num: value.pan_num,
      phone1: value.phone1,
      phone2: value.phone2,
      email: value.email,
      b_id: value.b_id,
      shop_num: value.shop_num,
      manager_name: value.manager_name
    };
    this.defRef = this.dialog.open(DialogContentExampleDialog, {
      width: '500px',
      data: { values: value, cData: cData }
    });

    this.defRef.afterClosed().subscribe(result => {
      if (result != null) {
        console.log(result.values._id);
        this.apiService.updateData('/branchs/branch/' + result.values._id, result.cData).then(d => {
          this.pop.snakbar('Curriculum Updated', 'Successfully');
          console.log(d);
          this.showCurriculum();
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
