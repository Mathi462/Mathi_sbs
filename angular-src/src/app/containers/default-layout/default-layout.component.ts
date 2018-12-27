// import { Component, Input } from '@angular/core';
// import { navItems } from './../../_nav';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './default-layout.component.html'
// })
// export class DefaultLayoutComponent {
//   public navItems = navItems;
//   public sidebarMinimized = true;
//   private changes: MutationObserver;
//   public element: HTMLElement = document.body;
//   constructor() {

//     this.changes = new MutationObserver((mutations) => {
//       this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
//     });

//     this.changes.observe(<Element>this.element, {
//       attributes: true
//     });
//   }
// }




import { Component, Input, OnInit } from '@angular/core';
// import { navItems } from './../../_nav';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { branchItems } from '../../branchnav';
import { navItems } from './../../_nav';
import { SuperAdminnavItems } from '../../superadminnav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  public navItems ;
 
  getUsr :  any;
  getStf: any;

  constructor(public apiService: ApiService,private router: Router) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  ngOnInit(){

    this.getUsr = localStorage.getItem('user')
    // this.getStf = localStorage.getItem('staff')
    console.log(this.getUsr)
    
    if(this.getUsr == "admin"){
      this.navItems = navItems;
    }
    
    else if(this.getUsr == "branch"){
      this.navItems = branchItems
      // this.router.navigateByUrl('/staff');
    }
    else if(this.getUsr == "superadmin"){
      this.navItems = SuperAdminnavItems
      // this.router.navigateByUrl('/staff');
    }
  }

  logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem("user");
    this.router.navigate(['/']);
  }
}

