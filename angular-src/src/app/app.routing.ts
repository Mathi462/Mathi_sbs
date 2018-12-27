import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';


export const routes: Routes = [
  {
    path: 'dashboard',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'admin-profile',
        loadChildren: './views/admin-profile/admin-profile.module#AdminProfileModule'
      },
      {
        path: 'create-store',
        loadChildren: './views/create-store/create-store.module#CreateStoreModule'
      },
      

      {
        path: 'asse',
        loadChildren: './views/asse/asse.module#AsseModule'
      },

      
      {
        path: 'faculty',
        loadChildren: './views/faculty/faculty.module#FacultyModule'
      },
      {
        path: 'shopowner',
        loadChildren: './views/shopowner/shopowner.module#ShopownerModule'
      },
      {
        path: 'salesperson',
        loadChildren: './views/salesperson/salesperson.module#SalespersonModule'
      },
      {
        path: 'shopmanager',
        loadChildren: './views/shopmanager/shopmanager.module#ShopmanagerModule'
      },
	  {
        path: 'movestock',
        loadChildren: './views/movestock/movestock.module#MovestockModule'
      },
      {
        path: 'expense',
        loadChildren: './views/expense/expense.module#ExpenseModule'
      },
      {
        path: 'service',
        loadChildren: './views/service/service.module#ServiceModule'
      },
      {
        path: 'salereturn',
        loadChildren: './views/salereturn/salereturn.module#SalereturnModule'
      },
     
      {
        path: 'purchasereturn',
        loadChildren: './views/purchasereturn/purchasereturn.module#SalereturnModule'
      },
      {
        path: 'reports',
        loadChildren: './views/reports/reports.module#ReportsModule'
      },
      {
        path: 'addorder',
        loadChildren: './views/addorder/addorder.module#AddorderModule'
      },
      {
        path: 'customer',
        loadChildren: './views/customer/customer.module#CustomerModule'
      },
      {
        path: 'branch',
        loadChildren: './views/branch/branch.module#BranchModule'

      },
      {
        path: 'grade',
        loadChildren: './views/grade/grade.module#GradeModule'
      },
      {
        path: 'subjects',
        loadChildren: './views/subjects/subjects.module#SubjectsModule'
      },
      {
        path: 'take-test',
        loadChildren: './views/take-test/take-test.module#TakeTestModule'
      },
      {
        path: 'category',
        loadChildren: './views/category/category.module#CategoryModule'
      },
      {
        path: 'manufacturer',
        loadChildren: './views/manufacturer/manufacturer.module#ManufacturerModule'
      },
      {
        path: 'brand',
        loadChildren: './views/brand/brand.module#BrandModule'
      },
      {
        path: 'gst',
        loadChildren: './views/gst/gst.module#GstModule'
      },

      {
        path: 'colour',
        loadChildren: './views/colour/colour.module#ColourModule'
      },


      {
        path: 'product',
        loadChildren: './views/product/product.module#ProductModule'
      },

      {
        path: 'modelpd',
        loadChildren: './views/modelpd/modelpd.module#ModelpdModule'
      },

   
      {
        path: 'voucher',
        loadChildren: './views/voucher/voucher.module#VoucherModule'
      },
      {
        path: 'stock',
        loadChildren: './views/stock/stock.module#StockModule'
      },

    
      {
        path: 'question',
        loadChildren: './views/question/question.module#QuestionModule'
      },
      {
        path: 'question-paper',
        loadChildren: './views/question-paper/question-paper.module#QuestionPaperModule'
      },
      {
        path: 'security-question',
        loadChildren: './views/security-question/security-question.module#SecurityQuestionModule'
      },
      {
        path: 'change-password',
        loadChildren: './views/change-password/change-password.module#ChangePasswordModule'
      },
      {
        path: 'editreturn',
        loadChildren: './views/editreturn/editreturn.module#EditreturnModule'
      },
      // {
      //   path: 'updatestock',
      //   loadChildren: './views/updatestock/updatestock.module#UpdatestockModule'
      // },
      {
        path: 'forum',
        loadChildren: './views/forum/forum.module#ForumModule'
      },
      {
        path: '',
        loadChildren: './views/login/login.module#LoginModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
