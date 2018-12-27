import { Component, OnInit, Inject, ViewChild, NgZone } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgForm, NgModel, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, PageEvent, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DefaultLayoutComponent } from '../../containers';
import { PopUP } from '../hero';
import { PopupComponent } from '../popup/popup.component';
import { Router } from '@angular/router';
// import * as jspdf from 'jspdf';  
// import html2canvas from 'html2canvas'; 



export interface DialogData {
  arr1: any;
  values: any;
}

@Component({
  selector: 'app-salereturn',
  templateUrl: './salereturn.component.html',

})
export class SalereturnComponent implements OnInit {
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

  displayedColumns: string[] = ['invoice', 'orderdate', 'custmername','custmerphone','paymentstatus','edit','delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public apiService: ApiService,
    public sbar: MatSnackBar,
    public dialog: MatDialog,
    public nav: DefaultLayoutComponent ,
    public pop: PopupComponent,
    private formBuilder: FormBuilder,
    public ngZone : NgZone,
    public router : Router) {
      this.showaddorder();
     
  }
  // cnvrtToPdf() {
  //   var data = document.getElementById('toPdf');  
  //   html2canvas(data).then(canvas => {  
  //     // Few necessary setting options  
  //     var imgWidth = 208;   
  //     var pageHeight = 295;    
  //     var imgHeight = canvas.height * imgWidth / canvas.width;  
  //     var heightLeft = imgHeight;  
  
  //     const contentDataURL = canvas.toDataURL('image/png')  
  //     let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
  //     var position = 0;  
  //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
  //     pdf.save('MYPdf.pdf'); // Generated PDF   
  //   });  
  // }
  ngOnInit() {

  }

  showaddorder() {
    this.apiService.retriveData('/addorders/addorder/').then(displayAddorder => {
      this.display = displayAddorder;
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

  deleteAddorder(value) {
    console.log(value);
    this.apiService.deleteData('/addorders/addorder/' + value).then(del => {
      this.delete = del;
      this.pop.snakbar('Invoice details Deleted', 'Successfully');
      this.showaddorder();
    });
  }


  openDialog(value): void {
    console.log(value);
    this.nav.sidebarMinimized = false;
    this.cData = {
      invoice: value.invoice,
      orderdate: value.orderdate,
      orderid: value.orderid,
      custmername: value.custmername,
      custmeraddress: value.custmeraddress,
      custmerphone: value.custmerphone,
      branchid: value.branchid,
      subtotal: value.subtotal,
      cgst: value.cgst,
      sgst: value.sgst,
      totalamount: value.totalamount,
      discount:value.discount,
      grandtotal:value.grandtotal,
      paid:value.paid,
      balance:value.balance,
      paymentstatus:value.paymentstatus,
      productdetails:value.productdetails
    };
    localStorage.setItem("data" , JSON.stringify(this.cData))
    this.ngZone.run(()=>{
      this.router.navigateByUrl('/editreturn')
    })
    // this.defRef.afterClosed().subscribe(result => {
    //   if (result != null) {
    //     console.log(result.values._id);
    //     this.apiService.updateData('/addorders/addorder/' + result.values._id, result.cData).then(d => {
    //       this.pop.snakbar('INVOICE  Updated ', 'Successfully');
    //       console.log(d);
    //       this.showaddorder();
    //     });
    //   }
    // });


  }




}



@Component({

  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  // styleUrls: ['./salereturn.scss']
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
  getSalereturn() {
    this.apiService.retriveData('/addorders/addorder').then(displaySalereturn => {
      this.displayC = displaySalereturn;
     // console.log(this.displayC);
    });
  }
}

