export const branchItems = [
    {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer',
        badge:
        {
            variant: 'info',

        }
    },
    {
        title: true,
        name: 'Login Branch'
    },

   
  { 
    name:  'Reports',
    url:'/reports',
    icon: 'icon-user',

  },
  {
    title: true,
    name: 'Shop Data'
  },
  
  {
    name:  'Add Shop Data',
    url:'/add-Product Added',
    icon: 'icon-basket',
    children:[
  {
    name: 'Category',
    url: '/category',
    icon: 'icon-cursor'
  },
  {
    name: 'Brand',
    url: '/brand',
    icon: 'icon-cursor'
  },
 
  {
    name: ' Model',
    url: '/modelpd',
    icon: 'icon-cursor'
  },
  
 
 
  {
    name: 'Manfacturer',
    url: '/manufacturer',
    icon: 'icon-cursor'
  },
  {
    name: 'Colour',
    url: '/colour',
    icon: 'icon-cursor'
  },

  {
    name: ' Product ',
    url: '/product',
    icon: 'icon-cursor'
  },

  {
    name: ' GST ',
    url: '/gst',
    icon: 'icon-cursor'
  },
 
]
  },
  {
    name: 'Stock & Accessories',
    url:'/add-Product Added',
    icon: 'icon-basket',
    children:[
      {
      name: 'Add Stocks',
      url: '/stock/add-stock',
    icon: 'icon-cursor'
      },
      // {
      //   name: 'Add Accessories',
      //   url: '/asse/add-asse',
      //   icon: 'icon-cursor'
      // },
      {
        name: 'View Stocks',
        url: '/stock/view-stock',
        icon: 'icon-cursor'
      },
    
      
      // {
      //   name: 'View Accessories',
      //   url: '/asse/view-asse',
      //   icon: 'icon-cursor'
      // },
    ]
  },

      {
        title: true,
        name: 'Billing'
      },
      {
        name: 'Billing',
        url: '/addorder',
        icon: 'icon-cursor'
      },
      {
        title: true,
        name: 'Expanse'
      },
      {
        name: 'Expense',
        url: '/expense',
        icon: 'icon-cursor'
      },
      {
        name: 'Service',
        url: '/service',
        icon: 'icon-cursor'
      },
      // {
      //   name: 'Create Questions',
      //   url: '/question-paper/create-question',
      //   icon: 'icon-book-open'
      // },
     
    {
      name:  'Returns',
      url:'/returns',
      icon: 'icon-user',
      children:[
    {
      name: 'Salereturn',
      url: '/salereturn',
      icon: 'icon-cursor'
    },
   
  ]
  },
  {
    name: 'Move Stock',
    url: '/movestock',
    icon: 'icon-cursor'
  },
]