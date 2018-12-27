import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockComponent } from './stock.component';

import { ViewStockComponent } from './view-stock.component';

import { UpdatestockComponent } from './updatestock.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: ' '
    },
    children: [
      {
        path: 'add-stock',
        component: StockComponent,
        data: {
          title: 'stock'
        }
      },
      {
        path: 'view-stock',
        component: ViewStockComponent,
        data: {
          title: 'View Shop'
        }
      },

      {
        path: 'updatestock',
        component: UpdatestockComponent,
        data: {
          title: 'View Shop'
        }
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule {}
