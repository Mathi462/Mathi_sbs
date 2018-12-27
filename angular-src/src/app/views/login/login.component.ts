import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { strict, ok } from 'assert';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PopupComponent } from '../popup/popup.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loginForm: FormGroup;
  returnUrl: string;
  newLogin: any;
  login: any;
  loginData: any;
  // ngZone :NgZone;


  invoice: any;


  constructor(public apiService: ApiService, private router: Router,
    private formBuilder: FormBuilder, public ngZone: NgZone,
    public sbar: MatSnackBar, public pop: PopupComponent,
    public httpClient: HttpClient) {

    this.invoice = new Date().toLocaleString().replace('/', '')
    this.invoice = this.invoice.replace('/', '')
    this.invoice = this.invoice.replace(', ', '')
    this.invoice = this.invoice.replace(':', '')
    this.invoice = this.invoice.replace(':', '')
    console.log(this.invoice)

  }

  ngOnInit() {

    // this.form = this.formBuilder.group({
    //   email: [null, [Validators.required, Validators.email]],
    //   password: [null, Validators.required],

    // });

    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      // user_type: ['', Validators.required]
    });

  }

  // isFieldValid(field: string) {
  //   return !this.form.get(field).valid && this.form.get(field).touched;
  // }

  // displayFieldCss(field: string) {
  //   return {
  //     'has-error': this.isFieldValid(field),
  //     'has-feedback': this.isFieldValid(field)
  //   };
  // }

  // onSubmit(form: NgForm) {
  //   // console.log(this.form);
  //   // if (this.form.valid) {
  //   //   this.adminLogin();
  //   //   console.log('form submitted');
  //   //   // console.log(this.form.value);
  //   //   this.reset();
  //   // } else {
  //   //   this.validateAllFormFields(this.form);
  //   // }

  //   if (this.login != null) {
  //     localStorage.removeItem("user")
  //     // this.arr = form.value;
  //     // console.log(JSON.stringify( this.arr));
  //     // console.log(JSON.stringify( form.value));
  //     console.log(this.login)
  //     localStorage.setItem("user", this.login)
  //     this.ngZone.run(() => {
  //       this.router.navigateByUrl('/dashboard');
  //     });  // this.adminLogin();
  //   }

  // }

  // validateAllFormFields(formGroup: FormGroup) {
  //   Object.keys(formGroup.controls).forEach(field => {
  //     console.log(field);
  //     const control = formGroup.get(field);
  //     if (control instanceof FormControl) {
  //       control.markAsTouched({ onlySelf: true });
  //     } else if (control instanceof FormGroup) {
  //       this.validateAllFormFields(control);
  //     }
  //   });
  // }

  // reset() {
  //   this.form.reset();
  // }

  // adminLogin() {
  //   this.apiService.getData('/admins/authenticate', this.form.value).then(login => {
  //     // console.log(login);
  //     this.newLogin = login;
  //     if (this.newLogin.success === true) {
  //       localStorage.removeItem("user")
  //       // this.arr = form.value;
  //       // console.log(JSON.stringify( this.arr));
  //       // console.log(JSON.stringify( form.value));
  //       console.log(this.login)
  //       localStorage.setItem("user", this.login)

  //       this.router.navigate(['/dashboard']);
  //       localStorage.setItem('currentUser', JSON.stringify(login));

  //     } else {
  //       this.router.navigate(['/']);
  //     }
  //   });


  // }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
    else
      console.log('enter form')
  }

  loginCheck() {
    console.log(this.loginForm.value);

    let body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    }
    console.log(body);
    if (this.loginForm.value.user_type === 'admin') {
      console.log('Admin');

      this.apiService.getData('/admins/authenticate', body).then(adminlogin => {

        this.newLogin = adminlogin;
        console.log(this.newLogin);


        if (this.newLogin.success === true) {

          localStorage.removeItem("user")

          this.login = 'admin';
          console.log(this.login)
          localStorage.setItem("user", this.login)

          localStorage.setItem('currentUser', JSON.stringify(adminlogin));


          console.log(this.newLogin.admin.first_time_login)
          if (this.newLogin.admin.first_time_login == true) {
            console.log('ok');
            this.router.navigate(['/dashboard']);
          } else {
            console.log('not ok');

            this.router.navigate(['/change-password']);
          }



          this.pop.snakbar('Login', 'Successfully');

        } else {
          // this.router.navigate(['/']);
          console.log('not ok');
          this.pop.snakbar('Email or Password ', 'Wrong');
        }
      });


    }
    else if (this.loginForm.value.user_type === 'branch') {
      console.log('Branch');


      this.apiService.getData('/branchs/authenticate', body).then(branchlogin => {

        this.newLogin = branchlogin;
        console.log(this.newLogin);
        if (this.newLogin.success === true) {

          localStorage.removeItem("user")

          this.login = 'branch';
          console.log(this.login)
          localStorage.setItem("user", this.login)

          localStorage.setItem('currentUser', JSON.stringify(branchlogin));


          console.log(this.newLogin.branch.first_time_login)
          if (this.newLogin.branch.first_time_login == true) {
            console.log('ok');
            this.router.navigate(['/dashboard']);
          } else {
            console.log('not ok');

            this.router.navigate(['/dashboard']);
          }



          this.pop.snakbar('Login', 'Successfully');

        } else {
          this.router.navigate(['/']);
          this.newLogin.success===false
          this.pop.snakbar('User Name or Password ', 'Wrong');
        }
      });


    }
  }



  loginCheck1() {
    console.log(this.loginForm.value)

    this.apiService.getData('/all_login_users/authenticate', this.loginForm.value).then(branchlogin => {
      console.log(branchlogin)

  
      this.loginData = branchlogin;
    //  console.log(this.loginData.admin.user_type)
    if(this.loginData.success){
      this.login = this.loginData.admin.user_type
      if (this.loginData.admin.user_type === 'admin') {
        console.log('admin');

        console.log(this.loginData.admin.first_time_login)
        if (this.loginData.admin.first_time_login == true) {
          console.log('ok');
          this.router.navigate(['/dashboard']);
        } else {
          console.log('not ok');

          this.router.navigate(['/change-password']);
        }

        this.login = 'admin';
        console.log(this.login)
        localStorage.setItem("user", this.login)

        localStorage.setItem('currentUser', JSON.stringify(branchlogin));


        console.log(branchlogin)
        if (branchlogin == true) {
          console.log('ok');
          this.router.navigate(['/dashboard']);
        } else {
          console.log('not ok');

          this.router.navigate(['/dashboard']);
        }



        this.pop.snakbar('Login', 'Successfully');
      } 
 
      
     

      else if (this.loginData.admin.user_type === 'branch') {
        console.log('branch');
        this.login = 'branch';
        console.log(this.login)
        localStorage.setItem("user", this.login)

        localStorage.setItem('currentUser', JSON.stringify(branchlogin));


        console.log(branchlogin)
        if (branchlogin == true) {
          console.log('ok');
          this.router.navigate(['/dashboard']);
        } else {
          console.log('not ok');

          this.router.navigate(['/dashboard']);
        }



        this.pop.snakbar('Login', 'Successfully');

      } else
      if (this.loginData.admin.user_type === 'superadmin') {
        console.log('superadmin');
        this.login = 'superadmin';
        console.log(this.login)
        localStorage.setItem("user", this.login)

        localStorage.setItem('currentUser', JSON.stringify(branchlogin));


        console.log(branchlogin)
        if (branchlogin == true) {
          console.log('ok');
          this.router.navigate(['/dashboard']);
        } else {
          console.log('not ok');

          this.router.navigate(['/dashboard']);
        }



        this.pop.snakbar('Login', 'Successfully');
      
      }
      else {
      
       this.pop.snakbar('User Name or Password ', 'Wrong');
        alert();
      }
    }
    else {
      this.pop.snakbar("Invalid credentials", "")
    }
      localStorage.setItem("user", this.login)
      localStorage.setItem('currentUser', JSON.stringify(this.loginData.admin));


     


    });



  }




}
