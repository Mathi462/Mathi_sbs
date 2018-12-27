import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { PageEvent, MatSnackBar } from '@angular/material';
import { PopupComponent } from '../popup/popup.component';
import { Routes, RouterModule } from '@angular/router';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./student.scss']

})
export class AddStudentComponent implements OnInit {

  form: FormGroup;
  result: any;
  arr: any;
  displayC: any;
  displayS: any;
  displayG: any;
  displayF: any;
  selectedOptions: any;




  constructor(public apiService: ApiService,
    public sbar: MatSnackBar,
    public pop: PopupComponent,
    private formBuilder: FormBuilder) {
    this.getCurriculum();
    this.getSubject();
    this.getGrade();
    this.getFaculty_Name();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      address: [null, Validators.required],
      mobile: [null, Validators.required],
      curriculum: [null],
      grade: [null],
      subjects: [[null]],
      faculty_name: [[null]]
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
      this.studentRegister();
      console.log('form submitted');
      console.log(this.form.value);
      this.reset();
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  listSel(list) {
    this.selectedOptions = list.selectedOptions.selected.map(item => item.value);
  //  console.log(this.selectedOptions);
}

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
   //   console.log(field);
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


  studentRegister() {
    this.apiService.getData('/students/studentregister', JSON.stringify(this.form.value)).then(d => {
      this.result = d;
    //  console.log(this.result.success);
      if ( this.result.success === true) {
        this.pop.snakbar('Student Added', 'Successfully');
      } else {
        alert('Email Id is Already Exists');
        this.pop.snakbar('Student Register', 'Failed');

      }

    });
  }

  getCurriculum() {
    this.apiService.retriveData('/curriculums/addCurriculum').then(displayCurriculum => {
      this.displayC = displayCurriculum;
     // console.log(this.displayC);
    });
  }

  getSubject() {
    this.apiService.retriveData('/subjects/addSubject').then(displaySubject => {
      this.displayS = displaySubject;
    //  console.log(this.displayS);
    });
  }

  getGrade() {
    this.apiService.retriveData('/grades/addGrade').then(displayGrade => {
      this.displayG = displayGrade;
   //  console.log(this.displayG);
    });
  }

  getFaculty_Name() {
    this.apiService.retriveData('/facultys/facultyregister').then(displayFaculty => {
      this.displayF = displayFaculty;
  //   console.log(this.displayF);
    });

  }
}
