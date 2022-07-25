import request from '@/utils/request';

// 登录
export const loginApi = data => {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  });
};
//
export function getUserInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'post',

  });
}
export function getUserBaseInfoApi(id) {
  return request({
    url: '/sys/user/' + id,


  });
}
