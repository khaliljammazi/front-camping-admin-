import { MenuItem } from '../models/menu.model';

// menu items for vertcal and detached layout
const MENU_ITEMS: MenuItem[] = [
    { key: 'dashboards', label: 'Dashboards', isTitle: true },
    {
        key: 'dashboard',
        label: 'Dashboard',
        isTitle: false,
        icon: 'bar-chart-2',
        collapsed: true,
        link: '/admin/stat',
    },
    {
        key: 'Users',
        label: 'Users',
        isTitle: false,
        icon: 'users',
        collapsed: true,
        link: '/admin/users',
        
    },
 
   
    {
        key: 'Campaigns',
        icon: 'grid',
        label: 'Campaigns',
        isTitle: true,


    },
    
   
    {
        key: 'Camping-center',
        label: 'Camping-centers',
        isTitle: false,
        icon: 'home',
        collapsed: true,
        children: [

            {
                key: 'Camping-center',
                label: 'Camping-center',
                link: '/admin/camping-center',
                parentKey: 'Camping-center',
            },
            {
                key: 'Camping-center',
                label: 'Camping-center-feedbaks',
                link: '/admin/camping-center-feedbaks',
                parentKey: 'Camping-center',
            },


            
        ]
    },
    {
        key: 'Activities',
        label: 'Activities',
        isTitle: false,
        icon: 'activity',
        collapsed: true,
        children: [

            {
                key: 'Activities ',
                label: 'Activity',
                link: '/admin/activities',
                parentKey: 'Activities',
            },
            {
                key: 'Activities-feedbacks',
                label: 'Activities-feedbacks',
                link: '/admin/activity-feedback',
                parentKey: 'Activities',
            },
            
        ]
    },
   
    {
        key: 'Reservations ',
        label: 'Reservations',
        isTitle: false,
        icon: 'layers',
        collapsed: true,
        link: '/admin/reservations',
        
    },
    { key: 'posts', label: 'Posts', isTitle: true },
    {
        key: 'Posts',
        label: 'Posts',
        isTitle: false,
        icon: 'file-text',
        collapsed: true,
        link: '/admin/post',
    },

    
    

    { key: 'apps', label: 'Apps', isTitle: true },
    {
        key: 'ecommerces',
        label: 'Ecommerce',
        isTitle: false,
        icon: 'shopping-cart',
        collapsed: true,
        children: [
            {
                key: 'ecommerce-dashboard',
                label: 'Dashboard',
                link: 'ecommerces/dashboard',
                parentKey: 'apps-ecommerce',
            },/***************************************************************/
            {
                key: 'ecommerce-products',
                label: 'Products',
                link: 'ecommerces/products',
                parentKey: 'apps-ecommerce',
            },
           
           
           
            {
                key: 'ecommerce-orders',
                label: 'Orders',
                link: 'ecommerces/commands',
                parentKey: 'apps-ecommerce',
            },
         
           
        ],
    },


 
        ];
    


// menu items for two column menu layout 
const TWO_COl_MENU_ITEMS: MenuItem[] = [];

// menu items for horizontal layout
const HORIZONTAL_MENU_ITEMS: MenuItem[] = [];
  
          
        
    



export { MENU_ITEMS, TWO_COl_MENU_ITEMS, HORIZONTAL_MENU_ITEMS };