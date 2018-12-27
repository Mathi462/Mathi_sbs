import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators, ReactiveFormsModule, FormControl  } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { PageEvent, MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { PopupComponent } from '../popup/popup.component';

import { DefaultLayoutComponent } from '../../containers';


export interface DialogData {
  arr1: any;
  values: any;
}

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',

})
export class ViewStudentComponent implements OnInit {
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
  displayC: any;
  dataSource: any;

  displayedColumns: string[] = ['username', 'email', 'mobile','address','curriculum','grade','subjects','faculty_name','edit','delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public apiService: ApiService,
    public sbar: MatSnackBar,
    public dialog: MatDialog,
    public nav: DefaultLayoutComponent ,
    public pop: PopupComponent,
    private formBuilder: FormBuilder) {
      this.showStudent();

  }

  ngOnInit() {

  }

  showStudent() {
    this.apiService.retriveData('/students/studentregister/').then(displayStudent => {
      this.display = displayStudent;
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

  deleteStudent(value) {
    console.log(value);
    this.apiService.deleteData('/students/studentregister/' + value).then(del => {
      this.delete = del;
      this.pop.snakbar('Student Deleted', 'Successfully');
      this.showStudent();
    });
  }

  openDialog(value): void {
    console.log(value);
    this.nav.sidebarMinimized = false;
    const cData = {
      firstname: value.firstname,
      lastname: value.lastname,
      username: value.username,
      email: value.email,
      password: value.password,
      address: value.address,
      mobile: value.mobile,
      curriculum: value.curriculum,
      grade: value.grade,
      subjects: value.subjects
    };
    this.defRef = this.dialog.open(DialogContentExampleDialog, {
       width: '500px',
      data: { values: value, cData: cData }
    });

    this.defRef.afterClosed().subscribe(result => {
      if (result != null) {
        console.log(result.values._id);
        this.apiService.updateData('/students/studentregister/' + result.values._id, result.cData).then(d => {
          this.pop.snakbar('Student Updated', 'Successfully');
          console.log(d);
          this.showStudent();
        });
      }
    });


  }




}



@Component({

  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrls: ['./student.scss']
})

// tslint:disable-next-line:component-class-suffix
export class DialogContentExampleDialog {
  result: any;
  tmpData: any;
  displayC: any;

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
  getCurriculum() {
    this.apiService.retriveData('/curriculums/addCurriculum').then(displayCurriculum => {
      this.displayC = displayCurriculum;
     // console.log(this.displayC);
    });
  }
}

