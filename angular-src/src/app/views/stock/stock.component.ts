import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { MatDialog, MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { PopupComponent } from "../popup/popup.component";






@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',

})

export class StockComponent implements OnInit {

  category_type: any;
  ManufacturerName: any;
  color: any;
  bname1:any=[];
  branch: any=[{}];
  cgst: any;
  sgst: any;
  brand_name: any;
  model_name: any;
  form: FormGroup;
  mobile: FormGroup;
  accessories: FormGroup;
  max_row : any;
  billrec: any;
  cat_Type:any
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  private fieldArray1: Array<any> = [];
  private newAttribute1: any = {};
  
    constructor(public apiService: ApiService,  public dialog: MatDialog,
                public sbar: MatSnackBar,private router: Router,
                public pop: PopupComponent,  public formBuilder: FormBuilder) 
                  {
                      
                      this.getCategory();
                      this.getManufacturerName();
                      this.getBranch();
                      this.getCGst();
                      this.getSGst();
                      this.getColor();
                      this.getBrand();
                      this.getModel();


                      
                  }

  
  categoryType(value)
   {
    // console.log(value)   
    
  //  console.log(this.cat_Type)   
    if(value === 'mobile' || value === 'Mobile' || value === 'MOBILE')
    {
      this.cat_Type = 'yes'
    } 
    else
    {
      this.cat_Type = 'no'
    }
   }
  
  
  ngOnInit(){

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
      remarks: [''],
      stock_visible:'yes'

    });

      this.form.get('quantity').valueChanges.subscribe(value => {
        this.max_row = Number(value)
     //   console.log(this.max_row)
     //   console.log(this.fieldArray.length)
      })
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
  getBranch(){
    this.apiService.retriveData("/all_login_users/adminregister").then(bname => {
     
      this.branch = bname
      console.log(this.branch)
   
       for (let i = 0; i < this.branch.length; i++) {
        if (this.branch[i].user_type === 'branch' ) {
      
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
    if(this.fieldArray.length<this.max_row){
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

  saveData(){
  //  console.log(this.form.value)

  if (this.form.valid) {
    if(this.cat_Type === 'yes'){
      this.addFieldValue();
    //  console.log(this.fieldArray)
    //  console.log(this.fieldArray.length)
      for(let i=0;i<this.fieldArray.length;i++){
        Object.assign(this.fieldArray[i],this.form.value)
    //    console.log(this.fieldArray[i])
      }
    //  console.log(this.fieldArray)
          this.apiService.getData('/all_in_one_stocks/stock', this.fieldArray).then(Ordersent => {
        this.billrec = Ordersent;
       //     console.log(this.billrec)
        if (this.billrec.success === true) {
          
          this.pop.snakbar('Stock Added', 'Successfully');
  
        } else {
          
          this.pop.snakbar('', 'Failed');
  
          
        }
        localStorage.removeItem("data")
      });
    }
    else
    {
      this.addFieldValue1();
      console.log(this.fieldArray1)
      console.log(this.fieldArray1.length)
      for(let i=0;i<this.fieldArray1.length;i++){
        Object.assign(this.fieldArray1[i],this.form.value)
        console.log(this.fieldArray1[i])
      }
      console.log(this.fieldArray1)
          this.apiService.getData('/all_in_one_stocks/stock', this.fieldArray1).then(Ordersent => {
        this.billrec = Ordersent;
            console.log(this.billrec)
        if (this.billrec.success === true) {
          
          this.pop.snakbar('Stock Added', 'Successfully');
  
        } else {
          
          this.pop.snakbar('', 'Failed');
  
          
        }
        localStorage.removeItem("data")
      });
    }
  }

  this.router.navigate(['/stock/add-stock']);
  
  }


//   category_type: any;
//   ManufacturerName: any;
//   color: any;
//   bname1:any=[];
//   quantity: any;
//   branch: any=[{}];
//   cgst: any;
//   sgst: any;
//   brand_name: any;
//   model_name: any;
//   dp: any;
//   lp: any;
//   cp: any;
//   sp: any;
//   stock_status: any;
//   remarks: any;
//   arr: {};
//   result: any;
//   display: any;
//   delete: {};
//   arr1: any;
//   cData: any;
//   defRef: any;
//   length: any;
//   pageSize = 4;
//   pageSizeOptions: number[] = [5, 10, 25, 100];
//   pageEvent: PageEvent;
//   display1: any;
//   registerForm: FormGroup;
//   submitted = false;
//   form: FormGroup;
//   para: any;
//   billrec: any;
//   // params: FormGroup;
//   params: FormGroup;
//   printSection: any = [];


//   dataSource: any;

//   displayedColumns: string[] = ['brand_name', 'model_name', 'category_type', 'quantity', 'sp', 'cp', 'stock_status', 'branch', 'edit', 'delete'];

//   @ViewChild(MatSort) sort: MatSort;
//   @ViewChild(MatPaginator) paginator: MatPaginator;


//   constructor(public apiService: ApiService,
//     public dialog: MatDialog,
//     public nav: DefaultLayoutComponent,
//     public sbar: MatSnackBar,
//     public pop: PopupComponent,
//     public formBuilder: FormBuilder) {
//     this.showStock();
//     this.getCategory();
//     this.getManufacturerName();
//     this.getBranch();
//     this.getCGst();
//     this.getSGst();
//     this.getColor();
//     this.getBrand();
//     this.getModel();


// // console.log(Date.now())
//     this.params = formBuilder.group({
//       prod: formBuilder.array([
//         this.getProd()
//       ])
//     })

//   }

//   br: any;
//   bn: any;
//   mn: any;
//   ct: any;
//   mna: any;
//   qt: any;
//   d: any;
//   l: any;
//   s: any;
//   c: any;
//   cg: any;
//   sg: any;
//   ss: any;
//   rm: any;





//   ngOnInit() {
//     const myFormValueChanges$ = this.params.controls['prod'].valueChanges;
//     myFormValueChanges$.subscribe(prod => this.updateTotalUnitPrice(prod));

//     this.para = localStorage.getItem("data");
//     this.form = this.formBuilder.group({
//       branch: [''],
//       brand_name: [''],
//       model_name: [''],
//       category_type: [''],
//       ManufacturerName: [''],
//       // battery_no: [''],
//       // color: [''],
//       quantity: [''],
//       // add_barcode: [''],
//       // imei1: [''],
//       // imei2: [''],
//       dp: [''],
//       lp: [''],
//       sp: [''],
//       cp: [''],
//       stock_status: [''],
//       cgst: [''],
//       sgst: [''],
//       remarks: ['']
//     });
//     this.form.get('branch').valueChanges.subscribe(
//       value => {
//         this.br = value
//     //    console.log(value);

//       }
//     )

//     this.form.get('brand_name').valueChanges.subscribe(
//       value => {
//         this.bn = value

//       }
//     )

//     this.form.get('model_name').valueChanges.subscribe(
//       value => {
//         this.mn = value

//       }
//     )

//     this.form.get('category_type').valueChanges.subscribe(
//       value => {
//         this.ct = value

//       }
//     )

//     this.form.get('ManufacturerName').valueChanges.subscribe(
//       value => {
//         this.mna = value

//       }
//     )

//     this.form.get('quantity').valueChanges.subscribe(
//       value => {
//         this.qt = value

//       }
//     )
//     this.form.get('dp').valueChanges.subscribe(
//       value => {
//         this.d = value

//       }
//     )
//     this.form.get('lp').valueChanges.subscribe(
//       value => {
//         this.l = value

//       }
//     )
//     this.form.get('sp').valueChanges.subscribe(
//       value => {
//         this.s = value

//       }
//     )
//     this.form.get('cp').valueChanges.subscribe(
//       value => {
//         this.c = value

//       }
//     )
//     this.form.get('cgst').valueChanges.subscribe(
//       value => {
//         this.cg = value

//       }
//     )
//     this.form.get('sgst').valueChanges.subscribe(
//       value => {
//         this.sg = value

//       }
//     )
//     this.form.get('stock_status').valueChanges.subscribe(
//       value => {
//         this.ss = value

//       }
//     )
//     this.form.get('remarks').valueChanges.subscribe(
//       value => {
//         this.rm = value

//       }
//     )

//     // stockid:['',Validators.required],
//     // brand_name:['',Validators.required],
//     // model_name:['',Validators.required],
//     // category_type:['',Validators.required],
//     // ManufacturerName:['',Validators.required],
//     // battery_no:['',Validators.required],
//     // color:['',Validators.required],
//     // quantity:['',Validators.required],
//     // add_barcode:['',Validators.required],
//     // imei1:['',Validators.required],
//     // imei2:['',Validators.required],
//     // dp:['',Validators.required],
//     // lp:['',Validators.required],
//     // sp:['',Validators.required],
//     // cp:['',Validators.required],
//     // stock_status:['',Validators.required],
//     // cgst:['',Validators.required],
//     // sgst:['',Validators.required],
//     // branch:['',Validators.required],
//     // //add_date:['',Validators.required],
//     // remarks:['',Validators.required],
//     // productdetails:['',Validators.required]




//   }

//   isFieldValid(field: string) {
//     return !this.form.get(field).valid && this.form.get(field).touched;
//   }

//   displayFieldCss(field: string) {
//     return {
//       'has-error': this.isFieldValid(field),
//       'has-feedback': this.isFieldValid(field)
//     };
//   }




//   // onSubmit(form: NgForm) {
//   //   console.log(this.form);
//   //   if (this.form.valid) {
//   //     this.stockRegister();
//   //     console.log('form submitted');
//   //     console.log(this.form.value);
//   //     this.reset();
//   //   } else {
//   //     this.validateAllFormFields(this.form);
//   //   }

//   // }

//   validateAllFormFields(formGroup: FormGroup) {
//     Object.keys(formGroup.controls).forEach(field => {
//      // console.log(field);
//       const control = formGroup.get(field);
//       if (control instanceof FormControl) {
//         control.markAsTouched({ onlySelf: true });
//       } else if (control instanceof FormGroup) {
//         this.validateAllFormFields(control);
//       }
//     });
//   }

//   reset() {
//     this.form.reset();
//   }

//   stockRegister() {
  

//    console.log(this.params.value.prod)
//    console.log(this.form.value)
//     let data = {
//       branch: this.branch,
//       add_date: Date.now(),
//       model_name: this.model_name,
//       category_type: this.category_type,
//       ManufacturerName: this.ManufacturerName,
//       cgst: this.cg,
//       sgst: this.sg,
//       // productdetails : this.params.value.prod,
      
//     }
  
//       console.log(this.params.value.prod.length)
//      for(let i=0;i<this.params.value.prod.length;i++)
//      {
//     //  console.log(this.params.value.prod[i])
//       Object.assign(data,this.params.value.prod[i])
      
//     //  console.log(this.params.value.prod[i])  
      
//      }
//    // console.log(data);
//     // Object.assign(data , this.form.value)
//     // console.log(data);
//     let body = {
//       branch: this.branch,

//       model_name: this.model_name,
//       category_type: this.category_type,
//       ManufacturerName: this.ManufacturerName,
//       quantity: this.qt,
//       dp: this.d,
//       lp: this.l,
//       sp: this.s,
//       cp: this.c,
//       cgst: this.cg,
//       sgst: this.sg,
//       //   branch: this.result.branch,
//       //  // add_date: value.add_date,
//       remarks: this.remarks,
//       productdetails: this.params.value.prod
//     }
//    // console.log(data)
//     // this.apiService.getData('/stocks/stock', data).then(Ordersent => {
//     //   this.billrec = Ordersent;
//     //   console.log(this.billrec)
//     //   if (this.billrec.success === true) {
//     //     this.showStock()
//     //     this.pop.snakbar('Stock Added', 'Successfully');

//     //   } else {
//     //     //  this.pop.snakbar('Curriculum Register', 'Failed');
//     //     this.pop.snakbar('', 'Failed');

//     //     //  alert('Curriculum Id or Name is Already Exists');
//     //   }
//     //   localStorage.removeItem("data")
//     // });

//     this.apiService.getData('/all_in_one_stocks/stock', data).then(Ordersent => {
//       this.billrec = Ordersent;
// //console.log(this.billrec)
//       if (this.billrec.success === true) {
//         // this.showStock()
//         this.pop.snakbar('Stock Added', 'Successfully');

//       } else {
//         //  this.pop.snakbar('Curriculum Register', 'Failed');
//         this.pop.snakbar('', 'Failed');

//         //  alert('Curriculum Id or Name is Already Exists');
//       }
//       localStorage.removeItem("data")
//     });


//   }


//   showStock() {
//     this.dataSource = []
//     this.apiService.retriveData('/stocks/stock').then(displayStock => {
//       this.display = displayStock;
//     //  console.log(this.display);
//       this.dataSource = new MatTableDataSource(this.display);
//     //  console.log(this.dataSource);
//       this.dataSource.sort = this.sort;
//       this.dataSource.paginator = this.paginator;
//     });
//   }

//   applyFilter(filterValue: string) {
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//   }

//   deleteStock(value) {
//  //   console.log(value);
//     this.apiService.deleteData('/stocks/stock/' + value).then(del => {
//       this.delete = del;
//       this.pop.snakbar('Stock Deleted', 'Successfully');
//       this.showStock();

//     });
//   }

//   addProd() {
//     const control = <FormArray>this.params.controls['prod'];
//     control.push(this.getProd());

//     //  console.log(this.params.value)
//   }
//   deleteFieldValue(index) {
//     const control = <FormArray>this.params.controls['prod'];
//     control.removeAt(index);
//   }
//   public updateTotalUnitPrice(prod: any) {
//     this.printSection = []
//     for (let i in prod) {
//       this.printSection.push({
//         add_barcode: prod[i].add_barcode,
//         battery_no: prod[i].battery_no,
//         color: prod[i].color,
//         imei1: prod[i].imei1,
//         imei2: prod[i].imei2,
//       })
//     }
//   }
//   getProd() {
//     return this.formBuilder.group({
      
//       add_barcode: [''],
//       battery_no: [''],
//       color: [''],
//       imei1: [''],
//       imei2: [''],
//       stock_visible : 'yes',
//       stock_status  : 'instock'
//     })
//   }



//   // openDialog(value): void {
//   //   console.log(value);
//   //   this.nav.sidebarMinimized = false;
//   //   const cData = {


//   //     // stockid: value.stockid,
//   //     brand_name: value.brand_name,
//   //     model_name: value.model_name,
//   //     category_type: value.category_type,
//   //     ManufacturerName: value.ManufacturerName,
//   //     battery_no: value.battery_no,
//   //     color: value.color,
//   //     quantity: value.quantity,
//   //     add_barcode: value.add_barcode,
//   //     imei1: value.imei1,
//   //     imei2: value.imei2,
//   //     dp: value.dp,
//   //     lp: value.lp,
//   //     sp: value.sp,
//   //     cp: value.cp,
//   //     stock_status: value.stock_status,
//   //     cgst: value.cgst,
//   //     sgst: value.sgst,
//   //     branch: value.branch,
//   //     // add_date: value.add_date,
//   //     remarks: value.remarks,
//   //     productdetails: this.params.value.prod

//   //   };
//   //   this.defRef = this.dialog.open(DialogContentExampleDialog, {
//   //     width: '500px',
//   //     data: { values: value, cData: cData }
//   //   });

//   //   this.defRef.afterClosed().subscribe(result => {
//   //     if (result != null) {
//   //       console.log(result.values._id);
//   //       this.apiService.updateData('/stocks/stock/' + result.values._id, result.cData).then(d => {
//   //         this.pop.snakbar('Stock Updated', 'Successfully');
//   //         console.log(d);
//   //         this.showStock();
//   //       });
//   //     }
//   //   });
//   // }
//   getCategory() {
//     this.apiService.retriveData("/categorys/category").then(category => {
//     //  console.log(category)
//       this.category_type = category
//     //  console.log(this.category_type)
//     })
//   }

//   getManufacturerName() {
//     this.apiService.retriveData("/manufacturers/manufacturer").then(ManufacturerName => {
//    //   console.log(ManufacturerName)
//       this.ManufacturerName = ManufacturerName
//    //   console.log(this.ManufacturerName)
//     })
//   }
//   getBranch(){
//     this.apiService.retriveData("/all_login_users/adminregister").then(bname => {
//      // console.log(branch)
//       this.branch = bname
//    //   console.log(this.branch[0].user_type)
//      // console.log(this.branchid)
//        for (let i = 0; i < this.branch.length; i++) {
//         if (this.branch[i].user_type === 'branch') {
//       //    console.log(this.branch[i])
//           this.bname1.push(this.branch[i])
//         }
//       }
//     })  
//   }
//   getCGst() {
//     this.apiService.retriveData("/gsts/gst").then(cgst => {
//     //  console.log(cgst)
//       this.cgst = cgst
//     //  console.log(this.cgst)
//     })
//   }

//   getSGst() {
//     this.apiService.retriveData("/gsts/gst").then(sgst => {
//     //  console.log(sgst)
//       this.sgst = sgst
//     //  console.log(this.sgst)
//     })
//   }

//   getColor() {
//     this.apiService.retriveData("/colours/colour").then(colour => {
//     //  console.log(colour)
//       this.color = colour
//     //  console.log(this.color)
//     })
//   }
//   getBrand() {
//     this.apiService.retriveData("/brands/brand").then(brand => {
//     //  console.log(brand)
//       this.brand_name = brand
//     //  console.log(this.brand_name)
//     })
//   }

//   getModel() {
//     this.apiService.retriveData("/modelpds/modelpd").then(model => {
//    //   console.log(model)
//       this.model_name = model
//     //  console.log(this.model_name)
//     })
//   }

//   setPageSizeOptions(setPageSizeOptionsInput: string) {
//     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
//   }
//   onPageChanged(e) {
//     const firstCut = e.pageIndex * e.pageSize;
//     const secondCut = firstCut + e.pageSize;
//     this.display1 = this.display.slice(firstCut, secondCut);
//   }

}



