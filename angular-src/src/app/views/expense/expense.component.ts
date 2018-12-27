import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgForm, NgModel, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, PageEvent, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DefaultLayoutComponent } from '../../containers';
import { PopUP } from '../hero';
import { PopupComponent } from '../popup/popup.component';




export interface DialogData {
  arr1: any;
  values: any;
}

// export interface DialogData {
//   id: string;
  
// }

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',

})

export class ExpenseComponent implements OnInit {
 
  
  Branchname : any =[{}];
  //gst : any =[{}];
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

  dataSource: any;

  displayedColumns: string[] = ['ExpenseType', 'Branchname','Amount','descripition','date','edit','delete'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  log: any;

  constructor(public apiService: ApiService ,
     public dialog: MatDialog,
      public nav: DefaultLayoutComponent ,
      public sbar: MatSnackBar,
      public pop: PopupComponent,
      public formBuilder: FormBuilder) {
        this.showExpense();
        
        this.getBranchname();
        //this.getGst()
       }
       getExpense(value) {
        console.log(value)
        this.openDialog(value)
          }
       
  ngOnInit() {
    this.form = this.formBuilder.group({
      
    
      ExpenseType:['',Validators.required],
      Branchname:['',Validators.required],
      Amount:['',Validators.required],
      descripition:['',Validators.required],
      date:['',Validators.required]
      
         });

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
  

  

  onSubmit(form: NgForm) {
    console.log(this.form);
    if (this.form.valid) {
      this.expenseRegister();
      console.log('form submitted');
      console.log(this.form.value);
      this.reset();
    } else {
      this.validateAllFormFields(this.form);
    }

  }

  base64textString = [];

onUploadChange(evt: any) {
  const file = evt.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }
}

handleReaderLoaded(e) {
  this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
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

  expenseRegister() {
    this.apiService.getData('/expenses/expense', JSON.stringify(this.form.value)).then(d => {
      this.result = d;
      console.log(this.result);

      if ( this.result.success === true) {
        this.pop.snakbar('Expense Added', 'Successfully');

      } else {
      //  this.pop.snakbar('Stock Register', 'Failed');
        this.pop.snakbar('Expense ID or Name is Already Exists', 'Failed');

      //  alert('GST Id or Name is Already Exists');
      }
    //   this.registerForm.reset();
    
      this.showExpense();
    });
  }



  showExpense() {
    this.apiService.retriveData('/expenses/expense').then(displayExpense => {
      this.display = displayExpense;
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
  
  deleteExpense(value) {
    console.log(value);
    this.apiService.deleteData('/expenses/expense/' + value._id).then(del => {
      this.delete = del;
      this.pop.snakbar('Expense Deleted', 'Successfully');
      this.showExpense();

    });
  }
  

  



  openDialog(value): void {
    console.log(value);
    this.nav.sidebarMinimized = false;
    const cData = {
     
      
      
      ExpenseType: value.ExpenseType,
      Branchname: value.Branchname,
      Amount: value.Amount,
      descripition: value.descripition,
      date: value.date
      
      
    };
    this.defRef = this.dialog.open(DialogContentExampleDialog, {
      width: '500px',
      data: { values: value, cData: cData }
    });

    this.defRef.afterClosed().subscribe(result => {
      if (result != null) {
        console.log(result.values._id);
        this.apiService.updateData('/expenses/expense/' + result.values._id, result.cData).then(d => {
          this.pop.snakbar('Expense Updated', 'Successfully');
          console.log(d);
          this.showExpense();
        });
      }
    });
  }

  // ViewDialog(value): void {
  //   console.log(value);
  //   this.nav.sidebarMinimized = false;
  //   const cData = {
     
      
      
  //     ExpenseType: value.ExpenseType,
  //     Branchname: value.Branchname,
  //     Amount: value.Amount,
  //     descripition: value.descripition,
  //     date: value.date
      
      
  //   };
  //   this.defRef = this.dialog.open(ViewExpense, {
  //     width: '500px',
  //     data: { values: value, cData: cData }
  //   });

  //   this.defRef.afterClosed().subscribe(result => {
  //     if (result != null) {
  //       console.log(result.values._id);
  //       this.apiService.updateData('/expenses/expense/' + result.values._id, result.cData).then(d => {
  //         this.pop.snakbar('Expense Updated', 'Successfully');
  //         console.log(d);
  //         this.showExpense();
  //       });
  //     }
  //   });
  // }

  // viewQues(value): void {
  //   this.id = value;
  //   console.log(this.id);
  //   const dialogRef = this.dialog.open(QuestionContentExampleDialog, {
  //     width: '500px',
  //     data: {id: this.id}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
      
  //   });
  // }

  
 

  getBranchname(){
    this.apiService.retriveData("/branchs/branch").then(branch => {
      console.log(branch)
      this.Branchname = branch
      console.log(this.Branchname)
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

};




@Component({

  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})

// tslint:disable-next-line:component-class-suffix
export class DialogContentExampleDialog {
  result: any;
  tmpData: any;

  datas : any;
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public apiService: ApiService) {

    // this.form.value.cid = this.data.values;
    this.tmpData = this.data;
    // this.datas =  this.tmpData.values
    console.log(this.tmpData);
  }

  onNoClick() {
    this.data.values = this.tmpData;
    console.log(this.data);
    this.dialogRef.close();

  }
  
}


// @Component({
//   selector: 'dialog-content-example-dialog',
//   templateUrl: 'view-expense.html',
// })
// export class QuestionContentExampleDialog {
//   display1: any;

//   constructor(
//     public dialogRef: MatDialogRef<DialogContentExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData, public apiService: ApiService,public dialog: MatDialog) {
// console.log(data);
// this.display1 = data
//  //  this.getQuestions(this.display1.id);
//   }

  
//     // getQuestions(value) {
//     //   this.apiService.retriveData('/questions/question/'+value).then(displayQuestion1 => {
//     //     this.display1 = displayQuestion1;
//     //     console.log(this.display1);
               
//     //       });
//     //     }
// }