import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { ForumRoutingModule } from './forum-routing.module';
import { StudentForumComponent } from './student-forum.component';
import { FacultyForumComponent } from './faculty-forum.component';
import { ExternalForumComponent } from './external-forum.component';
import { MatFormFieldModule, MatButtonModule, MatInputModule, MatChipsModule, MatNavList, MatListModule } from '@angular/material';

// Angular

@NgModule({
  imports: [
    CommonModule,
    ForumRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    MatListModule,

  ],
  declarations: [

    StudentForumComponent,
    FacultyForumComponent,
    ExternalForumComponent

  ]
})
export class ForumModule { }
