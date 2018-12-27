import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PageEvent, MatSort,  MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { PopupComponent } from '../popup/popup.component';




@Component({
  selector: 'app-question-paper',
  templateUrl: './display-qus-paper.html',
  styleUrls: ['./question-paper.scss']

})
export class DisplayQuspaperComponent implements OnInit {
  display: any;
  dataSource:any;
  displayedColumns: string[] = ['subject', 'examtitle', 'userby','edit','delete'];
  delete: any;

  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  


  constructor(public apiService: ApiService, public sbar: MatSnackBar,
    public pop: PopupComponent) {
    this.showExamDetails();
  }

  ngOnInit() {  }

  showExamDetails() {
    this.apiService.retriveData('/exam_details/exam_detail').then(displayQuestion => {
      this.display = displayQuestion;
      console.log(this.display);
      this.dataSource = new MatTableDataSource(this.display);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(value) {
    console.log(value);
  }

  deleteExamDetails(value) {
    console.log(value);
    this.apiService.deleteData('/exam_details/exam_detail/' + value).then(del => {
      this.delete = del;
      this.pop.snakbar('Exam Deleted', 'Successfully');
      this.showExamDetails();
    });
  }
}


