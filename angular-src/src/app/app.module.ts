import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,



} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './views/popup/popup.component';
import { FieldErrorDisplayComponent } from './views/field-error-display/field-error-display.component';
import { LoginModule } from './views/login/login.module';


//import { ShopmanagerComponent } from './views/shopmanager/shopmanager.component';
//import { AddorderComponent } from './views/addorder/addorder.component';
//import { ReportsComponent } from './views/reports/reports.component';
//import { PurchasereturnComponent } from './views/purchasereturn/purchasereturn.component';
//import { SalereturnComponent } from './views/salereturn/salereturn.component';
//import { ServiceComponent } from './views/service/service.component';
//import { ExpenseComponent } from './views/expense/expense.component';
//import { SalespersonComponent } from './views/salesperson/salesperson.component';



















@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    HttpClientModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    BrowserAnimationsModule,
    LoginModule,
    

  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    // LoginComponent,
    
    RegisterComponent,
    PopupComponent,
    
    
   // ShopmanagerComponent,
    //AddorderComponent,
    //ReportsComponent,
   // PurchasereturnComponent,
   //SalereturnComponent,
   // ServiceComponent,
   // ExpenseComponent,
    //SalespersonComponent,
    





  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,

  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
