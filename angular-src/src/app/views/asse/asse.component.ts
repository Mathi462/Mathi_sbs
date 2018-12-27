import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgForm, NgModel, FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, PageEvent, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DefaultLayoutComponent } from '../../containers';
import { PopUP } from '../hero';
import { PopupComponent } from '../popup/popup.component';




export interface DialogData {
  arr1: any;
  values: any;
}


@Component({
  selector: 'app-asse',
  templateUrl: './asse.component.html',

})

export class AsseComponent implements OnInit {
  category_type: any;
  bname1:any=[];
  color: any;
  quantity: any;
  branch: any;
  cgst: any;
  sgst: any;
  brand_name: any;
  model_name: any;
  dp: any;
  lp: any;
  cp: any;
  sp: any;
  stock_status: any;
  remarks: any;
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
  para: any;
  billrec: any;
  // params: FormGroup;
  params: FormGroup;
  printSection: any = [];


  dataSource: any;

  displayedColumns: string[] = ['brand_name', 'model_name', 'category_type', 'quantity', 'sp', 'cp', 'stock_status', 'branch', 'edit', 'delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public apiService: ApiService,
    public dialog: MatDialog,
    public nav: DefaultLayoutComponent,
    public sbar: MatSnackBar,
    public pop: PopupComponent,
    public formBuilder: FormBuilder) {
    this.showAsse();
    this.getCategory();
   
    this.getBranch();
    this.getCGst();
    this.getSGst();
    this.getColor();
    this.getBrand();
   


    console.log(Date.now())
    this.params = formBuilder.group({
      prod: formBuilder.array([
        this.getProd()
      ])
    })

  }

  br: any;
  bn: any;
  mn: any;
  ct: any;
  mna: any;
  qt: any;
  d: any;
  l: any;
  s: any;
  c: any;
  cg: any;
  sg: any;
  ss: any;
  rm: any;





  ngOnInit() {
    const myFormValueChanges$ = this.params.controls['prod'].valueChanges;
    myFormValueChanges$.subscribe(prod => this.updateTotalUnitPrice(prod));

    this.para = localStorage.getItem("data");
    this.form = this.formBuilder.group({
      branch: [''],
      brand_name: [''],
      model_name: [''],
      category_type: [''],
     
       
      color: [''],
      quantity: [''],

      // other_num: [''],
      // type: [''],
      dp: [''],
      lp: [''],
      sp: [''],
      cp: [''],
      stock_status: [''],
      cgst: [''],
      sgst: [''],
      remarks: ['']
    });
    this.form.get('branch').valueChanges.subscribe(
      value => {
        this.br = value
       
      }
    )

    this.form.get('brand_name').valueChanges.subscribe(
      value => {
        this.bn = value

      }
    )

    this.form.get('model_name').valueChanges.subscribe(
      value => {
        this.mn = value

      }
    )

    this.form.get('category_type').valueChanges.subscribe(
      value => {
        this.ct = value

      }
    )

   

    this.form.get('quantity').valueChanges.subscribe(
      value => {
        this.qt = value

      }
    )
    this.form.get('dp').valueChanges.subscribe(
      value => {
        this.d = value

      }
    )
    this.form.get('lp').valueChanges.subscribe(
      value => {
        this.l = value

      }
    )
    this.form.get('sp').valueChanges.subscribe(
      value => {
        this.s = value

      }
    )
    this.form.get('cp').valueChanges.subscribe(
      value => {
        this.c = value

      }
    )
    this.form.get('cgst').valueChanges.subscribe(
      value => {
        this.cg = value

      }
    )
    this.form.get('sgst').valueChanges.subscribe(
      value => {
        this.sg = value

      }
    )
    this.form.get('stock_status').valueChanges.subscribe(
      value => {
        this.ss = value

      }
    )
    this.form.get('remarks').valueChanges.subscribe(
      value => {
        this.rm = value

      }
    )

    
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

  asseRegister() {
    console.log(this.form.value)
    let data = {
      model_name:this.mn,
      branch: this.br,
      brand_name:this.bn,
      quantity:this.qt,
      dp:this.d,
      lp:this.l,
      sp:this.s,
      cp:this.c,
      stock_status:this.stock_status,
      cgst:this.cg,
      sgst:this.sg,
      remarks:this.rm,
      productdetails : this.params.value.prod
    }
    Object.assign(data , this.form.value)
  
    console.log(data)
    this.apiService.getData('/asses/asse', data).then(Ordersent => {
      this.billrec = Ordersent;
      console.log(this.billrec)
      if (this.billrec.success === true) {
        this.showAsse()
        this.pop.snakbar('Accessories Added', 'Successfully');

      } else {
        //  this.pop.snakbar('Curriculum Register', 'Failed');
        this.pop.snakbar('', 'Failed');

        //  alert('Curriculum Id or Name is Already Exists');
      }
      localStorage.removeItem("data")
    });


    let data1 = {
      model_name:this.mn,
      brand_name:this.bn,
      category_type:this.ct,
      ManufacturerName:'null',
      quantity:this.qt,
      dp:this.d,
      lp:this.l,
      sp:this.s,
      cp:this.c,
      stock_status:this.stock_status,
      cgst:this.cg,
      sgst:this.sg,
      branch: this.br,
      remarks:this.rm,
      productdetails : this.params.value.prod
    }
    Object.assign(data1 , this.form.value)
  
    console.log(data1)

    this.apiService.getData('/all_in_one_stocks/stock', data1).then(Ordersent => {
      this.billrec = Ordersent;
      console.log(this.billrec)
      if (this.billrec.success === true) {
        this.showAsse()
        this.pop.snakbar('Accessories Added', 'Successfully');

      } else {
        //  this.pop.snakbar('Curriculum Register', 'Failed');
        this.pop.snakbar('', 'Failed');

        //  alert('Curriculum Id or Name is Already Exists');
      }
      localStorage.removeItem("data")
    });
  }


  showAsse() {
    this.dataSource = []
    this.apiService.retriveData('/asses/asse').then(displayStock => {
      this.display = displayStock;
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

  addProd() {
    const control = <FormArray>this.params.controls['prod'];
    control.push(this.getProd());
    //  console.log(this.params.value)
  }
  deleteFieldValue(index) {
    const control = <FormArray>this.params.controls['prod'];
    control.removeAt(index);
  }
  public updateTotalUnitPrice(prod: any) {
    this.printSection = []
    for (let i in prod) {
      this.printSection.push({
        add_barcode: prod[i].add_barcode,
        battery_no: prod[i].battery_no,
        color: prod[i].color,
        otherno: prod[i].otherno,
       
        typeon: prod[i].typeon,
       
      })
    }
  }
  getProd() {
    return this.formBuilder.group({
      add_barcode: [''],
      battery_no: [''],
      color: [''],
      otherno: [''],
      typeon: [''],
      stock_visible : 'yes',
      stock_status  : 'instock'

    })
  }



  // openDialog(value): void {
  //   console.log(value);
  //   this.nav.sidebarMinimized = false;
  //   const cData = {


  //     // stockid: value.stockid,
  //     brand_name: value.brand_name,
  //     model_name: value.model_name,
  //     category_type: value.category_type,
  //     ManufacturerName: value.ManufacturerName,
  //     battery_no: value.battery_no,
  //     color: value.color,
  //     quantity: value.quantity,
  //     add_barcode: value.add_barcode,
  //     imei1: value.imei1,
  //     imei2: value.imei2,
  //     dp: value.dp,
  //     lp: value.lp,
  //     sp: value.sp,
  //     cp: value.cp,
  //     stock_status: value.stock_status,
  //     cgst: value.cgst,
  //     sgst: value.sgst,
  //     branch: value.branch,
  //     // add_date: value.add_date,
  //     remarks: value.remarks,
  //     productdetails: this.params.value.prod

  //   };
  //   this.defRef = this.dialog.open(DialogContentExampleDialog, {
  //     width: '500px',
  //     data: { values: value, cData: cData }
  //   });

  //   this.defRef.afterClosed().subscribe(result => {
  //     if (result != null) {
  //       console.log(result.values._id);
  //       this.apiService.updateData('/stocks/stock/' + result.values._id, result.cData).then(d => {
  //         this.pop.snakbar('Stock Updated', 'Successfully');
  //         console.log(d);
  //         this.showStock();
  //       });
  //     }
  //   });
  // }
  getCategory() {
    this.apiService.retriveData("/categorys/category").then(category => {
      console.log(category)
      this.category_type = category
      console.log(this.category_type)
    })
  }

 

  getBranch(){
    this.apiService.retriveData("/all_login_users/adminregister").then(bname => {
     // console.log(branch)
      this.branch = bname
      console.log(this.branch[0].user_type)
     // console.log(this.branchid)
       for (let i = 0; i < this.branch.length; i++) {
        if (this.branch[i].user_type === 'branch') {
          console.log(this.branch[i])
          this.bname1.push(this.branch[i])
        }
      }
    })  
  }
  getCGst() {
    this.apiService.retriveData("/gsts/gst").then(cgst => {
      console.log(cgst)
      this.cgst = cgst
      console.log(this.cgst)
    })
  }

  getSGst() {
    this.apiService.retriveData("/gsts/gst").then(sgst => {
      console.log(sgst)
      this.sgst = sgst
      console.log(this.sgst)
    })
  }

  getColor() {
    this.apiService.retriveData("/colours/colour").then(colour => {
      console.log(colour)
      this.color = colour
      console.log(this.color)
    })
  }
  getBrand() {
    this.apiService.retriveData("/brands/brand").then(brand => {
      console.log(brand)
      this.brand_name = brand
      console.log(this.brand_name)
    })
  }

  getModel() {
    this.apiService.retriveData("/modelpds/modelpd").then(model => {
      console.log(model)
      this.model_name = model
      console.log(this.model_name)
    })
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
