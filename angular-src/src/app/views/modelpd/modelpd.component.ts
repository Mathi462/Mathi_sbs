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
  selector: 'app-modelpd',
  templateUrl: './modelpd.component.html',

})

export class ModelpdComponent implements OnInit {
  
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
  brand_name : any;
  dataSource: any;

  displayedColumns: string[] = ['ModelName','Status', 'edit','delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public apiService: ApiService ,
     public dialog: MatDialog,
      public nav: DefaultLayoutComponent ,
      public sbar: MatSnackBar,
      public pop: PopupComponent,
      public formBuilder: FormBuilder) {
        this.showModelpd();
        this.getBrand()
       }

       
  ngOnInit() {
    this.form = this.formBuilder.group({
      
      // ModelID:['',Validators.required],
      
      ModelName:['',Validators.required],
      Status:['',Validators.required],
      BrandId:['']

     
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
      this.modelpdRegister();
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

  modelpdRegister() {
    this.apiService.getData('/modelpds/modelpd', JSON.stringify(this.form.value)).then(d => {
      this.result = d;
      console.log(this.result);

      if ( this.result.success === true) {
        this.pop.snakbar('Model Added', 'Successfully');

      } else {
      //  this.pop.snakbar('Model Register', 'Failed');
        this.pop.snakbar('Model ID or Name is Already Exists', 'Failed');

      //  alert('Model Id or Name is Already Exists');
      }
    //   this.registerForm.reset();
    
      this.showModelpd();
    });
  }



  showModelpd() {
    this.apiService.retriveData('/modelpds/modelpd').then(displayModelpd => {
      this.display = displayModelpd;
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
  
  deleteModelpd(value) {
    console.log(value);
    this.apiService.deleteData('/modelpds/modelpd/' + value).then(del => {
      this.delete = del;
      this.pop.snakbar('Model Deleted', 'Successfully');
      this.showModelpd();

    });
  }

  getBrand() {
    this.apiService.retriveData("/brands/brand").then(brand => {
    //  console.log(brand)
      this.brand_name = brand
     console.log(this.brand_name)
    })
  }

  openDialog(value): void {
    console.log(value);
    this.nav.sidebarMinimized = false;
    const cData = {
                 
      // ModelID: value.ModelID,
      // ModelNum: value.ModelNum,
      ModelName: value.ModelName,
      Status: value.Status

     
      
    };
    this.defRef = this.dialog.open(DialogContentExampleDialog, {
      width: '500px',
      data: { values: value, cData: cData }
    });

    this.defRef.afterClosed().subscribe(result => {
      if (result != null) {
        console.log(result.values._id);
        this.apiService.updateData('/modelpds/modelpd/' + result.values._id, result.cData).then(d => {
          this.pop.snakbar('Model Updated', 'Successfully');
          console.log(d);
          this.showModelpd();
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
