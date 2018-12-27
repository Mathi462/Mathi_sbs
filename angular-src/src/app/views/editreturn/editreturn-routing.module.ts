import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditreturnComponent } from './editreturn.component';



const routes: Routes = [
  {
    path: '',
    component: EditreturnComponent,
    data: {
      title: 'editreturn'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditreturnRoutingModule {}
