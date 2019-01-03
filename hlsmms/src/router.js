import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// 引入登录组件
import Login from './views/Login.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
     component:Login
    },
    {
      path: '/useradd',
      //异步加载：懒加载     
      component: () => import(/* webpackChunkName: "useradd" */ './views/UserAdd.vue')
    },
    {
      path: '/userlist',  
      component: () => import(/* webpackChunkName: "userlist" */ './views/UserList.vue')
    },
    {
      path: '/userpwdedit',  
      component: () => import(/* webpackChunkName: "userpwdedit" */ './views/UserPwdEdit.vue')
    },
    {
      path: '/pointslist',  
      component: () => import(/* webpackChunkName: "pointslist" */ './views/PointsList.vue')
    },
    {
      path: '/pointsadd',  
      component: () => import(/* webpackChunkName: "pointsadd" */ './views/PointsAdd.vue')
    },
    {
      path: '/goodslist',  
      component: () => import(/* webpackChunkName: "goodslist" */ './views/GoodsList.vue')
    },
    {
      path: '/goodsadd',  
      component: () => import(/* webpackChunkName: "goodsadd" */ './views/GoodsAdd.vue')
    },
    {
      path: '/stocklist',  
      component: () => import(/* webpackChunkName: "stocklist" */ './views/StockList.vue')
    },  
    {
      path: '/stockadd',  
      component: () => import(/* webpackChunkName: "stockadd" */ './views/StockAdd.vue')
    },
    {
      path: '/shipmentlist',  
      component: () => import(/* webpackChunkName: "shipmentlist" */ './views/ShipmentList.vue')
    },
    {
      path: '/shipmentchu',  
      component: () => import(/* webpackChunkName: "shipmentchu" */ './views/ShipmentChu.vue')
    },
    {
      path: '/shipmenttui',  
      component: () => import(/* webpackChunkName: "shipmenttui" */ './views/ShipmentTui.vue')
    },
    {
      path: '/recordsell',  
      component: () => import(/* webpackChunkName: "recordsell" */ './views/RecordSell.vue')
    },
    {
      path: '/recordstock',  
      component: () => import(/* webpackChunkName: "recordstock" */ './views/RecordStock.vue')
    },
    {
      path: '/memberlist',  
      component: () => import(/* webpackChunkName: "memberlist" */ './views/MemberList.vue')
    },
    {
      path: '/memberadd',  
      component: () => import(/* webpackChunkName: "memberadd" */ './views/MemberAdd.vue')
    },
  ]
})
