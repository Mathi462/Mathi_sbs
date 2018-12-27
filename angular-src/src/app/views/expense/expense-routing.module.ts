import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseComponent } from './expense.component';
//import { ViewExpenseComponent } from './viewexpense.component';



const routes: Routes = [
  {
    path: '',
    component:ExpenseComponent,
    data: {
      title: 'Add expense'
    }
  },
  // {
  //   path: '',
  //   component:ViewExpenseComponent,
  //   data: {
  //     title: 'View expense'
  //   }
  // },
    
    // {
    //   path: '',
    //   component: ViewExpenseComponent,
    //   data: {
    //     title: 'View expense'
    //   }
    // }
     
      
    ]

  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule {}
