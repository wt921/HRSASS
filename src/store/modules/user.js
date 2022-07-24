import { loginApi, getUserInfoApi, getUserBaseInfoApi } from "@/api/user";
import { getToken, setToken, removeToken } from '@/utils/auth';
const state = {
  token: getToken(),//用户资料
  userInfo: {}
};
const mutations = {
  // 设置token
  setToken(state, data) {
    state.token = data;
    setToken(data);
  },
  // 删除token
  removeToken(state) {
    state.token = null;
    removeToken();
  },

  // 设置用户资料
  setUserInfo(state, data) {
    state.userInfo = data;
  },
  // 删除用户资料
  removeUserInfo(state) {
    state.userInfo = {};
  }


};
const actions = {
  // 登录
  async login(context, data) {
    let token = await loginApi(data);
    context.commit('setToken', token);
  },
  // 获取用户资料
  async getUserInfo(context) {
    console.log('context', context);
    // 获取用户信息
    let res = await getUserInfoApi();
    let res2 = await getUserBaseInfoApi(res.userId);
    // context.commit('setUserInfo', res);
    console.log('res', res);
    // 获取用户信息
    context.commit('setUserInfo', { ...res, ...res2 });
  },

  // 退出
  async quit({ commit }) {
    commit('removeToken');
    commit('removeUserInfo');
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions

};