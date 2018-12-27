

import { ApiService } from '../../services/api.service';
import { PageEvent, MatSnackBar } from '@angular/material';
import { PopupComponent } from '../popup/popup.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./faculty.scss']

})
export class AddFacultyComponent implements OnInit {

  form: FormGroup;
  result: any;
  arr: any;
  displayC: any;
  displayS: any;
  displayG: any;
  selectedOptions: any;




  constructor(public apiService: ApiService,
    public sbar: MatSnackBar,
    public pop: PopupComponent,
    private formBuilder: FormBuilder) {
   
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      

      id: [null, Validators.required],
      name: [null, Validators.required],
      dob: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      phone: [null, Validators.required],
      address: [null, Validators.required],
      pancard: [null, Validators.required],
      aadhaarcard: [null, Validators.required],
      driving_license: [null, Validators.required],
      previous_employment: [null, Validators.required],
      previous_employment_address: [null, Validators.required],
      previous_employment_mobile: [null, Validators.required]
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

  onSubmit() {
    console.log(this.form);
    if (this.form.valid) {
      this.salespersonRegister();
      console.log('form submitted');
      console.log(this.form.value);
      this.reset();
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  listSel(list) {
    this.selectedOptions = list.selectedOptions.selected.map(item => item.value);
    console.log(this.selectedOptions);
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


  salespersonRegister() {
    this.apiService.getData('/sales_managers/salesmanager', JSON.stringify(this.form.value)).then(d => {
      this.result = d;
      console.log(this.result);
      if (this.result.success === true) {
        this.pop.snakbar('SalesPerson Added', 'Successfully');
      } else {
        alert('Email id is Already Exists');
        this.pop.snakbar('SalesPerson Added', 'Faild');
      }


    });
  }

  

 

  
}


