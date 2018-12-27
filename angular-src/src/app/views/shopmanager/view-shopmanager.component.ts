
import { ApiService } from '../../services/api.service';
import { PageEvent, MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { PopupComponent } from '../popup/popup.component';

import { DefaultLayoutComponent } from '../../containers';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';


export interface DialogData {
  arr1: any;
  values: any;
}

@Component({
  selector: 'app-view-shopmanager',
  templateUrl: './view-shopmanager.component.html',

})
export class ViewShopmanagerComponent implements OnInit {
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

  displayedColumns: string[] = ['id','name','dob', 'email', 'phone','address','pancard', 'aadhaarcard','edit','delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  

  constructor(public apiService: ApiService,
    public sbar: MatSnackBar,
    public dialog: MatDialog,
    public nav: DefaultLayoutComponent ,
    public pop: PopupComponent,
    private formBuilder: FormBuilder) {
      this.showFaculty();

  }

  ngOnInit() {

  }

  showFaculty() {
    this.apiService.retriveData('/sales_managers/salesmanager').then(displayFaculty => {
      this.display = displayFaculty;
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

  deleteFaculty(value) {
    console.log(value);
    this.apiService.deleteData('/sales_managers/salesmanager/' + value).then(del => {
      this.delete = del;
      this.pop.snakbar('salesperson Deleted', 'Successfully');
      this.showFaculty();
    });
  }

  openDialog(value): void {
    console.log(value);
    this.nav.sidebarMinimized = false;
    const cData = {
 
      id: value.id,           
      name: value.name,
      dob: value.dob,
      email: value.email,
      // password: value.password,
      phone: value.phone,
      address: value.address,
      pancard: value.pancard,
      aadhaarcard: value.aadhaarcard,
      driving_license: value.driving_license,
      previous_employment: value.previous_employment,
      previous_employment_address: value.previous_employment_address,
      previous_employment_mobile: value.previous_employment_mobile
    };
    this.defRef = this.dialog.open(DialogContentExampleDialog, {
       width: '500px',
      data: { values: value, cData: cData }
    });

    this.defRef.afterClosed().subscribe(result => {
      if (result != null) {
        console.log(result.values._id);
        this.apiService.updateData('/sales_managers/salesmanager/' + result.values._id, result.cData).then(d => {
          this.pop.snakbar('salesperson Updated', 'Successfully');
          console.log(d);
          this.showFaculty();
        });
      }
    });


  }




}



@Component({

  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrls: ['./shopmanager.scss']
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
 
}

