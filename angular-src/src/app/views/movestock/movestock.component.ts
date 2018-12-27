import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatSnackBar, MatSort, MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DefaultLayoutComponent } from '../../containers';
import { PopupComponent } from '../popup/popup.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';


// export interface DialogData {
//   idPassing: any;
// }

export interface PeriodicElement {
  idPassing: any;
  branchPassing: any;


}


@Component({
  selector: 'app-movestock',
  templateUrl: './movestock.component.html',
  styleUrls: ['./movestock.component.scss']
})
export class MovestockComponent implements OnInit {
  bname1: any = [];
  display: any;
  idPassing: any;

  newData: any = [];
  fromBranch: any;
  getId: any;
  // branchPassing:any;
  toBranch : any;
  category_type: any = [{}];
  branch: any;
  display1: any;
  display2: any;
  display3: any = [];
  displayC: any;
  type: any;
  selection: any;
  form: FormGroup;
  stockSend: any;
  displayStock: any;
  dataSource: any;
  dataSource1: any;

  displayedColumns: string[] = ['select', 'add_barcode', 'brand_name', 'model_name', 'category_type', 'sp', 'cp', 'stock_status', 'branch'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public apiService: ApiService,
    public dialog: MatDialog,
    public nav: DefaultLayoutComponent,
    public sbar: MatSnackBar,
    public pop: PopupComponent,
    public formBuilder: FormBuilder,


  ) {

    this.showAllStock();
    this.showCategory();
    this.getBranch();

    this.selection = new SelectionModel<PeriodicElement>(true);
    this.form = this.formBuilder.group({
      branch: ['', Validators.required],
    })
  }

  ngOnInit() {
  }



  showAllStock() {
    this.apiService.retriveData('/all_in_one_stocks/stock').then(displayStock => {
      this.display3 = displayStock;
      console.log(this.display3)
      this.dataSource1 = new MatTableDataSource(this.display3);
      console.log(this.dataSource1);
      this.dataSource1.sort = this.sort;
      this.dataSource1.paginator = this.paginator;
    });
  }


  applyFilter(filterValue: string) {
    console.log(filterValue)
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }
  showCategory() {
    this.apiService.retriveData('/categorys/category').then(displayCategory => {
      this.type = displayCategory;

    });
  }

  getBranch() {
    this.apiService.retriveData("/all_login_users/adminregister").then(bname => {

      this.branch = bname
      console.log(this.branch)

      for (let i = 0; i < this.branch.length; i++) {
        if (this.branch[i].user_type === 'branch') {

          this.bname1.push(this.branch[i])
        }
      }
      console.log(this.bname1)
    })
  }

  Ctypes: any;
  typeCall(event) {
    console.log(event)
    this.applyFilter(event)
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(row => this.selection.select(row));
  }

  // isFieldInvalid(field: string) {
  //   return (
  //     (!this.form.get(field).valid && this.form.get(field).touched) ||
  //     (this.form.get(field).untouched && this.form)
  //   );
  // }

  getStock() {
    console.log(this.getId);
    this.apiService.retriveData('/all_in_one_stocks/stock/' + this.getId).then(displayStocks => {
      this.displayStock = displayStocks;
      this.fromBranch = this.displayStock.branch;
      console.log(this.displayStock.branch);

      console.log(this.displayStock.productdetails.length);
      console.log(this.displayStock.productdetails)

      // for (let i = 0; i < this.displayStock.productdetails.length; i++) {
      //   if (this.displayStock.productdetails[i].stock_visible === 'yes') {
      //     //  console.log(this.displayStock.productdetails[i].stock_visiable)
      //     //  console.log(this.displayStock.productdetails[i])

      //     this.newData.push(this.displayStock.productdetails[i]);

      //     // this.dataSource = new MatTableDataSource(this.displayStock.productdetails[i]);
      //   }

      // }
      //  console.log(this.newData);
      this.dataSource = new MatTableDataSource(this.newData);
      // console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  onSubmit() {

    console.log(this.selection)

    let ids = [];
    for(let i  in this.selection.selected) {
      ids.push(this.selection.selected[i].add_barcode)
    }
    let data = {
      barCode : ids,
      toBranch : this.toBranch
    }
    console.log("########" , data)
    // let data = {
    //   from_branch: this.displayStock.branch,
    //   to_branch: this.form.value.branch,
    //   model_name: this.displayStock.model_name,
    //   brand_name: this.displayStock.brand_name,
    //   category_type: this.displayStock.category_type,
    //   ManufacturerName: this.displayStock.ManufacturerName,
    //   dp: this.displayStock.dp,
    //   lp: this.displayStock.lp,
    //   sp: this.displayStock.sp,
    //   cp: this.displayStock.cp,
    //   cgst: this.displayStock.cgst,
    //   sgst: this.displayStock.sgst, 
    //   add_barcode:this.displayStock.add_barcode,
    //   imei1:this.displayStock.imei1,
    //   imei2:this.displayStock.imei2,
    //   battery_no:this.displayStock.battery_no,
    //   color:this.displayStock.color,
    //   quantity:this.displayStock.quantity 



    //      }

    // console.log(data);
    // this.apiService.getData("/movestocks/movestock", data).then(dataSend => {
    //   this.stockSend = dataSend
    //   console.log(this.stockSend);
    //   this.pop.snakbar('Stock Moved', 'Successfully');
    //   // this.router.navigateByUrl('/movestock');

    // });
    this.apiService.updateData('/all_in_one_stocks/updateBranch' ,  data).then(d => {
      console.log(d)
    })
    console.log(this.selection.selected.length)
    let id = this.selection.selected;
    console.log(this.getId)

    for (let j = 0; j < this.selection.selected.length; j++) {
      console.log(id[j]._id)
      let stockUpdateVisible = {
        prodId: id[j]._id,
        stock_visible: 'no'
      }
      console.log(stockUpdateVisible)

      this.apiService.updateData('/stocks/updatevisible/' + this.getId, stockUpdateVisible).then(dataVisible => {
        console.log(dataVisible);
      })
    }

  }


  openDialog(value) {
    this.idPassing = value;
    // console.log(value);
    const dialogRef = this.dialog.open(DialogDataExampleDialog, {
      width: 'auto',
      data: { idPassing: this.idPassing }

    });

    dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');

    });
  }


}



@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {

  getId: any;
  displayStock: any;
  branch: any;
  selection: any;
  dataSource: any;
  form: FormGroup;
  stockSend: any;



  constructor(
    public dialogRef: MatDialogRef<DialogDataExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement, private formBuilder: FormBuilder, public apiService: ApiService, public dialog: MatDialog, public pop: PopupComponent, public router: Router) {
    console.log(data);
    this.getId = data.idPassing;
    // console.log(this.getId)
    this.getStock();
    this.getBranch();

    this.selection = new SelectionModel<PeriodicElement>(true, []);

    this.form = this.formBuilder.group({
      branch: ['', Validators.required],
    });
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  newData: any = [];
  fromBranch: any;

  getStock() {
    console.log(this.getId);
    this.apiService.retriveData('/all_in_one_stocks/stock/' + this.getId).then(displayStocks => {
      this.displayStock = displayStocks;
      this.fromBranch = this.displayStock.branch;
      console.log(this.displayStock.branch);

      console.log(this.displayStock.productdetails.length);
      console.log(this.displayStock.productdetails)

      // for (let i = 0; i < this.displayStock.productdetails.length; i++) {
      //   if (this.displayStock.productdetails[i].stock_visible === 'yes') {
      //     //  console.log(this.displayStock.productdetails[i].stock_visiable)
      //     //  console.log(this.displayStock.productdetails[i])

      //     this.newData.push(this.displayStock.productdetails[i]);

      //     // this.dataSource = new MatTableDataSource(this.displayStock.productdetails[i]);
      //   }

      // }
      //  console.log(this.newData);
      this.dataSource = new MatTableDataSource(this.newData);
      // console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.form)
    );
  }

  getBranch() {
    this.apiService.retriveData("/branchs/branch").then(branch => {
      this.branch = branch
      console.log(this.branch)
    })
  }




  totalId: any = [];


  onSubmit() {
    console.log(this.selection);
    console.log(this.selection.selected);
    console.log(this.displayStock)
    console.log(this.form.value)
    let data = {
      from_branch: this.displayStock.branch,
      to_branch: this.form.value.branch,
      model_name: this.displayStock.model_name,
      brand_name: this.displayStock.brand_name,
      category_type: this.displayStock.category_type,
      ManufacturerName: this.displayStock.ManufacturerName,
      dp: this.displayStock.dp,
      lp: this.displayStock.lp,
      sp: this.displayStock.sp,
      cp: this.displayStock.cp,
      cgst: this.displayStock.cgst,
      sgst: this.displayStock.sgst,
      add_barcode: this.displayStock.add_barcode,
      imei1: this.displayStock.imei1,
      imei2: this.displayStock.imei2,
      battery_no: this.displayStock.battery_no,
      color: this.displayStock.color,
      quantity: this.displayStock.quantity



    }

    console.log(data);
    this.apiService.getData("/movestocks/movestock", data).then(dataSend => {
      this.stockSend = dataSend
      console.log(this.stockSend);
      this.pop.snakbar('Stock Moved', 'Successfully');
      // this.router.navigateByUrl('/movestock');
      this.onNoClick();
    });

    console.log(this.selection.selected.length)
    let id = this.selection.selected;
    console.log(this.getId)

    for (let j = 0; j < this.selection.selected.length; j++) {
      console.log(id[j]._id)
      let stockUpdateVisible = {
        prodId: id[j]._id,
        stock_visible: 'no'
      }
      console.log(stockUpdateVisible)

      this.apiService.updateData('/stocks/updatevisible/' + this.getId, stockUpdateVisible).then(dataVisible => {
        console.log(dataVisible);
      })

    }
    // this.totalId = id[0]._id;




  }



  onNoClick() {
    this.dialogRef.close();
  }



}
