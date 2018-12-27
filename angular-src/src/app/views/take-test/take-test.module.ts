// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TakeTestComponent } from './take-test.component';
import { TakeTestRoutingModule } from './take-test-routing.module';
import { MatCardModule,  MatGridListModule, MatIconModule, MatDividerModule, MatRadioModule, MatButtonModule, MatCheckboxModule,  } from '@angular/material';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from '../popup/popup.component';
import { PopupModule } from '../popup/popup.module';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TakeTestRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule, MatCheckboxModule, MatCardModule, MatRadioModule,
    PopupModule
    
    
  ],
  entryComponents: [],
  declarations: [
    TakeTestComponent
    
    
    ],
    providers: [
      ApiService,
      HttpClientModule,
      PopupComponent
    ]
})
export class TakeTestModule { }
