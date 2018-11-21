import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 权限设置不在这里设置，这里只是表示路由渲染，
export const asyncRouterMap = [

  {
    path: '/permission',
    component: Layout,
    meta: {
      title: '权限',
      icon: 'example',
      roles: ['admin123', 'editor']
    },
    children: [
      {
        path: 'A',
        component: () => import('@/views/A/index'),
        name: 'A',
        meta: { title: 'A', icon: 'icon', noCache: true, roles: ['admin123'] }
      },
      {
        path: 'B',
        component: () => import('@/views/B/index'),
        name: 'B',
        meta: { title: 'B', icon: 'icon', noCache: true, roles: ['editor'] }
      },
      {
        path: 'C',
        component: () => import('@/views/C/index'),
        name: 'C',
        meta: { title: 'C', icon: 'icon', noCache: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
