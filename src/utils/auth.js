import Cookies from 'js-cookie';

const TokenKey = 'hrsass_token';
const loginTimeKey = 'hrsass_login_time';

//设置登录时间
export function setTimeStamp() {
  Cookies.set(loginTimeKey, Date.now());
}
export function getTimeStamp() {
  return Cookies.get(loginTimeKey);
}

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
