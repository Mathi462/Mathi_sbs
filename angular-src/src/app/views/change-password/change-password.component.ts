import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  user_type: any;
  user_id: any;
  constructor(public apiService: ApiService, private router: Router,
    private formBuilder: FormBuilder,
    public sbar: MatSnackBar, public pop: PopupComponent,
  ) {


  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

  passwodChange() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);

    let data = {
      password: this.firstFormGroup.value.firstCtrl
    }
    console.log(data);
    if (this.firstFormGroup.value.firstCtrl === this.secondFormGroup.value.secondCtrl) {
      console.log('password mating');

      console.log(localStorage.getItem('user'));

      this.user_type = localStorage.getItem('user')
      if (this.user_type == 'admin') {

        let item = JSON.parse(localStorage.getItem('currentUser'));
        console.log(item)
        this.user_id = item.admin.id;
        console.log(this.user_id)

        this.apiService.updateData('/admins/adminchangepassword/' + this.user_id, data).then(d => {
          console.log(d);
          this.pop.snakbar('Password Changed', 'Successfully');
          // this.router.navigate(['/security-question']);

        });
      }
      else
        if (this.user_type == 'branch') {

          let item = JSON.parse(localStorage.getItem('currentUser'));
          console.log(item)
          this.user_id = item.branch.id;
          console.log(this.user_id)

          // this.apiService.updateData('/branchs/securityquestion/' + this.user_id, data).then(d => {
          //   console.log(d);
            this.pop.snakbar('Password Updated', 'Successfully');
            // this.router.navigate(['/security-question']);

          // });
        }


    }
    else {
      console.log('password wrong');
    }
  }
}
