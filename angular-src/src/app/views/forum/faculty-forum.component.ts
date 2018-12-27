import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum',
  templateUrl: './faculty-forum.component.html',

})
export class FacultyForumComponent implements OnInit {

  messages = [];
  constructor() { }

  ngOnInit() {
  }
  addMessage(newMessage: string) {
    if (newMessage) {
      this.messages.push(newMessage);
    }
  }

}
