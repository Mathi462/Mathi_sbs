import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgForm, NgModel, FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, PageEvent, MatPaginator, MatSort, MatTableDataSource, MatHint } from '@angular/material';
import { DefaultLayoutComponent } from '../../containers';
import { PopUP } from '../hero';
import { PopupComponent } from '../popup/popup.component';
import { CurrencyPipe } from '@angular/common';
import { ValueTransformer } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { DisplayQuspaperComponent } from '../question-paper/display-qus-paper.component';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface DialogData {
  arr1: any;
  values: any;
}
export class AppComponent {
  name = 'Angular 5 reactive form with dynamic fields and validations example';
  public exampleForm: FormGroup;
  totalSum: number = 0;
  totalgst: number = 0;
  totaldis: number = 0;
}

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls : ['./addorder.component.scss']

})

export class AddorderComponent implements OnInit {

  discount: FormGroup;
  item:any;
  grandTotal: any;
  grand: any;
  balance: any;
  para: any;
  amtInWords: any = "";
  paidAmount: any;
  orderdate: any;
  paymentstatus: any;
  paymenttype: any;
  position: any = 0;
  salesperson: any;
  branch: any;
  invoice: any = 0
  message: any;
  branchname: any;
  searchedProducts: any = []
  branchLogo: any;
  customerphno:any;
  branchDetails: any;
  productdetails: any = [];
  custDet: any;
  proddetails: any;
  allStockid: any = [];
  inSideId: any;
  custPhone = new FormControl() ;
  showSuggest : boolean = false;
  ngOnInit() {

    this.item = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.item)
    if(this.item!=null){

      this.branchOfLogo = this.item.shop_logo;
      console.log(this.branchOfLogo)
      this.branchDetails = this.item;
    }
  
    console.log(this.branchDetails.bname)
    this.branch = this.branchDetails.bname
    this.branchLogo = this.branchDetails.bname;
    // this.logoGetting(this.branchLogo);
    const myFormValueChanges$ = this.params.controls['prod'].valueChanges;
    myFormValueChanges$.subscribe(prod => this.updateTotalUnitPrice(prod));
    this.invoice = new Date().toLocaleString().replace('/', '')
    this.invoice = this.invoice.replace('/', '')
    this.invoice = this.invoice.replace(', ', '')
    this.invoice = this.invoice.replace(':', '')
    this.invoice = this.invoice.replace(':', '')
    /* this.apiService.retriveData('/addorders/last-invoice').then(d => {
       console.log(d)
       this.invoice = d
       this.invoice = this.invoice.message
       this.invoice = "INV" + this.invoice[0].invoice
     })*/
    // this.saveBilling.get('branch').valueChanges.subscribe(value => {
    //   console.log(value);
    //   // this.branchLogo s= value;



    // })


    this.para = localStorage.getItem("data");

    this.form = this.formBuilder.group({
      add_barcode: [''],
      // customerphno: [''],

    });

   

    // this.cust.get('custmerphone').setValue(
      // this.custPhone.valueChanges.pipe(
      //   startWith(''),
      //   map(selectedValue => {
      //     console.log(selectedValue)
      //     this.apiService.getData("/customers/search", { customerphno: selectedValue }).then(d => {
      //       this.custDet = d
      //       console.log(this.custDet)
      //       if (this.custDet != null) {
      //         if (selectedValue == "") {
      //           this.result = {
      //             custmername: '',
      //             custmerphone: '',
      //             custmeremail: ''
      //           }
      //         }
      //         else {
      //           this.result = {
      //             custmername: this.custDet.customerfname,
      //             custmerphone: this.custDet.customerphno,
      //             custmeremail:this.custDet.customeremail
      //           }
      //         }
      //       }
      //       else if (this.custDet == null) {
      //         this.result = {
            
      //           custmername: this.cust.controls['custmername'].value,
      //           custmerphone: this.cust.controls['custmerphone'].value,
      //           custmeremail: this.cust.controls['customeremail'].value
      //         }
      //       }
  
  
      //       console.log(this.result)
      //       console.log(selectedValue);
      //     }
      //     );
      //   })
      // )
    // )
    this.cust.get('custmerphone').valueChanges.subscribe(
      (selectedValue) => {
        console.log(selectedValue)
        
        this.apiService.getData("/customers/search", { customerphno: selectedValue }).then(d => {
          this.custDet = d
          console.log(this.custDet)
          if (this.custDet != null) {
            this.showSuggest = false
            if (selectedValue == "") {
              this.result = {
                custmername: '',
                custmerphone: '',
                custmeremail: ''
              }
            }
            else {
              this.showSuggest = true
              this.result = {
                custmername: this.custDet.customerfname,
                custmerphone: this.custDet.customerphno,
                custmeremail:this.custDet.customeremail
              }
            }
          }
          else if (this.custDet == null) {
            this.result = {
          
              custmername: this.cust.controls['custmername'].value,
              custmerphone: this.cust.controls['custmerphone'].value,
              custmeremail: this.cust.controls['customeremail'].value
            }
          }


          console.log(this.result)
          console.log(selectedValue);
        }
        );
      })
    this.saveBilling.get('paidAmount').valueChanges.subscribe(
      (value) => {
        console.log(Number(this.totalSum) + "+" + Number(this.totalgst) + "-" + Number(this.paidAmount))
        // this.saveBilling.get('balance').setValue(Number(this.totalSum) + Number(this.totalgst) - Number(value))
        this.balance = this.totalSum + this.totalgst - value

        this.amtInWords = this.numberToEnglish(value, null)
        console.log(this.amtInWords)
      }
    )
    // this.form.controls['orderdate'].valueChanges.subscribe(
    //   (value) => {
    //     this.orderdate = value
    //     console.log(this.orderdate.value)
    //   }
    // )

    // this.saveBilling.controls['paymentStatus'].valueChanges.subscribe(
    //   (value) => {
    //     this.paymentstatus = value
    //   }
    // )

    // this.saveBilling.controls['paymenttype'].valueChanges.subscribe(
    //   (value) => {
    //     this.paymenttype = value
    //   }
    // )
    // this.saveBilling.controls['message'].valueChanges.subscribe(
    //   (value) => {
    //     this.message = value
    //   }
    // )

    // this.saveBilling.controls['salesperson'].valueChanges.subscribe(
    //   (value) => {
    //     this.salesperson = value
    //   }
    // )
    // this.saveBilling.controls['branch'].valueChanges.subscribe(
    //   (value) => {
    //     this.branch = value
    //   }
    // )


    // this.saveBilling.controls['branchname'].valueChanges.subscribe(
    //   (value) => {
    //     this.branchname = value
    //   }
    // )


    

   

    let contrl = <FormArray>this.params.get('prod')

    // this.form.controls['add_barcode'].valueChanges.subscribe(
    //   (selectedValue1) => {
    //     this.apiService.getData("/all_in_one_stocks/search", { add_barcode: selectedValue1}).then(d => {
    //       this.proddetails = d
    //       console.log(this.proddetails)
    //       if (this.proddetails != null) {
    //         if (selectedValue1 == "") {
    //           this.result = {
    //             custmername: '',
    //             custmerphone: '',
    //             custmeremail: ''
    //           }
    //         }
    //         else {
    //           this.result = {
    //             custmername: this.cust.controls['custmername'].value,
    //             custmerphone: this.cust.controls['custmerphone'].value,
    //             custmeremail: this.cust.controls['customeremail'].value
    //           }
    //         }
    //       }
    //       else if (this.custDet == null) {
    //         this.result = {
    //           custmername: this.cust.controls['custmername'].value,
    //           custmerphone: this.cust.controls['custmerphone'].value,
    //           custmeremail: this.cust.controls['customeremail'].value
    //         }
    //       }


    //       console.log(this.result)
    //       console.log(selectedValue1);
    //     }
    //     );
    //   })


    this.form.controls['add_barcode'].valueChanges.subscribe(
      (selectedValue1) => {
        this.apiService.getData("/all_in_one_stocks/search", { add_barcode: selectedValue1 }).then(csk => {
          console.log(csk)
          if (csk == null) {
            console.log('yes null')
            // contrl.at(this.position).reset()
          }
          else {
            console.log('data is der')
            this.stockresult = csk
            if (this.stockresult.category_type === 'mobile' || this.stockresult.category_type === 'Mobile' || this.stockresult.category_type === 'MOBILE') {
              console.log('mobile')


              if (this.stockresult.add_barcode == selectedValue1) {
                console.log(this.stockresult)
                this.allStockid = this.stockresult._id
                console.log(this.allStockid)
                contrl.at(this.position).get('barcode').setValue(this.stockresult.add_barcode)
                contrl.at(this.position).get('qty').setValue(1)
                contrl.at(this.position).get('product').setValue(this.stockresult.brand_name + ' ' + this.stockresult.model_name + '\n' + 'IMEI1:' + this.stockresult.imei1 + '\n' + 'IMEI2:' + this.stockresult.imei2)
                contrl.at(this.position).get('rate').setValue(this.stockresult.cp)
                contrl.at(this.position).get('gst').setValue(Number(this.stockresult.cgst) + Number(this.stockresult.sgst))


                // this.inSideId = this.stockresult[i]._id
                // console.log(this.inSideId)
              }


            } 
            else {
              console.log('no')


              if (this.stockresult.add_barcode == selectedValue1) {
                console.log(this.stockresult)
                console.log(this.stockresult._id)

                this.allStockid = this.stockresult._id
                console.log(this.allStockid)
                contrl.at(this.position).get('barcode').setValue(this.stockresult.add_barcode)
                contrl.at(this.position).get('qty').setValue(1)
                contrl.at(this.position).get('product').setValue(this.stockresult.brand_name + ' ' + this.stockresult.model_name + '\n' + 'Unique Number:' + this.stockresult.otherno + '\n' + 'Type:' + this.stockresult.typeon)
                contrl.at(this.position).get('rate').setValue(this.stockresult.cp)
                contrl.at(this.position).get('gst').setValue(Number(this.stockresult.cgst) + Number(this.stockresult.sgst))
                // this.inSideId = this.stockresult[i]._id
                // console.log(this.inSideId)
              }


            }



          }



          // let contrl = <FormArray>this.params.get('prod')

          // console.log(this.stockresult.productdetails.add_barcode)




          if (selectedValue1 == "") {
            this.stockresult = {

              brand_name: "",
              model_name: "",
              dp: "",
              gst: "",
              imei1: "",
              imei2: "",


            }
          }
          console.log(this.stockresult)
          console.log(selectedValue1)
        })



      }



    )


  }
  setItem() {
    this.cust.get('custmerphone').setValue(this.result.custmerphone)
    console.log(this.showSuggest)
    this.showSuggest = false
    console.log(this.showSuggest)
  }

  arr: {};
  result: any = {
    orderdate: new Date()
  }
  stockresult: any = [{

  }];
  display: any;
  delete: {};
  arr1: any;
  cData: any;
  defRef: any;
  length: any;
  pageSize = 4;
  printSection: any = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  submitted = false;
  form: FormGroup;
  params: FormGroup;
  cust: FormGroup;

  // discount: FormGroup;

  custer: any = {
    custmername: '',
    custmerphone: '',
    customeremail: ''

  };
  custdetail: any = {
    custname: '',
    custphone: '',
    custaddress: ''
  }



  bill: any = {
    total: '',
    cgst: '',
    sgst: '',
    totalAmt: '',
    grandtotal: '',
    discount: '',
    paidAmount: '',
    paymentstatus: '',
    firstname: '',
    bname: '',
    paymenttype: '',
    salesperson: '',
    message: '',
    branch: '',
    // totaldis:'',



  };
  saveBilling: FormGroup;

  customer: {};
  firstname: any = [{}];
  bname: any = [{}];
  showData = false;
  billrec: any;
  savecust: any;
  dataSource: any;

  gstDisplay: any;
  branchOfLogo: any;
  // cust: FormGroup;

  today: any;
  date = new FormControl(new Date())

  // displayedColumns: string[] = ['customerfname', 'customerlname', 'customerphno', 'customeremail', 'ok'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public exampleForm: FormGroup;
  totalSum: number = 0;
  totalgst: number = 0;
  totaldis: number = 0;
  constructor(public apiService: ApiService,
    public dialog: MatDialog,
    public nav: DefaultLayoutComponent,
    public sbar: MatSnackBar,
    private router: Router,
    public pop: PopupComponent,
    public formBuilder: FormBuilder,
    public currencyPipe: CurrencyPipe,
    private _fb: FormBuilder) {
    this.today = Date.now()
    console.log(Date.now())
    this.getspersonname();
    this.getBranch();

    this.params = _fb.group({
      prod: _fb.array([
        this.getProd()
      ])
    })
 

    // this.params=_fb.group({
    //   product:[''],
    //   rate:[''],
    //   gst:[]
    // })
    //   this.getCustomerDetails();
    // this.discount = this.formBuilder.group({
    //   disCount: []
    // })

    // this.paidamount = this.formBuilder.group({
    //   paidAmount: []
    // })


    this.saveBilling = _fb.group({




      paymenttype: [''],
      salesperson: [''],
      paidAmount: [''],
      paymentStatus: ['']


    })


    this.cust = _fb.group({

      custmername: [''],
      custmerphone: [''],

      customeremail: ['']
    })



  }
  callDiscount() {

    //   console.log(this.discount.value);

  }

  getBranch() {
    this.apiService.retriveData("/branchs/branch").then(bname => {
      console.log(bname)
      this.bname = bname
      console.log(this.bname)
    })
  }
  getspersonname() {
    this.apiService.retriveData("/salespersons/salesperson").then(firstname => {
      // console.log(branch)
      this.firstname = firstname
      console.log(this.firstname)
      // console.log(this.branchid)
    })
  }

  addorderRegister() {



    // this.apiService.getData('/addorders/addorder', JSON.stringify(this.form.value)).then(d => {
    //   this.result = d;
    //   console.log(this.result);

    //   if ( this.result.success === true) {
    //     this.pop.snakbar('Addorder Added', 'Successfully');

    //   } else {
    //   //  this.pop.snakbar('Brand Register', 'Failed');
    //     this.pop.snakbar('Addorder ID or Name is Already Exists', 'Failed');

    //   //  alert('Brand Id or Name is Already Exists');
    //   }
    // //   this.registerForm.reset();

    //   this.showAddorder();
    // });
  }

  temp: any;


  logoGetting(value) {
    console.log(value)
    let data = {
      bname: value
    }
    this.apiService.getData('/branchs/search', data).then(disLogo => {
      console.log(disLogo);
      this.temp = disLogo;
      console.log(this.temp.shop_logo);

      this.branchOfLogo = this.temp.shop_logo;

    });

  }
  saveBill() {
   
    Object.assign(this.result , this.cust.get('custmerphone').value)
    console.log(this.result)
    this.apiService.getData('/customers/customer' , this.result).then(d=> {
      console.log(d)
    })

    console.log(this.params.value.prod.value)
    console.log(this.params.value.prod[0].barcode)
    console.log(this.params.value.prod[0].amount)

    // this.logoGetting(this.branch);

    let body = {
      orderdate: this.result.orderdate,
      custmername: this.result.custmername,
      custmeremail: this.result.custmeremail,
      custmerphone: this.result.custmerphno,
      productdetails: this.params.value.prod,
      invoice_no: this.invoice
    }
    console.log(this.saveBilling.value)
    Object.assign(body, this.saveBilling.value)
    Object.assign(body, this.bill)
    // Object.assign(body , this.form.)
    Object.assign(body, { balance: this.balance })
    console.log(body)

    console.log(this.form.value)
    this.apiService.getData('/addorders/addorder', body).then(Ordersent => {
      this.billrec = Ordersent;
      console.log(this.billrec)
      if (this.billrec.success === true) {
        this.pop.snakbar('Invoice Added', 'Successfully');
        console.log(body.productdetails.length)

        let qty_size =
        {
          quantity: body.productdetails.length
        }

        console.log(qty_size)

        this.apiService.updateData('/stocks/updateQty/' + '5c0e3b8006f4de237c2ce3ab', qty_size).then(dataVisible => {
          console.log(dataVisible);
        })





        this.router.navigate(['/addorder']);
      } else {
        //  this.pop.snakbar('Curriculum Register', 'Failed');
        this.pop.snakbar('', 'Failed');

        //  alert('Curriculum Id or Name is Already Exists');
      }
      localStorage.removeItem("data")

    })
  }

  showAddorder() {
    this.apiService.retriveData('/addorders/addorder').then(displayAddorder => {
      this.display = displayAddorder;
      //  console.log(this.display);
      this.dataSource = new MatTableDataSource(this.display);
      //  console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  addProd() {

    const control = <FormArray>this.params.controls['prod'];
    control.push(this.getProd());
    this.position++;    //  console.log(this.params.value)



    this.form.reset()



  }
  deleteFieldValue(index) {
    const control = <FormArray>this.params.controls['prod'];
    control.removeAt(index);
  }
  public updateTotalUnitPrice(prod: any) {
    // get our units group controll
    const control = <FormArray>this.params.controls['prod'];
    // before recount total price need  to be reset. 
    this.totalSum = 0;
    this.totalgst = 0;
    this.totaldis = 0;
    //  this.totaldis = 0;
    this.printSection = []
    for (let i in prod) {
      let disc = (prod[i].rate * prod[i].qty);
      let dd = (prod[i].rate * prod[i].dis / 100)
      let totalUnitPrice = (disc - dd);
      let gst = ((prod[i].rate * prod[i].gst) / 100);
      // now format total price with angular currency pipe
      let totalUnitPriceFormatted = this.currencyPipe.transform(totalUnitPrice, 'INR', 'symbol-narrow', '1.2-2');
      let disco = this.currencyPipe.transform(dd, 'INR', 'symbol-narrow', '1.2-2');
      let gstFormatted = this.currencyPipe.transform(gst, 'INR', 'symbol-narrow', '1.2-2');
      // update total sum field on unit and do not emit event myFormValueChanges$ in this case on units
      control.at(+i).get('amount').setValue(totalUnitPriceFormatted, { onlySelf: true, emitEvent: false });
      control.at(+i).get('disrupe').setValue(disco, { onlySelf: true, emitEvent: false });


      control.at(+i).get('gstrpe').setValue(gstFormatted, { onlySelf: true, emitEvent: false });

      this.printSection.push({
        barcode: prod[i].barcode,
        product: prod[i].product,
        rate: prod[i].rate,
        amount: prod[i].amount,
        gstrpe: gstFormatted,
        qty: prod[i].qty,
        disrupe: disco,


        calgst: this.currencyPipe.transform(gst / 2, 'INR', 'symbol-narrow', '1.2-2')
      })
      //   console.log(gstFormatted)
      //    console.log(this.printSection)
      // update total price for all units

      this.totalSum += totalUnitPrice;
      this.totalgst += gst;
      this.totaldis += dd

      // this.totaldis += dd;
      let spiltGst = this.totalgst / 2;
      // let dis=this.totalSum-this.grandTotal+this.totalgst;


      this.bill = {
        disCount: (prod[i].rate * prod[i].qty / 100),
        sub_total: this.totalSum,
        cgst: spiltGst,
        sgst: spiltGst,
        grandtotal: this.totalSum + this.totalgst,

        branch: this.branchDetails.storename
      }
      //   console.log(this.totalgst)
    }



  }







  getProd() {
    return this._fb.group({
      amount: [''],
      barcode: [''],
      product: [''],
      qty: [''],
      dis: [''],
      disrupe: [''],
      rate: [''],
      gst: [''],
      gstrpe: ['']
    })
  }
  changes() {

  }
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }
  isFieldValid(field: string): any {
    throw new Error("Method not implemented.");
  }

  logoDisplay: any;

  print() {

    console.log(this.branchOfLogo);
    this.logoDisplay = 'http://localhost:3001/logo/' + this.branchOfLogo;
    console.log(this.logoDisplay);
    console.log(this.amtInWords)
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();


  }

  customerRegister() {
    let body1 = {
      custmername: this.result.custmername,
      custmerphno: this.result.custmerphno,
      custmeremail: this.result.custmeremail,



    }
    console.log(body1)
    this.apiService.getData('/customers/customer', body1).then(Ordersent1 => {
      this.savecust = Ordersent1;
      console.log(this.savecust)
      if (this.savecust.success === true) {
        this.pop.snakbar('Customer Insert', 'Successfully');

      } else {
        //  this.pop.snakbar('Curriculum Register', 'Failed');
        this.pop.snakbar('Customer Insert', 'Failed');

        //  alert('Curriculum Id or Name is Already Exists');
      }
      // localStorage.removeItem("data")
    })
  }





  numberToEnglish(n, custom_join_character) {

    var string = n.toString(),
      units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words;

    var and = custom_join_character || 'and';

    /* Is number zero? */
    if (parseInt(string) === 0) {
      return 'zero';
    }

    /* Array of units as words */
    units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

    /* Array of tens as words */
    tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    /* Array of scales as words */
    scales = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion'];

    /* Split user arguemnt into 3 digit chunks from right to left */
    start = string.length;
    chunks = [];
    while (start > 0) {
      end = start;
      chunks.push(string.slice((start = Math.max(0, start - 3)), end));
    }

    /* Check if function has enough scale words to be able to stringify the user argument */
    chunksLen = chunks.length;
    if (chunksLen > scales.length) {
      return '';
    }
    /* Stringify each integer in each chunk */
    words = [];
    for (i = 0; i < chunksLen; i++) {
      chunk = parseInt(chunks[i]);
      if (chunk) {
        /* Split chunk into array of individual integers */
        ints = chunks[i].split('').reverse().map(parseFloat);

        /* If tens integer is 1, i.e. 10, then add 10 to units integer */
        if (ints[1] === 1) {
          ints[0] += 10;
        }

        /* Add scale word if chunk is not zero and array item exists */
        if ((word = scales[i])) {
          words.push(word);
        }

        /* Add unit word if array item exists */
        if ((word = units[ints[0]])) {
          words.push(word);
        }

        /* Add tens word if array item exists */
        if ((word = tens[ints[1]])) {
          words.push(word);
        }

        /* Add 'and' string after units or tens integer if: */
        if (ints[0] || ints[1]) {
          /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
          if (ints[2] || !i && chunksLen) {
            words.push(and);
          }
        }

        /* Add hundreds word if array item exists */
        if ((word = units[ints[2]])) {
          words.push(word + ' hundred');
        }
      }
    }
    return words.reverse().join(' ');
  }
}