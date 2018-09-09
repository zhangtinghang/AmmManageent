import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  // { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/login', component: _import('login/index'), hidden: true },
  // { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard' }
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/blog',
    component: Layout,
    redirect: '/blog/list',
    meta: { title: 'blog', icon: 'form',
      roles: ['normal', 'admin', 'edit']
    },
    children: [
      {
        path: 'list',
        name: 'blogList',
        component: _import('blog/list/index'),
        meta: {
          title: 'blogList',
          icon: 'list',
          roles: ['normal', 'admin', 'edit']
        }
      },
      {
        path: 'edit',
        name: 'blogAdd',
        component: _import('blog/add/index'),
        meta: {
          title: 'blogAdd',
          icon: 'edit',
          roles: ['normal', 'admin', 'edit']
        }
      }
    ]
  },
  {
    path: '/portfolio',
    component: Layout,
    redirect: '/portfolio/list',
    meta: { title: 'portfolio', icon: 'component',
      roles: ['normal', 'admin', 'edit']
    },

    children: [
      {
        path: 'list',
        name: 'portfolioList',
        component: _import('portfolio/list/index'),
        meta: {
          title: 'portfolioList',
          icon: 'list',
          roles: ['normal', 'admin', 'edit']
        }
      },
      {
        path: 'create',
        name: 'portfolioEdit',
        component: _import('portfolio/add/create'),
        meta: {
          title: 'portfolioEdit',
          icon: 'edit',
          roles: ['normal', 'admin', 'edit']
        }
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    redirect: '/account/list',
    meta: { title: 'account', icon: 'people',
      roles: ['admin', 'edit']
    },
    children: [
      {
        path: 'list',
        name: 'accountList',
        component: _import('account/list/index'),
        meta: {
          title: 'accountList',
          icon: 'list',
          roles: ['admin', 'edit']
        }
      },
      {
        path: 'add',
        name: 'accountAdd',
        component: _import('account/add/index'),
        meta: {
          title: 'accountAdd',
          icon: 'edit',
          roles: ['admin']
        }
      },
      {
        path: 'upload',
        name: 'accountupload',
        component: _import('account/upload/index'),
        meta: {
          title: 'accountUpload',
          icon: 'nested',
          roles: ['admin', 'edit']
        }
      }
    ]
  },
  {
    path: '/downLoad',
    component: Layout,
    meta: { title: 'downMessage', icon: 'guide',
      roles: ['admin', 'edit']
    },
    children: [
      {
        path: 'list',
        name: 'downList',
        component: _import('downLoad/list/index'),
        meta: {
          title: 'downList',
          icon: 'list',
          roles: ['admin', 'edit']
        }
      },
      {
        path: 'edit',
        name: 'downEdit',
        component: _import('downLoad/add/index'),
        meta: {
          title: 'downEdit',
          icon: 'edit',
          roles: ['admin', 'edit']
        }
      }
    ]
  },
  {
    path: '/notice',
    component: Layout,
    meta: { title: 'noticeMessage', icon: 'tab',
      roles: ['admin', 'edit']
    },

    children: [
      {
        path: 'list',
        name: 'noticeList',
        component: _import('notice/list/index'),
        meta: {
          title: 'noticeList',
          icon: 'list',
          roles: ['admin', 'edit']
        }
      },
      {
        path: 'edit',
        name: 'noticeEdit',
        component: _import('notice/add/index'),
        meta: {
          title: 'noticeEdit',
          icon: 'edit',
          roles: ['admin', 'edit']
        }
      }
    ]
  },
  // {
  //   path: '/carousel',
  //   component: Layout,
  //   meta: { title: 'carousel', icon: 'example' },
  //   children: [
  //     {
  //       path: '',
  //       name: 'carousel',
  //       component: _import('carousel/index'),
  //       meta: {
  //         title: 'carousel',
  //         icon: 'form',
  //         roles: ['normal', 'admin', 'edit']
  //       }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]
