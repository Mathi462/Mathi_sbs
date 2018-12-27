import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgForm, NgModel, FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, PageEvent, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DefaultLayoutComponent } from '../../containers';
import { PopUP } from '../hero';
import { PopupComponent } from '../popup/popup.component';
import { CurrencyPipe } from '@angular/common';
import { ValueTransformer } from '@angular/compiler/src/util';




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
  selector: 'app-editreturn',
  templateUrl: './editreturn.component.html',

})

export class EditreturnComponent implements OnInit {
  discount: FormGroup;

  grandTotal: any;
  grand: any;
  balance: any;
  para: any;
  acc: any=[];

  amtInWords: any = "";
  discountpercentage: any;
  paidAmount: any;
  orderdate: any;
  paymentstatus: any;

 
  paymenttype: any;
  position : any = 0;
  salesperson: any;
  branch:any;
  message: any;
  branchname: any;
  searchedProducts: any = []



  ngOnInit() {
    const myFormValueChanges$ = this.params.controls['prod'].valueChanges;
    myFormValueChanges$.subscribe(prod => this.updateTotalUnitPrice(prod));


    this.para = localStorage.getItem("data");
    this.para = JSON.parse(this.para)
    console.log(this.para)
    const controlArray = <FormArray> this.params.controls['prod'];
    controlArray.removeAt(0)
    for (let i = 0; i < this.para.productdetails.length; i++) {
      this.acc ={
        amount: this.para.productdetails[i].amount,
        barcode: this.para.productdetails[i].barcode,
        dis:this.para.productdetails[i].dis,
        // disrupe:this.para.productdetails[i].disrupe,
        gst: this.para.productdetails[i].gst,
        // gstrpe: this.para.productdetails[i].gstrpe,
        product: this.para.productdetails[i].product,
        qty: this.para.productdetails[i].qty,
        rate: this.para.productdetails[i].rate
      }
      console.log(this.acc)
     
      
      controlArray.push(this.setProd(this.acc))
      console.log(controlArray)
    }
    
    // this.apiService.getData('/customers/search',{customerphno :fo })
    this.form = this.formBuilder.group({
      customerphno: [''],
      orderdate: ['']
    });
    // this.discount = this.formBuilder.group({
    //   disCount: ['']
    // });
    this.saveBilling.controls['disCount'].valueChanges.subscribe(
      (value) => {
        this.grandTotal = value * this.totalSum / 100
      }
    )
    this.saveBilling.controls['disCount'].valueChanges.subscribe(
      (value) => {
        this.grand = this.totalSum - this.grandTotal + this.totalgst
      }
    )
    console.log(this.para.subtotal)
    this.saveBilling.controls['disCount'].setValue(this.para.discount)
    this.saveBilling.controls['paidAmount'].setValue(this.para.paid)
    this.saveBilling.controls['paymenttype'].setValue(this.para.paymenttype)
    this.saveBilling.controls['paymentStatus'].setValue(this.para.paymentstatus)
    this.form.controls['orderdate'].setValue(this.para.orderdate)
    this.totalSum = this.para.subtotal
    // this.paidamount = this.formBuilder.group({
    //   paidAmount: ['']
    // })



    // this.saveBilling.controls['disCount'].valueChanges.subscribe(
    //   (value) => {

    //     this.discountpercentage = value
    //   }
    // )
    this.saveBilling.controls['paidAmount'].valueChanges.subscribe(
      (value) => {
        this.paidAmount = value
      }
    )
    this.saveBilling.controls['paidAmount'].setValue(this.para.paid)


    this.saveBilling.controls['paidAmount'].valueChanges.subscribe(
      (value) => {
        this.balance = this.totalSum + this.totalgst - this.grandTotal - value

        this.amtInWords = this.numberToEnglish(value, null)
        console.log(this.amtInWords)
      }
    )
    this.form.controls['orderdate'].valueChanges.subscribe(
      (value) => {
        this.orderdate = value
      }
    )

    this.saveBilling.controls['paymentStatus'].valueChanges.subscribe(
      (value) => {
        this.paymentstatus = value
      }
    )

    this.saveBilling.controls['paymenttype'].valueChanges.subscribe(
      (value) => {
        this.paymenttype = value
      }
    )
    this.saveBilling.controls['message'].valueChanges.subscribe(
      (value) => {
        this.message = value
      }
    )

    this.saveBilling.controls['salesperson'].valueChanges.subscribe(
      (value) => {
        this.salesperson = value
      }
    )
    this.saveBilling.controls['branch'].valueChanges.subscribe(
      (value) => {
        this.branch = value
      }
    )


    this.saveBilling.controls['branchname'].valueChanges.subscribe(
      (value) => {
        this.branchname = value
      }
    )

    // this.form.controls['customerphno'].valueChanges.subscribe(
    //   (selectedValue) => {
    //     this.apiService.getData("/customers/search", { customerphno: selectedValue }).then(d => {
    //       this.result = d

    //       if (selectedValue == "") {
    //         this.result = {
    //           customerfname: '',
    //           customerlname: '',
    //           customerphno: '',
    //           customeraddres: ''
    //         }
    //       }
    //       console.log(this.result)
    //       console.log(selectedValue);
    //     }
    //     );
    //   })

  }

  arr: {};
  result: any = [{

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

  // discount: FormGroup;

  // cust: any={
  //   customerfname :'',
  //   customerphno:'',
  //   customeraddres:''

  // };
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
    discountpercentage: '',
    paymentstatus: '',
   
    firstname: '',
    bname:'',
    paymenttype: '',
    salesperson: '',
    message: '',
    branch: '',



  };
  saveBilling: FormGroup;
  customer: {};
  firstname: any = [{}];
  bname:any=[{}];
  showData = false;
  billrec: any;
  savecust: any;
  dataSource: any;

  gstDisplay: any;

  cust: FormGroup;

  today:any;
  date=new FormControl(new Date())

  displayedColumns: string[] = ['customerfname', 'customerlname', 'customerphno', 'customeraddres', 'ok'];

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
    public pop: PopupComponent,
    public formBuilder: FormBuilder,
    public currencyPipe: CurrencyPipe,
    private _fb: FormBuilder) {

      this.today=Date.now()
      console.log(Date.now())
          this.getspersonname();
          this.getBranch();

    this.params = _fb.group({
      prod: _fb.array([
        this.getProd()
      ])
    })
    // this.form = _fb.group({
    //   customerfname: [''],
    //   customeraddres: [''],
    //   customerphno: ['']
    // })
    //   this.getCustomerDetails();
    // this.discount = this.formBuilder.group({
    //   disCount: []
    // })

    // this.paidamount = this.formBuilder.group({
    //   paidAmount: []
    // })


    this.saveBilling = _fb.group({
      // sub_total:['']
      // cgst:[''],
      // sgst:[''],
      disCount: [''],
      // totalamount:[''],
      grandtotal: [''],
      paidAmount: [''],
      paymenttype: [''],
      salesperson: [''],
      branch:[''],
      message: [''],
      branchname: [''],
      balance: [''],
      paymentStatus: ['']
    })


    this.cust = _fb.group({

      custname: [''],
      custphone: [''],
      custaddress: ['']
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
  saveBill() {




    // let discount = {
    //   discount: this.grandTotal

    // }
    // let grand1 = {
    //   grand1: this.grand
    // }
    // let paidAmount = {
    //   paidAmount: this.paidAmount
    // }
    // let balance = {
    //   balance: this.balance
    // }

    // let custname={
    //   custname:this.result.customerfname
    // }

    // let custphone={
    //   custphone:this.result.customerphno
    // }
    // let custaddress={
    //   custaddress:this.result.customeraddres
    // }


    // console.log(this.saveBilling,this.cust)
    // Object.assign(this.bill, discount, grand1, paidAmount, balance)

    // Object.assign(this.custdetail, custname, custphone,custaddress)

    // console.log(this.bill);
    // console.log(this.custdetail);

    let body = {
      invoice: '123',
      orderdate: this.orderdate,
      branchname: this.branchname,
      custmername: this.result.customerfname,
      custmeraddress: this.result.customeraddres,
      custmerphone: this.result.customerphno,
      branch:this.branch,
      subtotal: this.totalSum,
      cgst: this.totalgst / 2,
      sgst: this.totalgst / 2,
      totalamount: this.totalSum + this.totalgst,
      discount: this.totaldis,

      paid: this.paidAmount,
      balance: this.balance,
      paymentstatus: this.paymentstatus,
      paymenttype: this.paymenttype,
      salesperson: this.salesperson,
      message: this.message,
      productdetails: this.params.value.prod
    }
    console.log(body)
   
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
    //  console.log(this.params.value)
  }
  deleteFieldValue(index) {
    const control = <FormArray>this.params.controls['prod'];
    control.removeAt(index);
  }
  public updateTotalUnitPrice(prod: any) {
    // get our units group controll
    const control = <FormArray>this.params.controls['prod'];
    // before recount total price need to be reset. 
    this.totalSum = 0;
    this.totalgst = 0;
    this.totaldis = 0;
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
      // control.at(+i).get('disrupe').setValue(disco, { onlySelf: true, emitEvent: false });


      // control.at(+i).get('gstrpe').setValue(gstFormatted, { onlySelf: true, emitEvent: false });

      this.printSection.push({
        product: prod[i].product,
        rate: prod[i].rate,
        amount: totalUnitPriceFormatted,
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
        dis: (prod[i].rate * prod[i].qty / 100),
        total: this.totalSum,
        cgst: spiltGst,
        sgst: spiltGst,
        totaldis: this.totaldis,
        totalAmt: this.totalSum + this.totalgst,




      }
      //   console.log(this.totalgst)
    }
    // this.totalgst= 0;
    // for (let i in prod) {
    //   let total = (prod[i].rate*prod[i].gst/100);
    //   // now format total price with angular currency pipe
    //   let totalUnitPriceFormatted = this.currencyPipe.transform(total, 'INR', 'symbol-narrow', '1.2-2');
    //   // update total sum field on unit and do not emit event myFormValueChanges$ in this case on   units
    //   control.at(+i).get('gst').setValue(totalUnitPriceFormatted, {onlySelf: true, emitEvent: false});
    //   // update total price for all units
    //   this.totalgst += total;
    // }
  }
  //   getTotal() {
  //     let total = 0;
  //     for (var i = 0; i < this.totalSum; i++) {
  //         if (this.totalSum[i].amount) {
  //             total += this.totalSum[i].amount;
  //             this.totalamount = total;
  //         }
  //     }
  //     return total;
  // }





  setProd(acc){
    return this._fb.group({
      amount: [acc.amount],
      barcode: [acc.barcode],
      product: [acc.product],
      qty: [acc.qty],
      rate: [acc.rate],
      gst: [acc.gst],
      dis: [acc.dis],
    })
  }

  getProd() {
    return this._fb.group({
      amount: [''],
      barcode: [''],
      product: [''],
      qty: [''],
      rate: [''],
      gst: [''],
      dis: [''],
    })
  }
  changes() {

  }

  

  print() {

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