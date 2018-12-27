import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { PopupComponent } from '../popup/popup.component';


@Component({
  selector: 'app-security-question',
  templateUrl: './security-question.component.html',
  styleUrls: ['./security-question.component.scss'],

})
export class SecurityQuestionComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
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
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  update() {
    console.log(this.firstFormGroup.value)
    console.log(this.secondFormGroup.value)
    console.log(this.thirdFormGroup.value)

    let data = {
      question1: this.firstFormGroup.value.firstCtrl,
      question2: this.secondFormGroup.value.secondCtrl,
      question3: this.thirdFormGroup.value.thirdCtrl
    }
    console.log(data);

    console.log(localStorage.getItem('user'));

    this.user_type = localStorage.getItem('user')



    if (this.user_type == 'admin') {

      let item = JSON.parse(localStorage.getItem('currentUser'));
      console.log(item)
      this.user_id = item.admin.id;
      console.log(this.user_id)

      this.apiService.updateData('/admins/securityquestion/' + this.user_id, JSON.stringify(data)).then(d => {
        console.log(d);
        this.pop.snakbar('Security Question Uploaded', 'Successfully');
        this.router.navigate(['/dashboard']);
        
      });
    }
    else
      if (this.user_type == 'branch') {

        let item = JSON.parse(localStorage.getItem('currentUser'));
        console.log(item)
        this.user_id = item.branch.id;
        console.log(this.user_id)

        this.apiService.updateData('/branchs/securityquestion/' + this.user_id, JSON.stringify(data)).then(d => {
          console.log(d);
          this.pop.snakbar('Security Question Uploaded', 'Successfully');
          this.router.navigate(['/dashboard']);

        });
      }
  }
}
