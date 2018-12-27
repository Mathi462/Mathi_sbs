import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentComponent } from './add-student.component';
import { ViewStudentComponent } from './view-student.component';






const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Student'
    },
    children: [
      {
        path: 'add-student',
        component: AddStudentComponent,
        data: {
          title: 'Add Student'
        }
      },
      {
        path: 'view-student',
        component: ViewStudentComponent,
        data: {
          title: 'View Student'
        }
      }

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
