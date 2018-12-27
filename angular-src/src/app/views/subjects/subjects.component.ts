import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PopupComponent } from '../popup/popup.component';


export interface DialogData {
  arr1: any;
  values: any;

}

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']

})
export class SubjectsComponent implements OnInit {
  arr: {};
  result: any;
  display: any;
  delete: {};
  arr1: any;
  cData: any;
  defRef: any;
  form: FormGroup;

  dataSource: any;

  displayedColumns: string[] = ['sid', 'subjectName','edit','delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public apiService: ApiService,
    private formBuilder: FormBuilder, public dialog: MatDialog, public sbar: MatSnackBar,
    public pop: PopupComponent) {
    this.showSubject();
   
  }

  ngOnInit() {
 
    this.form = this.formBuilder.group({
      sid: ['', Validators.required],
      subjectName: ['', Validators.required],
     
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
      this.subjectRegister();
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

  subjectRegister() {
    this.apiService.getData('/subjects/addSubject', JSON.stringify(this.form.value)).then(d => {
      this.result = d;
      console.log(this.result);
      if (this.result.success === true) {
        this.pop.snakbar('Subject Added', 'Successfully');
      } else {
        alert('Subject Id or Name Already Exists');
        this.pop.snakbar('Subject Added', 'Failed');
      }
      this.showSubject();
    });
  }


  showSubject() {
    this.apiService.retriveData('/subjects/addSubject').then(displaySubject => {
      this.display = displaySubject;
      console.log(this.display);
      this.dataSource = new MatTableDataSource(this.display);
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  deleteSubject(value) {
    console.log(value);
    this.apiService.deleteData('/subjects/addSubject/' + value).then(del => {
      this.delete = del;
      this.pop.snakbar('Subject Deleted', 'Successfully');
      this.showSubject();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(value): void {
    console.log(value);

    const cData = {
      sid: value.sid,
      subjectName: value.subjectName
    };
    this.defRef = this.dialog.open(DialogContentExampleDialog, {
      width: '500px',
      data: { values: value, cData: cData }
    });

    this.defRef.afterClosed().subscribe(result => {
      if (result != null) {
        console.log(result.values._id);
        this.apiService.updateData('/subjects/addSubject/' + result.values._id, result.cData).then(d => {
          console.log(d);
          this.pop.snakbar('Subject Updated', 'Successfully');
          this.showSubject();
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


    this.tmpData = this.data;
    console.log(this.tmpData);
  }

  onNoClick() {
    this.data.values = this.tmpData;
    console.log(this.data);
    this.dialogRef.close();

  }
}

