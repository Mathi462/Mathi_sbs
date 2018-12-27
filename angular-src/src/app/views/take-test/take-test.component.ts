import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';



@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrls: ['./take-test.component.scss']
})
export class TakeTestComponent implements OnInit {

  rest: any;
  index: number;
  options: Array<string>;
  qLength: any;
  left = 0;
  theCheckbox = false;
  checkBoxValue: any;
  option1: boolean;
  chk1: boolean;
  chk2: boolean;
  chk3: boolean;
  chk4: boolean;
  chk5: boolean;
  userans: string;
  wrong_ans = 0;
  correct_ans = 0;
  submit: boolean;
  numans: any;
  indexv: any;
  evesvalue: string[] = [];
  evi = 0;
  submitevn: boolean;
  counter: any;
  interval: any;
  eventDate: any;
  eventTime: any;
  curDate: any;
  curTime: any;
  curDay: any;
  remTime: any;
  s: any;
  m: any;
  h: any;
  d: any;

  constructor(public apiService: ApiService) {
    this.getNotes();
    this.submit = true;
    this.submitevn = false;

    this.checkBoxValue = true;

    this.chk1 = true;
    this.chk2 = true;
    this.chk3 = true;
    this.chk4 = true;
    this.chk5 = true;

   // this.options = ['1', '2', '3', 'h', ' k'];
    console.log(this.checkBoxValue);

  }

  ngOnInit() {
  }

  getNotes() {
    this.apiService.retriveData('/take_tests/taketest').then(m => {
      this.index = 0;
      this.rest = m;
      this.qLength = (this.rest).length;
      this.left = this.qLength;
      console.log(this.rest);
      this.elmSel();

    });
  }

  getSingleQues(index: number) {

    return this.rest[index];
    
  }

  buttonClicked() {
    this.chk1 = true;
    this.chk2 = true;
    this.chk3 = true;
    this.chk4 = true;
    this.chk5 = true;
    this.checkUserAns();
    this.checkAnsCount();
    console.log('index : ' + this.index);
    if (this.index < (this.rest).length - 1) {
      this.index++;
      console.log('After increment  index : ' + this.index);
    } else {
      this.submit = false;
    }
    this.elmSelinbutton(this.index);
    this.evi = 0;
    this.left--;
  }
  
  answercheck(event, value) {
    console.log(value);
    return event.checked;

  }
  getChange1(event) {
    console.log('before chk1 :' + this.chk1);

    if (this.chk1) {
      this.chk1 = false;

      this.evesvalue[this.evi] = event.source.value;
      console.log('check box event fun ' + this.evesvalue[this.evi]);
      this.evi++;
    }


  }
  getChange2(event) {

    if (this.chk2) {
      this.chk2 = false;
      this.evesvalue[this.evi] = event.source.value;
      console.log('evesvalue evi: ' + this.evi);
      console.log('check box event fun ' + this.evesvalue[this.evi]);
      this.evi++;
    }

  }
  getChange3(event) {

    if (this.chk3) {
      this.chk3 = false;
      this.evesvalue[this.evi] = event.source.value;
      console.log('check box event fun ' + this.evesvalue[this.evi]);
      this.evi++;
    }


  }
  getChange4(event) {

    if (this.chk4) {
      this.chk4 = false;
      this.evesvalue[this.evi] = event.source.value;
      console.log('check box event fun ' + this.evesvalue[this.evi]);
      this.evi++;
    }


  }
  getChange5(event) {

    if (this.chk5) {
      this.chk5 = false;

      this.evesvalue[this.evi] = event.source.value;
      console.log('check box event fun ' + this.evesvalue[this.evi]);
      this.evi++;
    }

  }
  getRadChange1(event) {
    console.log('First radio button');
    if (this.chk1) {
      this.chk1 = false;
      this.evesvalue[this.evi] = event.source.value;
    }

  }
  getRadChange2(event) {

    if (this.chk2) {
      this.chk2 = false;
      this.evesvalue[this.evi] = event.source.value;
    }

  }
  getRadChange3(event) {

    if (this.chk3) {
      this.chk3 = false;
      this.evesvalue[this.evi] = event.source.value;
    }


  }
  getRadChange4(event) {

    if (this.chk4) {
      this.chk4 = false;
      this.evesvalue[this.evi] = event.source.value;
    }


  }
  getRadChange5(event) {

    if (this.chk5) {
      this.chk5 = false;
    }
    this.evesvalue[this.evi] = event.source.value;


  }

  checkUserAns() {

    console.log('index value' + this.index);
    console.log('number of answers:' + this.getSingleQues(this.index).Answers.length);
    console.log('REST data :' + this.getSingleQues(this.index).Answers[0] + this.getSingleQues(this.index).Answers[1]);
    console.log('evesvalue lenght:' + this.evesvalue.length);
    console.log('evsvalue content:' + this.evesvalue);
    if (this.getSingleQues(this.index).Answers.length === 2) {
      console.log('dual answers ' + this.evesvalue);
     
      if ((this.evesvalue[0] === this.getSingleQues(this.index).Answers[0]) && (this.evesvalue[1] === this.getSingleQues(this.index).Answers[1])) {
        console.log('correct ans in dua ans');
        this.correct_ans++;
        console.log(this.correct_ans);
      } else {
        console.log('wrong answer in dual answer');
        this.wrong_ans++;

      }
    } else {
      if (this.evesvalue[this.evi] === this.getSingleQues(this.index).Answers[0]) {
        console.log('correct ans');
        this.correct_ans++;
        console.log(this.correct_ans);
      } else {
        console.log('wrong answer');
        this.wrong_ans++;
      }
    }
  }

  elmSel() {
    this.numans = this.getSingleQues(this.index).Answers.length;
    console.log('number of ans:' + this.numans);

  }
  elmSelinbutton(indexv: any) {
    this.numans = this.getSingleQues(indexv).Answers.length;
    console.log('number of ans:' + this.numans);

  }
  checkAnsCount() {
    // console.log('number of ans in checkAnsCount:' + this.numans);
    if (this.numans === 2) {
      return true;
    } else if (this.numans === 1) {
      return false;
    }

  }
  Submitfunction() {
    console.log('subvar : ' + this.submitevn);
    if (!this.submitevn) {
      this.submitevn = true;

    } else {
      this.submitevn = false;

    }

  }
  divHide() {
    return this.submitevn;
  }


}
