import request from '@/utils/request';

export function loginApi(data) {
  return request({
    url: '/sys/login', // 因为所有的接口都要跨域 表示所有的接口要带 /api
    method: 'post',
    data
  });
}
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
