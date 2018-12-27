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
    selector: 'app-view-asse',
    templateUrl: './view-asse.component.html',

})
export class ViewasseComponent implements OnInit {
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

    displayedColumns: string[] = ['brand_name',  'category_type','model_name', 'quantity', 'sp', 'cp', 'stock_status', 'branch', 'edit', 'delete'];

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;




    constructor(public apiService: ApiService,
        public sbar: MatSnackBar,
        public dialog: MatDialog,
        public nav: DefaultLayoutComponent,
        public pop: PopupComponent,
        private formBuilder: FormBuilder,
        public ngZone: NgZone,
        public router: Router
    ) {
        this.showAsse();

    }
    ngOnInit() {
        

    }
    showAsse() {
        this.apiService.retriveData('/asses/asse').then(displayAsse => {
            this.display = displayAsse;
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
    deleteAsse(value) {
        console.log(value);
        this.apiService.deleteData('/asses/asse/' + value).then(del => {
            this.delete = del;
            this.pop.snakbar('Accessories Deleted', 'Successfully');
            this.showAsse();
        });
    }

    openDialog(value): void {
        console.log(value);
        this.nav.sidebarMinimized = false;
        const cData = {

            brand_name: value.brand_name,
            model_name: value.model_name,
            category_type: value.category_type,
           
        
            color: value.color,
            quantity: value.quantity,
            add_barcode: value.add_barcode,
          
            dp: value.dp,
            lp: value.lp,
            sp: value.sp,
            cp: value.cp,
            stock_status: value.stock_status,
            cgst: value.cgst,
            sgst: value.sgst,
            branch: value.branch,
            // add_date: value.add_date,
            remarks: value.remarks,
            productdetails: value.productdetails
        };
        localStorage.setItem("data" , JSON.stringify(value))
        this.ngZone.run(()=>{
          this.router.navigateByUrl('asse/updateasse')
        })
        // this.defRef.afterClosed().subscribe(result => {
        //     // if (result != null) {
        //     //     console.log(result.values._id);
        //     //     this.apiService.updateData('/stocks/stock/' + result.values._id, result.cData).then(d => {
        //     //         this.pop.snakbar('Stocks Updated', 'Successfully');
        //     //         console.log(d);
        //     //         this.showStock();
        //     //     });
        //     // }
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
    getupdatestacks() {
        this.apiService.retriveData('/asses/asse').then(displaySalereturn => {
            this.displayC = displaySalereturn;
            //console.log(this.displayC);
        });
    }
}
