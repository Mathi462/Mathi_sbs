import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, PageEvent, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { PopupComponent } from '../popup/popup.component';


export interface DialogData {
  arr1: any;
  values: any;

}
@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']

})
export class GradeComponent implements OnInit {
  

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
  form: FormGroup;

  dataSource: any;

  displayedColumns: string[] = ['gid', 'gradeName','edit','delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public apiService: ApiService,
     public dialog: MatDialog, public sbar: MatSnackBar,
     private formBuilder: FormBuilder,
    public pop: PopupComponent) {
    this.showGrade();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      gid: ['', Validators.required],
      gradeName: ['', Validators.required]
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
      this.gradeRegister();
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


  gradeRegister() {
    this.apiService.getData('/grades/addGrade', JSON.stringify(this.form.value)).then(d => {
      this.result = d;
      console.log(this.result);
      if (this.result.success === true) {
        this.pop.snakbar('Grade Added', 'Successfully');
      } else {
        alert('Grade Id or Name Already Exists');
        this.pop.snakbar('Grade Added', 'Failed');
      }
      this.showGrade();
    });
  }


  showGrade() {
    this.apiService.retriveData('/grades/addGrade').then(displayGrade => {
      this.display = displayGrade;
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


  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  // }
  // onPageChanged(e) {
  //   const firstCut = e.pageIndex * e.pageSize;
  //   const secondCut = firstCut + e.pageSize;
  //   this.display1 = this.display.slice(firstCut, secondCut);
  // }


  deleteGrade(value) {
    console.log(value);
    this.apiService.deleteData('/grades/addGrade/' + value).then(del => {
      this.delete = del;
      this.pop.snakbar('Grade Deleted', 'Successfully');
      this.showGrade();
    });
  }



  openDialog(value): void {
    console.log(value);

    const cData = {
      gid: value.gid,
      gradeName: value.gradeName
    };
    this.defRef = this.dialog.open(DialogContentExampleDialog, {
      width: '500px',
      data: { values: value, cData: cData }
    });

    this.defRef.afterClosed().subscribe(result => {
      if (result != null) {
        console.log(result.values._id);
        this.apiService.updateData('/grades/addGrade/' + result.values._id, result.cData).then(d => {
          console.log(d);
          this.pop.snakbar('Grade Updated', 'Successfully');
          this.showGrade();
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
    console.log(this.tmpData);
  }

  onNoClick() {
    this.data.values = this.tmpData;
    console.log(this.data);
    this.dialogRef.close();

  }
}

