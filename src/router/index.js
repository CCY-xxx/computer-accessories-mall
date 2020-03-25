import Vue from 'vue'
import Router from 'vue-router'

import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuccess from '@/views/OrderSuccess'
import OrderList from '@/views/OrderList'
import UpdatePwd from '@/views/updatePwd'
import GoodDetail from '@/views/GoodDetail'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component:GoodsList,
    },
    {
      path: '/cart',
      name: 'Cart',
      component:Cart
    },
   
    {
      path: '/order',
      name: 'OrderList',
      component:OrderList
    },
   
    {
      path: '/goods',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/address',
      name: 'Address',
      component:Address
    },
    {
      path: '/orderConfirm',
      name: 'OrderConfirm',
      component:OrderConfirm
    },
    {
      path: '/updatePwd',
      name: 'UpdatePwd',
      component:UpdatePwd
    },
    {
      path: '/orderSuccess*',
      name: 'OrderSuccess',
      component:OrderSuccess
    },
    {
      path: '/goodDetail',
      name: 'GoodDetail',
      component:GoodDetail
    }
  ]
})
