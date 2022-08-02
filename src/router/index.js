import Vue from 'vue';
import Router from 'vue-router';


// 引入多个模块的规则
import approvalsRouter from './modules/approvals';
import departmentsRouter from './modules/departments';
import employeesRouter from './modules/employees';
import permissionsRouter from './modules/permissions';
import attendancesRouter from './modules/attendances';
import salarysRouter from './modules/salarys';
import settingsRouter from './modules/settings';
import socialsRouter from './modules/socials';

// 动态路由
export const asyncRoutes = [
  approvalsRouter,
  departmentsRouter,
  employeesRouter,
  permissionsRouter,
  attendancesRouter,
  salarysRouter,
  settingsRouter,
  socialsRouter
];

Vue.use(Router);

// 导入布局组件
/* Layout */
import Layout from '@/layout';




export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/import',
    component: Layout,
    hidden: true,
    children: [{
      path: '',

      component: () => import('@/views/import'),
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
];

// 创建一个路由实例 并返回
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes, ...asyncRoutes]
});

// 获取到路由实例
const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 重置一个路由实例
export function resetRouter() {
  // 创建一个新的路由实例
  const newRouter = createRouter();
  // 将路由实例的matcher变成新的即可
  router.matcher = newRouter.matcher; // reset router
}

export default router;
