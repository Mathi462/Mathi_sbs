import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgForm, NgModel, FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, PageEvent, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DefaultLayoutComponent } from '../../containers';
import { Router } from "@angular/router";
import { PopUP } from '../hero';
import { PopupComponent } from '../popup/popup.component';




// export interface DialogData {
//   arr1: any;
//   values: any;
// }


@Component({
  selector: 'app-stock',
  templateUrl: './updatestock.component.html',

})

export class UpdatestockComponent implements OnInit {

  // bname1:any=[];
  // category_type: any;
  // ManufacturerName: any;
  // color: any;
  // quantity: any;
  // branch: any;
  // cgst: any;
  // sgst: any;
  // brand_name: any;
  // model_name: any;
  // dp: any;
  // lp: any;
  // cp: any;
  // sp: any;
  // stock_status: any;
  // remarks: any;
  // arr: {};
  // result: any;
  // display: any;
  // delete: {};
  // arr1: any;
  // cData: any;
  // defRef: any;
  // length: any;
  // pageSize = 4;
  // pageSizeOptions: number[] = [5, 10, 25, 100];
  // pageEvent: PageEvent;
  // display1: any;
  // registerForm: FormGroup;
  // submitted = false;
  // form: FormGroup;
  // para: any;
  // billrec: any;
  // // params: FormGroup;
  // params: FormGroup;
  // printSection: any = [];


  // dataSource: any;

  // displayedColumns: string[] = ['brand_name', 'model_name', 'category_type', 'quantity', 'sp', 'cp', 'stock_status', 'branch', 'edit', 'delete'];

  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  category_type: any;
  ManufacturerName: any;
  color: any;
  bname1: any = [];
  branch: any = [{}];
  cgst: any;
  sgst: any;
  brand_name: any;
  model_name: any;
  form: FormGroup;
  mobile: FormGroup;
  accessories: FormGroup;
  max_row: any;
  billrec: any;
  cat_Type: any

  update_id:any;
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  private fieldArray1: Array<any> = [];
  private newAttribute1: any = {};

  toUpdate : any ;
  constructor(public apiService: ApiService,
    public dialog: MatDialog,
    public nav: DefaultLayoutComponent,
    public sbar: MatSnackBar,
    public pop: PopupComponent,
    public formBuilder: FormBuilder) {
    this.getCategory();
    this.getManufacturerName();
    this.getBranch();
    this.getCGst();
    this.getSGst();
    this.getColor();
    this.getBrand();
    this.getModel();


    

    this.toUpdate =   localStorage.getItem('data')   
    
    
    console.log(this.update_id) 
    console.log(JSON.parse(this.toUpdate))
    
    this.toUpdate = JSON.parse(this.toUpdate)
    this.update_id = this.toUpdate._id;
      Object.keys(this.toUpdate).forEach(key => {
        if(key == "_id") {
          delete this.toUpdate[key]
        }
        if(key == " __v") {
          delete this.toUpdate[key]
        }
        
        
      })

      this.categoryType(this.toUpdate.category_type)
if(this.toUpdate.category_type=="Mobile"){

  this.newAttribute={
      
    add_barcode:this.toUpdate.add_barcode,
    imei1:this.toUpdate.imei1,
    imei2:this.toUpdate.imei2,
    battery_no:this.toUpdate.battery_no,
    color:this.toUpdate.color
  }

  Object.keys(this.toUpdate).forEach(key => {
    if(key == "add_barcode") {
      delete this.toUpdate[key]
    }
    if(key == "imei1") {
      delete this.toUpdate[key]
    }
    if(key == "imei2") {
      delete this.toUpdate[key]
    }
    if(key == "battery_no") {
      delete this.toUpdate[key]
    }
    if(key == "color") {
      delete this.toUpdate[key]
    }
    
  })
}
else{

  this.newAttribute1={
      
    add_barcode:this.toUpdate.add_barcode,
    otherno:this.toUpdate.otherno,
    typeon:this.toUpdate.typeon,
    battery_no:this.toUpdate.battery_no,
    color:this.toUpdate.color
  }

  Object.keys(this.toUpdate).forEach(key => {
    if(key == "add_barcode") {
      delete this.toUpdate[key]
    }
    if(key == "otherno") {
      delete this.toUpdate[key]
    }
    if(key == "battery_no") {
      delete this.toUpdate[key]
    }
    if(key == "typeon") {
      delete this.toUpdate[key]
    }
    if(key == "color") {
      delete this.toUpdate[key]
    }
    
  })

}

// console.log(this.newAttribute1)
console.log(this.toUpdate)
  
    // console.log(Date.now())
    // this.params = formBuilder.group({
    //   productdetails: formBuilder.array([
    //     this.getProd()
    //   ])
    // })

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

  // update_id : any;


  categoryType(value) {
    // console.log(value)   

    //  console.log(this.cat_Type)   
    if (value === 'mobile' || value === 'Mobile' || value === 'MOBILE') {
      this.cat_Type = 'yes'
    }
    else {
      this.cat_Type = 'no'
    }
  }


  localsto;
  ngOnInit() {


    this.form = this.formBuilder.group({
      branch: ['',Validators.required],
      brand_name: ['',Validators.required],
      model_name: ['',Validators.required],
      category_type: ['',Validators.required],
      ManufacturerName: ['',Validators.required],
      quantity: ['',Validators.required],
      dp: ['',Validators.required],
      lp: ['',Validators.required],
      sp: ['',Validators.required],
      cp: ['',Validators.required],
      stock_status: ['',Validators.required],
      cgst: ['',Validators.required],
      sgst: ['',Validators.required],
      remarks: ['']
    
    });


  


    this.form.get('quantity').valueChanges.subscribe(value => {
      this.max_row = Number(value)
      //   console.log(this.max_row)
      //   console.log(this.fieldArray.length)
    })
    console.log(this.toUpdate)
    this.form.setValue(this.toUpdate)

    
  }



  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.form)
    );
  }

  getCategory() {
    this.apiService.retriveData("/categorys/category").then(category => {

      this.category_type = category

    })
  }

  getManufacturerName() {
    this.apiService.retriveData("/manufacturers/manufacturer").then(ManufacturerName => {
   
      this.ManufacturerName = ManufacturerName
   
    })
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
  getCGst() {
    this.apiService.retriveData("/gsts/gst").then(cgst => {

      this.cgst = cgst

    })
  }

  getSGst() {
    this.apiService.retriveData("/gsts/gst").then(sgst => {

      this.sgst = sgst

    })
  }

  getColor() {
    this.apiService.retriveData("/colours/colour").then(colour => {

      this.color = colour

    })
  }
  getBrand() {
    this.apiService.retriveData("/brands/brand").then(brand => {

      this.brand_name = brand

    })
  }

  getModel() {
    this.apiService.retriveData("/modelpds/modelpd").then(model => {

      this.model_name = model

    })
  }

  addFieldValue() {
    if (this.fieldArray.length < this.max_row) {
      this.fieldArray.push(this.newAttribute)
      this.newAttribute = {};
    }

  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  addFieldValue1() {
    this.fieldArray1.push(this.newAttribute1)
    this.newAttribute1 = {};
    console.log(this.fieldArray1)

  }

  deleteFieldValue1(index) {
    this.fieldArray1.splice(index, 1);
  }

  updateass(){
    // console.log(this.localsto.value)
    console.log(this.form.value)
    // let data={
 
      
    // }

    // console.log(data) 
   
    console.log(this.update_id)
    this.apiService.updateData('/all_in_one_stocks/stock/'+this.update_id,JSON.stringify(this.form.value) ).then(dataUpdate =>{
      this.pop.snakbar('Updated', 'Successfully');
      console.log(dataUpdate)
    });

    // this.apiService.updateData('/all_in_one_stocks/stock/'+this.update_id,data).then(dataUpdate =>{
    //   this.pop.snakbar('Accessories Updated', 'Successfully');
    //   console.log(dataUpdate)
    // });


  }
 
    


  // saveData() {
  //   //  console.log(this.form.value)

  //   if (this.form.valid) {
  //     if (this.cat_Type === 'yes') {
  //       this.addFieldValue();
  //       //  console.log(this.fieldArray)
  //       //  console.log(this.fieldArray.length)
  //       for (let i = 0; i < this.fieldArray.length; i++) {
  //         Object.assign(this.fieldArray[i], this.form.value)
  //         //    console.log(this.fieldArray[i])
  //       }
  //       //  console.log(this.fieldArray)
  //       this.apiService.getData('/all_in_one_stocks/stock', this.fieldArray).then(Ordersent => {
  //         this.billrec = Ordersent;
  //         //     console.log(this.billrec)
  //         if (this.billrec.success === true) {

  //           this.pop.snakbar('Stock Added', 'Successfully');

  //         } else {

  //           this.pop.snakbar('', 'Failed');


  //         }
  //         localStorage.removeItem("data")
  //       });
  //     }
  //     else {
  //       this.addFieldValue1();
  //       console.log(this.fieldArray1)
  //       console.log(this.fieldArray1.length)
  //       for (let i = 0; i < this.fieldArray1.length; i++) {
  //         Object.assign(this.fieldArray1[i], this.form.value)
  //         console.log(this.fieldArray1[i])
  //       }
  //       console.log(this.fieldArray1)
  //       this.apiService.getData('/all_in_one_stocks/stock', this.fieldArray1).then(Ordersent => {
  //         this.billrec = Ordersent;
  //         console.log(this.billrec)
  //         if (this.billrec.success === true) {

  //           this.pop.snakbar('Stock Added', 'Successfully');

  //         } else {

  //           this.pop.snakbar('', 'Failed');


  //         }
  //         localStorage.removeItem("data")
  //       });
  //     }
  //   }
  //   this.router.navigate(['/stock/updatestock']);

  // }
}

