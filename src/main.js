import Vue from 'vue';
// 基础样式包
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
// 导入ElementUI
import ElementUI from 'element-ui';
// 导入ElementUI的样式
import 'element-ui/lib/theme-chalk/index.css';
// 导入ElementUI的语言包(英文)
import locale from 'element-ui/lib/locale/lang/en'; // lang i18n
// 导入全局样式
import '@/styles/index.scss'; // global css
// 导入根组件
import App from './App';
// 导入仓库
import store from './store';
// 导入路由
import router from './router';
// 导入图标
import '@/icons'; // icon
// 导入导航权限守卫
import '@/permission'; // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock');
//   mockXHR();
// }

// set ElementUI lang to EN
// 给element-ui设置英文语言包
Vue.use(ElementUI, { locale });
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// 控制台版本的提示
Vue.config.productionTip = false;
// 实例化vue
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
