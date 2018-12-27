import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { FacultyForumComponent } from './faculty-forum.component';
import { StudentForumComponent } from './student-forum.component';
import { ExternalForumComponent } from './external-forum.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'forum'
    },
    children: [
      {
        path: 'faculty-forum',
        component: FacultyForumComponent,
        data: {
          title: 'faculty-forum'
        }
      },
      {
        path: 'student-forum',
        component: StudentForumComponent,
        data: {
          title: 'Student Forum'
        }
      },
      {
        path: 'external-forum',
        component: ExternalForumComponent,
        data: {
          title: 'External Forum'
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule {}
