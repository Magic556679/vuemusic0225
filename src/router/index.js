//放路由的配置檔
import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/pages/Login'
import Products from '@/components/pages/Products'
import CustomerOrder from '@/components/pages/CustomerOrders';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
import Coupons from '@/components/pages/Coupons';
import Orders from '@/components/pages/Orders';
import Home from '@/components/Home'; 
import Store from '@/components/store';
import Product from '@/components/pages/product';
import Detail from '@/components/pages/detail' ;
import Orderinfor from '@/components/pages/order_infor';
import Ordername from '@/components/pages/order_name';
import Ordercheckout from '@/components/pages/order_checkout';
import Checkout from '@/components/pages/checkout';



//自訂的分頁元件
Vue.use(Router);
//會在 Vue 中增加<router-view/> 與 <router-link/> 這兩個組件

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
     path: '*',//*代表任意值 
     redirect: 'login',//使用 redirect 是將用戶導回正確的路徑 ，避免用戶進入不存在的頁面 

    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
  },
  {
    path: '/store',
    name: 'Store',
    component: Store,
    children:[
        {
            path: '',
            name: 'Product',
            component: Product,
        },
        {
            path: 'detail/:itemId',
            name: 'Detail',
            component: Detail,
        }
    ]
},
{
  path: '/checkout',
  name: 'checkout',
  component: Checkout,
  children:[
  {
      path: '',
      name: 'orderinfor',
      component: Orderinfor,
  },
  {
      path: 'order_name',
      name: 'ordername',
      component: Ordername,
  },
  {
  path: 'order_checkout/:orderId',
  name: 'ordercheckout',
  component: Ordercheckout,
  },
  ]
},
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'Customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder,
          
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        },
      ],
    }, 
     
  ],
});
