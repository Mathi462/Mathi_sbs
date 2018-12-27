import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  adminUrl: string;
  headerOptions: any;
  constructor(public http: HttpClient) {

  this.adminUrl = 'http://localhost:3001';

  }

  getData(endUrl, body) {
    return new Promise((res) => {
      this.headerOptions = new HttpHeaders();
      this.http.post(this.adminUrl + endUrl, body, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe(data => {
        res(data);
      }, err => {
        console.error(err);
      });
    });
  }
  
  getDataImage(endUrl, body) {
    return new Promise((res) => {
      // this.headerOptions = new HttpHeaders();
      this.http.post(this.adminUrl + endUrl, body).subscribe(data => {
        res(data);
      }, err => {
        console.error(err);
      });
    });
  }

  retriveData(endUrl) {
    return new Promise((res) => {
      this.headerOptions = new HttpHeaders();
      this.http.get(this.adminUrl + endUrl, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe(data => {
        res(data);
      }, err => {
        console.error(err);
      });
    });
  }

  deleteData(endUrl) {
    return new Promise((res) => {
      this.headerOptions = new HttpHeaders();
      this.http.delete(this.adminUrl + endUrl, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe(data => {
        res(data);
      }, err => {
        console.error(err);
      });
    });
  }


  updateData(endUrl, body) {
    return new Promise((res) => {
      this.headerOptions = new HttpHeaders();
      this.http.put(this.adminUrl + endUrl, body, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe(data => {
        res(data);
      }, err => {
        console.error(err);
      });
    });
  }

  // login(endUrl, body) {
  //   return new Promise((res) => {
  //     this.headerOptions = new HttpHeaders({

  //       'Content-Type': 'application/json',
  //       'Authorization':'JWT '+token,
        
  //     });
  //     this.http.post(this.adminUrl + endUrl, body,{headers:this.headerOptions}).subscribe(data => {
  //       res(data);
  //     }, err => {
  //       console.error(err);
  //     });
  //   });
  // }

}
