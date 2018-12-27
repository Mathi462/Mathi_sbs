import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateStoreComponent } from './create-store.component';



const routes: Routes = [
  {
    path: '',
    component: CreateStoreComponent,
    data: {
      title: 'Create Store'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateStoreRoutingModule {}
