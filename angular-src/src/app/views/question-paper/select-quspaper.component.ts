import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-question-paper',
  templateUrl: './select-quspaper.html',
  styleUrls: ['./select-qus.scss']

})
export class SelectQuspaperComponent implements OnInit {

  step = 0;
  registerForm: FormGroup;
  displayS: any;
  display: any;
  dataSource: any;
  result: any;
  // selection: any;
  selection = new SelectionModel<questionModel>(true, []);
  questionModel: Array<questionModel> = [];
  displayedColumns: string[] = ['select', 'Question', 'Option1', 'option2', 'option3'];
  router: any;

  setStep(index: number) {
    this.step = index;

  }

  nextStep() {
    this.step++;

  }

  prevStep() {
    this.step--;

  }


  constructor(public apiService: ApiService, private formBuilder: FormBuilder,public sbar: MatSnackBar,
    public pop: PopupComponent,) {
    this.getSubject();
    this.showQuestions();
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      subject: [''],
      examtitle: [''],
     

    });

  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    let sel = this.selection;
    console.log(this.selection.selected);
    console.log(this.registerForm.value);
    this.createExam();
    this.selection.clear();
    this.step++;

  }

  createExam() {
    this.apiService.getData('/exam_details/exam_detail', JSON.stringify(this.registerForm.value)).then(d => {
      this.result = d;
      if ( this.result.success === true) {
        this.pop.snakbar('Exam Created', 'Successfully');
        this.reset();
      } else {
        this.pop.snakbar('Exam Name is Already Exists ', 'Failed');
       
      }
      console.log(this.result);
      
    });
  }

  reset() {
    this.registerForm.reset();
  }

  getSubject() {
    this.apiService.retriveData('/subjects/addSubject').then(displaySubject => {
      this.displayS = displaySubject;
      // console.log(this.displayS);
    });
  }

  showQuestions() {
    this.apiService.retriveData('/take_tests/taketest').then(displayQuestion => {
      this.display = displayQuestion;
      //  console.log(this.display);
      this.dataSource = new MatTableDataSource(this.display);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      // this.selection = new SelectionModel(this.display);
   //   console.log(this.selection);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;


  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));

  }

  openDialog(value) {
    // console.log(this.selection._selected);

   // console.log(value);
  }



}
