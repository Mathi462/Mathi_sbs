
import { NgModule } from '@angular/core';


import { Routes, RouterModule } from '@angular/router';
import { MovestockComponent } from './movestock.component';


const routes: Routes = [
  {
    path: '',
    component: MovestockComponent,
    data: {
      title: 'Move Stock'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovestockRouting { }
