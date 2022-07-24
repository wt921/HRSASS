import axios from 'axios';
import store from '@/store';
import { Message } from 'element-ui';
import router from '@/router';
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,//
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
// 请求拦截器【携带token】
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const token = store.getters.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// 响应拦截器【解构数据 集中错误处理】
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const { success, data, message } = response.data;
    if (success) {
      // 业务正确
      return data;
    } else {
      // 业务错误
      Message.error(message);
      return Promise.reject(new Error(message));
    }

  },
  // 请求错误
  error => {

    console.dir(error);
    if (error.response.status === 401 && error.response.data.code === 10002) {
      // token过期
      Message.error('token过期了，请重新登录');
      store.dispatch('user/quit');
      router.push('/login');

    }
    return Promise.reject(error);
  }
);

export default service;
