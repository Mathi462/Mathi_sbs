import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFacultyComponent } from './add-faculty.component';
import { ViewFacultyComponent } from './view-faculty.component';





const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Shop '
    },
    children: [
      {
        path: 'add-faculty',
        component: AddFacultyComponent,
        data: {
          title: 'Add Shop'
        }
      },
      {
        path: 'view-faculty',
        component: ViewFacultyComponent,
        data: {
          title: 'View Shop'
        }
      }


    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultyRoutingModule {}
