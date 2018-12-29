import { Component, OnInit, Inject, ViewChild, NgZone } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgForm, NgModel, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, PageEvent, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DefaultLayoutComponent } from '../../containers';
import { PopUP } from '../hero';
import { PopupComponent } from '../popup/popup.component';
import { Router } from '@angular/router';
import { diPublic } from '@angular/core/src/render3/di';
// import * as jspdf from 'jspdf';  
// import html2canvas from 'html2canvas'; 


export interface DialogData {
    arr1: any;
    values: any;
}
@Component({
    selector: 'app-view-stock',
    templateUrl: './view-stock.component.html',

})
export class ViewStockComponent implements OnInit {
    result: any;
    display: any;
    delete: {};
    arr1: any;
    cData: any;
    defRef: any;
    type:any;
    length: any;
    pageSize = 4;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    pageEvent: PageEvent;
    display1: any;
    display2:any;
    display3 :any=  []  ;
    displayC: any;
    dataSource: any;
    dataSource1:any;
    brand_name:any;
    model_name:any=[];

    displayedColumns: string[] = ['add_barcode','brand_name', 'model_name', 'category_type', 'quantity', 'sp', 'cp', 'stock_status', 'branch', 'edit', 'delete'];

    

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
        
        this.showAllStock();
        this.showCategory();
    }
    ngOnInit() {

    }
    
    

    showAllStock() {
        this.apiService.retriveData('/all_in_one_stocks/stock').then(displayStock => {
            this.display3 = displayStock;
            console.log(this.display3)
            console.log(this.display3[0].brand_name.BrandName)
            this.dataSource1 = new MatTableDataSource(this.display3);
            console.log(this.dataSource1);
            this.dataSource1.sort = this.sort;
            this.dataSource1.paginator = this.paginator;
        });
    }


    callModel(value){
        console.log(value)

    }
    applyFilter(filterValue: string) {
        this.dataSource1.filter = filterValue.trim().toLowerCase();
    }
    deleteAllStock(value) {
        console.log(value);
        this.apiService.deleteData('/all_in_one_stocks/stock/' + value).then(del => {
            this.delete = del;
            this.pop.snakbar('Stocks Deleted', 'Successfully');
            this.showAllStock();
        });
    }
    openDialog1(value):void
    {
        console.log(value);
        this.nav.sidebarMinimized=false;
        const cData={
            _id:value._id,
            add_barcode:value.add_barcode,
            battery_no:value.battery_no,
            branch:value.branch,
            brand_name:value.brand_name._id,
            category_type:value.category_type,
            cgst:value.cgst,
            color:value.color,
            cp:value.cp,
            dp:value.dp,
            otherno:value.otherno,
            typeon:value.typeon,
            imei1:value.imei1,
            imei2:value.imei2,
            lp:value.lp,
            model_name:value.model_name._id,
            quantity:value.quantity,
            remarks:value.remarks,
            sgst:value.sgst,
            sp:value.sp,
            stock_status:value.stock_status,
            ManufacturerName:value.ManufacturerName




        };
        console.log(cData)
        localStorage.setItem("data",JSON.stringify(cData))
        this.ngZone.run(()=>{
                 this.router.navigateByUrl('/stock/updatestock')
        })
     
    }
    showCategory() {
        this.apiService.retriveData('/categorys/category').then(displayCategory => {
          this.type = displayCategory;
          
        });
      }
      Ctypes:any;
      typeCall(event){
          console.log(event)
          this.applyFilter(event)
      }
    }