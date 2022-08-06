import router from '@/router';
import { getToken, setToken } from '@/utils/auth';
import NProgress from 'nprogress'; // 引入一份进度条插件
import 'nprogress/nprogress.css'; // 引入进度条样式
import store from './store';
const whiteList = ['/login', '/404'];
router.beforeEach(async(to, from, next) => {
    NProgress.start(); // 开启进度条
    if (getToken()) {
        if (to.path === '/login') {
            next('/');
        } else {
            // 判断是否有用户资料
            if (!store.getters.userId) {
                // 读取角色信息
                let { roles } = await store.dispatch('user/getUserInfo')
            // 调用过滤筛选动态路由的action 传入菜单权限标识
                let routes =await store.dispatch('permission/filterRoutes',roles.menus)
                // 得到动态路由映射 添加路由实例中
                router.addRoutes(routes)
                next(to.path);
            } else {
                next();
            }
          
        }
    } else {
        if (whiteList.includes(to.path)) {
            next();
        } else {
            next('/login');
        }
    }
    NProgress.done(); // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
});
// 后置守卫
router.afterEach(function() {
    NProgress.done() // 关闭进度条
  })
  
  