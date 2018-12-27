import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-forum',
  templateUrl: './external-forum.component.html',
  styleUrls: ['./forum-style.scss']

})
export class ExternalForumComponent implements OnInit {


  arr: any;
  result: {};
  messages: {};

  constructor(public apiService: ApiService) {
    this.showMessage();
   }

  ngOnInit() {

  }



  // addMessage(newMessage: string) {
  //   if (newMessage) {
  //     this.messages.push(newMessage);
  //     console.log(this.messages);
  //   }
  // }



  onSubmit(form: NgForm) {
    this.arr = form.value;
    console.log(JSON.stringify(form.value));
    this.sendMessage();
    form.reset();
  }

  sendMessage() {
    this.apiService.getData('/chats/addChat', JSON.stringify(this.arr)).then(d => {
      this.result = d;
      this.showMessage();
      console.log(this.result);
    });
  }

  showMessage() {
    this.apiService.retriveData('/chats/addChat').then(displayMessage => {
      this.messages = displayMessage;
      console.log(this.messages);

    });
  }


}
