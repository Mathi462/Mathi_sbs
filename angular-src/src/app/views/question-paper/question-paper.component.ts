import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatTableDataSource,  PageEvent, MatSort, MatPaginator } from '@angular/material';







@Component({
  selector: 'app-question-paper',
  templateUrl: './question-paper.component.html',
  styleUrls: ['./question-paper.scss']
})
export class QuestionPaperComponent implements OnInit {

  
  display: any;
  dataSource:any;
  displayedColumns: string[] = ['Question', 'Option1', 'option2', 'option3'];
  
  
  

  constructor(public apiService: ApiService) {
    this.showQuestions();
      
  }
  
  
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  showQuestions() {
    this.apiService.retriveData('/take_tests/taketest').then(displayQuestion => {
      this.display = displayQuestion;
      console.log(this.display);
      this.dataSource = new MatTableDataSource(this.display);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
        });
      }
     

      ngOnInit() {     }


      applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.dataSource.sort = this.sort;
      }

      
  


  

}
