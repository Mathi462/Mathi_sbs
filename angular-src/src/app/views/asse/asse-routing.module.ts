import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsseComponent } from './asse.component';


import { ViewasseComponent } from './view-asse.component';

import { UpdateasseComponent } from './updateasse.component';

const routes: Routes = [
  {
    path: '',
    
    children: [
      {
        path: 'add-asse',
        component: AsseComponent,
       
      },
      {
        path: 'view-asse',
        component: ViewasseComponent,
      
      },

      {
        path: 'updateasse',
        component: UpdateasseComponent,
       
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsseRoutingModule {}
